import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export function tabNav({Component, keys, theme, extra = {}}: any) {
  return <Tab.Navigator
    screenOptions={{
      lazy: true,
      tabBarItemStyle: styles.tabStyle,
      tabBarScrollEnabled: true,//左右滑动
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
      Object.entries(_genTabs({ Component, keys, theme, extra })).map((item:any) => {
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
  </Tab.Navigator>
}

function _genTabs({Component, keys, theme, extra = {}}: any) {
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

const styles = StyleSheet.create({
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
