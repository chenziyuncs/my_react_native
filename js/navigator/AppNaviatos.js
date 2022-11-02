import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginPage from '../page/LoginPage'
import RegistrationPage from '../page/RegistrationPage'
import AboutMePage from '../page/AboutMePage'
import AboutPage from '../page/AboutPage'
import CodePushPage from '../page/CodePushPage'
import CustomKeyPage from '../page/CustomKeyPage'
import DetailPage from '../page/DetailPage'
import HomePage from '../page/HomePage'
import PopularPage from '../page/PopularPage'
import SearchPage from '../page/SearchPage'
import SortKeyPage from '../page/SortKeyPage'
import WelcomePage from '../page/WelcomePage'
import WebViewPage from '../page/WebViewPage.tsx'
//创建导航器
const Stack = createNativeStackNavigator();
//在这里配置除Tab页以外的页面
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="欢迎光临"
          component={WelcomePage}
          //是否展示头部标题栏
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          //是否展示头部标题栏
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegistrationPage"
          component={RegistrationPage}
          //是否展示头部标题栏
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AboutMePage"
          component={AboutMePage}
          //是否展示头部标题栏
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AboutPage"
          component={AboutPage}
          //是否展示头部标题栏
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CodePushPage"
          component={CodePushPage}
          //是否展示头部标题栏
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomKeyPage"
          component={CustomKeyPage}
          //是否展示头部标题栏
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailPage"
          component={DetailPage}
          //是否展示头部标题栏
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          //是否展示头部标题栏
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PopularPage"
          component={PopularPage}
          //是否展示头部标题栏
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchPage"
          component={SearchPage}
          //是否展示头部标题栏
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SortKeyPage"
          component={SortKeyPage}
          //是否展示头部标题栏
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WebViewPage"
          component={WebViewPage}
          //是否展示头部标题栏
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
