import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import { tabNav } from '../navigator/NavigationDelegate';
import action from '../action';
import TrendingItem from '../common/TrendingItem.js'
import Toast from '../common/Toast/index';
import NavigationBar from '../common/NavigationBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigationUtil from '../navigator/NavigationUtil';
import {FLAG_STORAGE} from '../expand/dao/DataStore';
import FavoriteDao from '../expand/dao/FavoriteDao'
import Utils from '../util/Utils'
const favoriteDao = new FavoriteDao('trending')
flagIndex = 1
class TrendingPage extends Component {
  constructor(props) {
    super(props)
    this.preLang = this.props.keysAndLang.lang
  }
  componentDidMount () {
    const { onLoadKeysAndLang } = this.props;
    onLoadKeysAndLang([] ,'lang')
  }
  renderTitleView() {
    return <View>
      <TouchableOpacity
        underlayColor='transparent'
        onPress={() => {}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{
            fontSize: 18,
            color: '#FFFFFF',
            fontWeight: '400',
          }}>趋势</Text>
          <MaterialIcons
            name={'arrow-drop-down'}
            size={22}
            style={{color: 'white'}}
          />
        </View>
      </TouchableOpacity>
    </View>;
  }
  render () {      
    const themeColor = this.props.theme.themeColor || this.props.theme;
    const { lang } = this.props.keysAndLang
    if (this.themeColor != themeColor || !Utils.isEqual(this.preLang, lang)) {//当主题变更的时候需要以新的主题色来创建TabNavigator
      this.themeColor = themeColor;
      this.TabNavigator = null;
    }
    let statusBar = {
      backgroundColor: this.themeColor,
      barStyle: 'light-content',
    };
    let navigationBar = <NavigationBar
      titleView={this.renderTitleView()}
      statusBar={statusBar}
      // style={this.props.theme.styles.navBar}
    />;
    this.TabNavigator = this.TabNavigator ? this.TabNavigator : lang.length
      ? tabNav({
        Component: TrendingTabPage,
        theme: { themeColor: themeColor },
        keys: lang,
      })
      : null;

    return (
      <View style={styles.container}>
        {navigationBar}
        {this.TabNavigator}
      </View>
    );
  }
}
const mapTrendingPageToState = state => ({
  theme: state.theme.theme,
  keysAndLang: state.keysAndLang
});
const mapTrendingPageToDispatch = (dispatch) => ({
  onLoadKeysAndLang: (arr, key) => dispatch(action.onLoadKeysAndLang(arr, key))
})
export default connect(mapTrendingPageToState, mapTrendingPageToDispatch)(TrendingPage)
const pageSize = 10;//设为常量，防止修改
class TrendingTab extends Component {
  constructor(props) {
    super(props);
    const { tabLabel } = this.props;
    this.storeName = tabLabel;
  }
  componentDidMount () {
    this.loadData(false);
  }
  loadData(loadMore) {
    const { onLoadTrendingData, onLoadMoreTrendingData } = this.props;
    const storeList = this._store();
    if (loadMore) {
      onLoadMoreTrendingData(this.storeName, 'trending', ++storeList.pageIndex, pageSize, callback => {
        Toast.show('没有更多数据了', 1500);
      })
    } else {
      onLoadTrendingData(this.storeName, 'trending', 1, pageSize, favoriteDao);
    }
  }
  _store () {
    const { trending } = this.props;
    let storeList = trending[this.storeName];
    if (!storeList) {
      storeList = {
        items: [],
        isLoading: false,
        projectModels: [],//要显示的数据
        hideLoadingMore: true,//默认隐藏加载更多
      }
    }
    return storeList;
  }
  _onFavoriteMethods (data, isFavorite) {
    // const key = (data.id ? data.id : data.fullName) + '';
    // if (isFavorite) {
    //   favoriteDao.saveFavoriteItem(key, JSON.stringify(data));
    // } else {
    //   favoriteDao.removeFavoriteItem(key)
    // }
    const { updateTrendingDataItem } = this.props
    updateTrendingDataItem('trending', this.storeName, [data])
  }
  renderItem(data, theme) {
    return <TrendingItem
      theme={theme}
      projectModel={data.item}
      onSelect={() => {
        NavigationUtil.goPage({
          theme,
          projectModel: data.item,
          flag: FLAG_STORAGE.flag_trending
        }, 'DetailPage');
      }}
      onFavorite={(item, isFavorite) => {
        // 这边执行AsyncStorage进行存储
        this._onFavoriteMethods(item, isFavorite);
      }}
    />
  }
  genIndicator() {
    return this._store().hideLoadingMore ? null :
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
        />
        <Text>正在加载更多</Text>
      </View>
  }
  
  
  render ()  {
    let storeList = this._store();
    return (
      <View style={styles.containerPopularTab}>
      <FlatList
        data={storeList.projectModels}
        renderItem={data => this.renderItem(data, this.props.theme)}
        keyExtractor={item => "" + item.id + ++flagIndex}
        refreshControl={
          <RefreshControl
            title={'Loading'}
            titleColor={'red'}
            colors={['red']}
            refreshing={storeList.isLoading}
            onRefresh={() => this.loadData(false)}
            tintColor={'red'}
          />
        }
        initialNumToRender={5}
        ListFooterComponent={() => this.genIndicator()}
        onEndReached={() => {
          setTimeout(() => {
            if (this.canLoadMore) {//fix 滚动时两次调用onEndReached
              this.loadData(true);
              this.canLoadMore = false;
            }
          }, 100);
        }}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
        }}
      />
      {/* <Toast message={'Toast 显示内容电饭锅电饭锅呜呜呜'} /> */}
    </View>
    )
  }
}

const mapTrendingStateToProps = state => ({
  trending: state.trending
});
const mapTrendingDispatchToProps = dispatch => ({
  onLoadTrendingData: (storeName, flag, pageIndex, pageSize, favoriteDao) => dispatch(action.onLoadTrendingData(storeName, flag, pageIndex, pageSize, favoriteDao)),
  onLoadMoreTrendingData: (storeName, flag, pageIndex, pageSize, callBack) => dispatch(action.onLoadMoreTrendingData(storeName, flag, pageIndex, pageSize, callBack)),
  updateTrendingDataItem: (flag, storeName, data) => dispatch(action.updateTrendingDataItem(flag, storeName, data))
});

const TrendingTabPage = connect(mapTrendingStateToProps, mapTrendingDispatchToProps)(TrendingTab)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerPopularTab: {
    position: 'relative',
    flex: 1
  },
  indicatorContainer: {
    alignItems: 'center'
  },
  indicator: {
    color: 'red',
    margin: 10
  }
})