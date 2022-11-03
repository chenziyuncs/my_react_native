import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import PopularItem from '../common/PopularItem'
import { connect } from 'react-redux';
import action from '../action';
import { tabNav } from '../navigator/NavigationDelegate';
import Utils from '../util/Utils'
import Toast from '../common/Toast/index';
import NavigationBar from '../common/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationUtil from '../navigator/NavigationUtil'
flagIndex = 1
class PopularPage extends Component {
  constructor (props) {
    super(props)
    this.preKeys = this.props.keysAndLang.keys
  }
  _renderRightButton () {// 显示右边搜索框按钮
    const theme = this.props.theme.themeColor.themeColor
    return <TouchableOpacity
      onPress={() => {
        NavigationUtil.goPage({theme}, 'SearchPage')
      }}
    >
      <View style={{ padding: 5, marginRight: 8 }}>
        <Ionicons name='search' size={20} style={{ color: 'white' }} />
      </View>
    </TouchableOpacity>
  }
  render() {
    const themeColor = this.props.theme.themeColor.themeColor || this.props.theme.themeColor;
    const { keys } = this.props.keysAndLang
    if (this.themeColor != themeColor || !Utils.isEqual(this.preKeys, keys)) {//当主题变更的时候需要以新的主题色来创建TabNavigator
      this.themeColor = themeColor;
      this.TabNavigator = null;
    }
    let statusBar = {
      backgroundColor: themeColor,
      barStyle: 'light-content',
    };
    let navigationBar = <NavigationBar
      title='最热'
      statusBar={statusBar}
      rightButton={this._renderRightButton()}
    />;
    //通过复用TabNavigator来防止导航器频繁的创建，提升渲染效率
    this.TabNavigator = this.TabNavigator ? this.TabNavigator : keys.length
      ? tabNav({
        Component: PopularTabPage,
        theme: { themeColor: themeColor },
        keys: keys,
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
const mapPopularStateToProps = (state) => ({
  theme: state.theme.theme,
  keysAndLang: state.keysAndLang
});
const mapPopularStateToPage = (dispatch) => ({
  onLoadKeysAndLang: (arr, keys) => dispatch(action.onLoadKeysAndLang(arr, keys))
})
export default connect(mapPopularStateToProps, mapPopularStateToPage,)(PopularPage);
const pageSize = 10;//设为常量，防止修改
class PopularTab extends Component {
  constructor(props) {
    super(props);
    const { tabLabel } = this.props;
    this.storeName = tabLabel;
    this.isFavoriteChanged = false;
  }

  componentDidMount() {
    this.loadData(false);
  }
  loadData(loadMore) {
    const { onLoadPopularData, onLoadMorePopularData } = this.props;
    const storeList = this._store();
    if (loadMore) {
      onLoadMorePopularData(this.storeName, 'popular', ++storeList.pageIndex, pageSize, callback => {
        Toast.showSecond('没有更多数据了', 1500);
      })
    } else {
      onLoadPopularData(this.storeName, 'popular', 1, pageSize);
    }
  }

  /**
   * 获取与当前页面有关的数据
   * @returns {*}
   * @private
   */
  _store() {
    const { popular } = this.props;
    let storeList = popular[this.storeName];
    if (!storeList) {
      storeList = {
        isLoading: false,
        projectModels: [],//要显示的数据
        hideLoadingMore: true,//默认隐藏加载更多
      }
    }
    return storeList;
  }

  _onFavorites (data, isFavorite) {// 收藏
    data.isFavorite = isFavorite
    const { updatePopularDataItem } = this.props

    updatePopularDataItem('popular', this.storeName, [data], 'CLICK_POUPULAR_FAVORITE')
  }

  renderItem(data, theme) {
    const {item} = data;
    return <PopularItem
      projectModel={data.item}
      theme={theme}
      onSelect={() => {

      }}
      onFavorite={(item, isFavorite) => {
        this._onFavorites(item, isFavorite)
      }}
    />
  }

  genIndicator() {// 底部加载更多
    return this._store().hideLoadingMore ? null :
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
        />
        <Text>正在加载更多</Text>
      </View>
  }
  _listEmpty (data) {// 无数据显示状态
    return <View style={{flex: 1, marginTop: 100, justifyContent: 'center', alignItems: 'center'}}>
      <Text>暂无数据</Text>
    </View>
  }

  render() {
    let storeList = this._store();
    return (
      <View style={styles.containerPopularTab}>
        <FlatList
          data={storeList.projectModels}
          // getItemLayout={(data, index) => ( // 固定高度才能这么设置，否则会有问题
          //   { length: 380, offset: 380 * index, index }
          // )}
          ListEmptyComponent={(data) => this._listEmpty(data)}
          initialNumToRender={5}
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
    );
  }
}

const mapStateToProps = state => ({
  popular: state.popular
});
const mapDispatchToProps = dispatch => ({
  updatePopularDataItem: (flag, storeName, data) => dispatch(action.updatePopularDataItem(flag, storeName, data)),
  onLoadPopularData: (storeName, url, pageIndex, pageSize) => dispatch(action.onLoadPopularData(storeName, url, pageIndex, pageSize)),
  onLoadMorePopularData: (storeName, flag, pageIndex, pageSize, callBack) => dispatch(action.onLoadMorePopularData(storeName, flag, pageIndex, pageSize, callBack))
});
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerPopularTab: {
    position: 'relative',
    flex: 1
  },
  indicatorContainer: {
    alignItems: "center",
    
  },
  indicator: {
    color: 'red',
    margin: 10
  }
});
