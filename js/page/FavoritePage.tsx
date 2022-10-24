import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl
} from 'react-native'
import { connect } from 'react-redux'
import NavigationBar from '../common/NavigationBar';
import action from '../action';
import PopularItem from '../common/PopularItem'
import TrendingItem from '../common/TrendingItem.js'
import FavoriteDao from '../expand/dao/FavoriteDao.js'
import NavigationUtil from '../navigator/NavigationUtil';
import favorite from '../res/data/favorite.json'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EventBus from 'react-native-event-bus';
import EventTypes from '../util/EventTypes';
const Tab = createMaterialTopTabNavigator();
interface Props {
  tabLabel: any,
  theme: any,
  onLoadFavoriteData: any,
  favorite: any,
  popular: any,
  updateOnLoadFavoriteData: any
}
const TABS = [
  { name: '最热', checked: true },
  { name: '趋势', checked: true },
];
class FavoritePage extends Component<Props> {
  [x: string]: any;
  constructor(props: Props | Readonly<Props>) {
    super(props)
    this.TabNavigator = null
    this.themeColor = null
  }

  _genTabs ({Component, keys, theme, extra = {}}: any) {
    const tabs = {} as any;
    keys.forEach((item: any, index: any) => {
      if (item.checked) {
        tabs[`Tab${index}`] = {
          Screen:(props: any) => (
            <Component
              {...props} {...extra}
              tabLabel={item.name}
              theme={theme}
            />
          ),
          navigationOptions: {
            title: item.name
          }
        };
      };
    });
    return tabs;
  }
  
  render() {
    const theme = this.props.theme
    let statusBar = {
      backgroundColor: theme.themeColor,
      barStyle: 'light-content',
    };
    // let TabNavigator = null;
    if (this.themeColor != theme) {
      this.themeColor = theme
      this.TabNavigator = null;
    }
    
    this.TabNavigator = this.TabNavigator ? this.TabNavigator : (favorite.length ?
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarItemStyle: styles.tabStyle,
        tabBarScrollEnabled: false,//左右滑动
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: theme.themeColor,//tabbar的背景色
        },
      tabBarIndicatorStyle: styles.indicatorStyle,//指示器的颜色
      tabBarLabelStyle: styles.labelStyle,//文本的颜色
    }}
    >
      {
        Object.entries(this._genTabs({ Component: FavoriteTabPages, keys: favorite, theme, extra: {} })).map((item:any) => {
          return (
            <Tab.Screen
              key={item[0]}
              name={item[0]}
              component={item[1].Screen}
              options={item[1].navigationOptions}
            />
          )
        })
      }
    </Tab.Navigator> : null)
    let navigationBar = <NavigationBar
      title={'收藏'}
      statusBar={statusBar}
    />
    return (
      <View style={styles.container}>
        {navigationBar}
        {this.TabNavigator}
      </View>
    )
  }
}

const mapStateToFavorite = (state: any) => ({
  theme: state.theme.theme
})

export default connect(mapStateToFavorite)(FavoritePage)
let flagIndex = 1
class FavoriteTab extends Component<Props>{
  storeName: string;
  listener: any;
  constructor (props: Props | Readonly<Props>) {
    super(props)
    const { tabLabel } = this.props;
    this.storeName = tabLabel === '最热' ? 'popular' : 'trending';
  }

  componentDidMount(): void {
    this.loadData(true);
    EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.listener = (data: any) => {
      if (data.to === 2) {
        this.loadData(false);
      }
    })
  }
  componentWillUnmount(): void {
    EventBus.getInstance().removeListener(this.listener);
  }

  loadData (isLoading: boolean) {
    const { onLoadFavoriteData } = this.props;
    onLoadFavoriteData(this.storeName, isLoading)
    // this._storeList()
  }
  _onFavorites (data: any, isFavorite: any) {
    const { updateOnLoadFavoriteData } = this.props
    const type = this.storeName === 'popular' ? 'CLICK_POUPULAR_FAVORITE' : 'CLICK_TRENDING_FAVORITE'
    updateOnLoadFavoriteData(this.storeName, data.flagType, [data], isFavorite, type)
    // if (this.storeName === 'popular') {
    //   EventBus.getInstance().fireEvent(EventTypes.favorite_changed_popular)
    // } else {
    //   EventBus.getInstance().fireEvent(EventTypes.favorite_changed_trending)
    // }
  }
  _storeList () {
    const { favorite } = this.props;
    let list = favorite[this.storeName]
    if (!list) {
      list = {
        projectModels: [],
        isLoading: false
      }
    }

    return list

  }
  renderItem (item: any) {
    const { theme } = this.props.theme
    const Items = this.storeName === 'popular' ? <PopularItem projectModel={item.item} theme={theme} onSelect={() => {}}
    onFavorite={(item: any, isFavorite: any) => {
        this._onFavorites(item, isFavorite)
      }}
      /> : <TrendingItem
        theme={theme}
        projectModel={item.item}
        onSelect={() => {
          NavigationUtil.goPage({
            theme,
            projectModel: item.item,
            flag: this.storeName,
          }, 'DetailPage');
        }}
        onFavorite={(item: any, isFavorite: any) => {
          // 这边执行AsyncStorage进行存储
          this._onFavorites(item, isFavorite);
        }}
      />
      return Items
  }
  _listEmpty (data: any) {
    return <View style={{flex: 1, marginTop: 100, justifyContent: 'center', alignItems: 'center'}}>
      <Text>暂无数据</Text>
    </View>
  }
  
  render () {
    let storeList = this._storeList()
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={storeList.projectModels}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => "" + item.id + ++flagIndex}
          ListEmptyComponent={(data) => this._listEmpty(data)}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={'red'}
              colors={['red']}
              refreshing={storeList.isLoading}
              onRefresh={() => this.loadData(true)}
              tintColor={'red'}
            />
          }
        />
      </View>
    )
  }
}

const mapSstateToFavoriteTab = (state: any) => ({
  theme: state.theme,
  favorite: state.favorite,
  popular: state.popular
})
const mapDispatchToFavoriteTab = (dispatch: any) => ({
  onLoadFavoriteData: (storeName: string, isLoading: any) => dispatch(action.onLoadFavoriteData(storeName, isLoading)),
  updateOnLoadFavoriteData: (storeName: string, flag: string, data: any, isFavorite: boolean, type: string) => dispatch(action.updateOnLoadFavoriteData(storeName, flag, data, isFavorite, type))
})

const FavoriteTabPages = connect(mapSstateToFavoriteTab, mapDispatchToFavoriteTab)(FavoriteTab);


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabStyle: {
    padding: 10
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    textTransform: 'none',//取消大消息
    fontSize: 13,
    margin: 0
  }
})
