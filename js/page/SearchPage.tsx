import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import BackPressComponent from '../common/BackPressComponent';
import SafeAreaVIewPlus from '../common/SafeAreaVIewPlus.js'
import NavigationUtil from '../navigator/NavigationUtil';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import action from '../action'
import PopularItem from '../common/PopularItem';
import Toast from '../common/Toast'
import store from '../store'
import Types from '../action/types'
let flagIndex = 1
const pageSize = 10
function SearchPage (props: any) {
  const [theme, useTheme] = useState(props.route.params.theme);
  const [backPress, setBackPress] = useState(new BackPressComponent({ backPress: () =>  _onBackPress()}));
  const [inputKey, setInputKey] = useState('');
  const [keysList, setKeyList] = useState(props.keys.filter((item: any) => item.checked));
  const [searchToken, setSearchToken] = useState(null as any);
  const [isKeyChange, setIsKeyChange] = useState(false); // 返回上一页判断是否添加，添加返回时请求数据
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [statusBar, setStatusBar] = useState({
    backgroundColor: theme,
    barStyle: 'light-content',
  });
  const _onBackPress = () => {
    _onBlack();
    return true;
  };
  const _onBlack = () => {
    NavigationUtil.goBack(props.navigation);
    return true;
  };
  useEffect(() => {
    backPress.componentDidMount();
    return () => {
      backPress.componentWillUnmount();
    }
  });
  const _renderInput = () => {// 输入框
    return <TextInput
      style={styles.inputStyle}
      // ref="input"
      placeholder={inputKey || '请输入'}
      onChangeText={(text: string) => setInputKey(text.trim())}
      // 取大小写
      autoCapitalize={'none'}
      clearButtonMode={'while-editing'}
    />
  };
  const _renderRightButton = () => {// 右边搜索按钮
    const { onSearchCancel } = props;
    return <TouchableOpacity
      onPress={() => {
        if (inputKey === '') return;
        props.search.showText === '搜索' ? _loadData(false) : onSearchCancel(searchToken);
      }}
    >
      <View style={{ padding: 5, marginRight: 8 }}>
        <Text style={{ color: 'white' }}>{props.search.showText}</Text>
      </View>
    </TouchableOpacity>
  };
  let navigationBar = <NavigationBar
    statusBar={statusBar}
    titleView={_renderInput()}
    rightButton={_renderRightButton()}
    leftButton={ ViewUtil.getLeftBackButton(() => { _onBlack(); })}
  />;
  const _genIndicator = () => {// 加载更多
    return props.search.hideLoadingMore ? null :
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
        />
        <Text>正在加载更多</Text>
      </View>
  }
  const _listEmpty = (data: any) => {// 无数据显示状态
    return <View style={{flex: 1, marginTop: 100, justifyContent: 'center', alignItems: 'center'}}>
      <Text>暂无数据</Text>
    </View>
  }
  const _onFavorites = (data: any, isFavorite: boolean) => {// 收藏
    data.isFavorite = isFavorite
    
    const findKey = props.keys.find((item: any) => {return item.name.toLocaleLowerCase() === inputKey.toLocaleLowerCase()})
    let toLowerCaseInputKey = findKey ? findKey.name : inputKey;
    const { updatePopularDataItem } = props
    updatePopularDataItem('popular', toLowerCaseInputKey, [data], 'CLICK_POUPULAR_FAVORITE')
  }
  const _renderItem = (data: any, theme: any) => {
    const { item } = data;
    return <PopularItem
      projectModel={item}
      theme={{themeColor: theme}}
      onSelect={() => {}}
      onFavorite={(item: any, isFavorite: boolean) => {
        _onFavorites(item, isFavorite)
      }}
    />
  }
  useEffect(() => {
    const { resetSearchData } = props;
    resetSearchData();
  }, [])
  const _loadData = (flag: boolean) => {
    const { onLoadSearchData, onLoadMoreSearch } = props
    const findKey = props.keys.find((item: any) => {return item.name.toLocaleLowerCase() === inputKey.toLocaleLowerCase()})
    let toLowerCaseInputKey = findKey ? findKey.name : inputKey;
    if (flag) {
      onLoadMoreSearch(toLowerCaseInputKey, ++props.search.pageIndex, pageSize, (callBack: any) => {
        Toast.showSecond(callBack, 3000)
      })
    } else {
      
      onLoadSearchData(toLowerCaseInputKey, pageSize, setSearchToken(new Date().getTime()), keysList, (callBack: any) => {
        console.log(callBack, 'callBack')
        Toast.showSecond(callBack, 3000)
      });
    }
  }
  const _bottomButton = () => {
    const keysItem = {
      "path": inputKey,
      "name": inputKey,
      "checked": true
    }
    const { onLoadKeysAndLang } = props;
    onLoadKeysAndLang([...[keysItem], ...props.keys], 'keys')
    store.dispatch({ type: Types.SEARCH_REFRESH })
    Toast.showSecond('添加成功', 3000)
  }
  return(
    <SafeAreaVIewPlus style={styles.container} topColor={theme}>
      { navigationBar }
      <View style={styles.container}>
        <FlatList
          data={props.search.projectModels}
          ListEmptyComponent={(data) => _listEmpty(data)}
          initialNumToRender={5}
          renderItem={data => _renderItem(data, theme)}
          keyExtractor={item => "" + item.id + ++flagIndex}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={'red'}
              colors={['red']}
              refreshing={props.search.isLoading}
              onRefresh={() => _loadData(false)}
              tintColor={'red'}
            />
          }
          contentInset={{ bottom: 45 }}
          ListFooterComponent={() => _genIndicator()}
          onEndReached={() => {
            setTimeout(() => {
              if (canLoadMore) {//fix 滚动时两次调用onEndReached
                _loadData(true);
                setCanLoadMore(false);
              }
            }, 100);
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            setCanLoadMore(true); //fix 初始化时页调用onEndReached的问题
          }}
        />
        {props.search.showBottomButton ? <TouchableOpacity style={styles.addButton} onPress={() => _bottomButton()}>
          <View style={[styles.buttonView, { backgroundColor: theme }]}>
            <Text style={{color: 'white'}}>给朕加上</Text>
          </View>
        </TouchableOpacity> : null}
      </View>
    </SafeAreaVIewPlus>
  );
}

