import React, { Component } from "react";
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'
import { connect } from 'react-redux'
// import { TABS } from '../config/bottomTabsConfig'
import { TABS } from '../config/bottomTabConfig.js'
const Tab = createBottomTabNavigator();

class Props {
  theme: any
}

class DynamicTabNavigator extends Component<Props> {
  tabNavIndex!: number;
  // tabNavIndex!: number;
  /**
   * 从导航器状态里面 解析导航跳转
   * @param navigationState 
   */
  fireEvent (navigationState: any) {
    const { index, history, routeNames } = navigationState;
    let formIndex = -1;// 默认值
    if (history.length === 1) {
      formIndex = this.tabNavIndex;
    } else {
      let key = history[history.length -2].key;// 要跳转的页面key
      for (let i = 0; i < routeNames.length; i++) {// 遍历跳转的路由
        if (key.startsWith(routeNames[i])) {// 匹配key 带有路由开头字段
          formIndex = i;
          break;
        }
      }
    }
    EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {
      // 发送底部tab切换时间
      form: formIndex,
      to: index
    })
    // 记录上一次的位置
    this.tabNavIndex = index;
  }
  _getMethod() {
    const themeColor = this.props.theme.themeColor.themeColor || this.props.theme;
    return (
      <Tab.Navigator
        tabBar={(props) => {
          this.fireEvent(props.state)
          return <BottomTabBar {...props} />
        }}
      >
        {
          TABS.map((item: any) => {
            return (
              <Tab.Screen
                key={item[0]}
                name={item[0]}
                component={item[1].screen}
                options={{...(item[1].navigationOptions), tabBarActiveTintColor: themeColor}}
              />
            )
          })
        }
      </Tab.Navigator>
    )
  }

  render () {
    const Tab = this._getMethod()
    return Tab;
  }
}

const mapStateToProps = (state: any) => ({
  theme: state.theme.theme
})

export default connect(mapStateToProps)(DynamicTabNavigator)