const mapStateToSearchPage = (state: any) => ({
  search: state.search,
  keys: state.keysAndLang.keys
})
const mapDistapthSearchPage = (dispatch: any) => ({
  onLoadSearchData: (inputKey: any, pageSize: number, token: any, popularKeys: any, callBack: any) => dispatch(action.onLoadSearchData(inputKey, pageSize, token, popularKeys, callBack)),
  onSearchCancel: (token: any) => dispatch(action.onSearchCancel(token)),
  onLoadKeysAndLang: (arr: any, flag: string) => dispatch(action.onLoadKeysAndLang(arr, flag)),
  resetSearchData: () => dispatch(action.resetSearchData()),
  updatePopularDataItem: (flag: string, storeName: string, data: any) => dispatch(action.updatePopularDataItem(flag, storeName, data)),
  onLoadMoreSearch: (inputKey: string, pageIndex: number, pageSize: number, callBack: any) => dispatch(action.onLoadMoreSearch(inputKey, pageIndex, pageSize, callBack))
})
export default connect(mapStateToSearchPage, mapDistapthSearchPage)(SearchPage)

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    padding: 10
  },
  buttonView: {
    height: 50,
    width: '100%',
    lineHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
  },
  container: {
    flex: 1,
    position: 'relative'
  },
  inputStyle: {
    flex: 1,
    margin: 5,
    padding: 5,
    color: 'white',
    width: '90%',
    height: (Platform.OS === 'ios') ? 26 : 36,
    // borderWidth: (Platform.OS === 'ios') ? 1 : 0,
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'center',
    paddingLeft: 5,
    marginRight: 10,
    marginLeft: 5,
    borderRadius: 3,
    opacity: 0.7,
  },
  indicatorContainer: {
    alignItems: "center",
    
  },
  indicator: {
    color: 'red',
    margin: 10
  }
})