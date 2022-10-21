import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PopularPage from '../page/PopularPage'
import TrendingPage from '../page/TrendingPage'
import MyPage from '../page/MyPage'
import FavoritePage from '../page/FavoritePage'
export const TABS = [
  [
    'PopularPage',
    {
      screen: PopularPage,
      navigationOptions: {
        tabBarLabel: '最热',
        headerShown: false,
        tabBarIcon: ({color, focused}) => (
          <MaterialIcons
          name={'whatshot'}
          size={26}
          style={{color}}
        />
        )
      }
    }
  ],
  [
    'TrendingPage',
    {
      screen: TrendingPage,
      navigationOptions: {
        tabBarLabel: '趋势',
        headerShown: false,
        tabBarIcon: ({color, focused}) => (
          <Ionicons
            name={'md-trending-up'}
            size={26}
            style={{color}}
          />
        )
      }
    }
  ],
  [
    'FavoritePage',
    {
      screen: FavoritePage,
      navigationOptions: {
        tabBarLabel: '收藏',
        headerShown: false,
        tabBarIcon: ({color, foucsed}) => (
          <MaterialIcons
            name={'favorite'}
            size={26}
            style={{color}}
          />
        )
      }
    }
  ],
  [
    'MyPage',
    {
      screen: MyPage,
      navigationOptions: {
        tabBarLabel: '我的',
        headerShown: false,
        tabBarIcon: ({color, foucsed}) => (
          <Entypo
            name={'user'}
            size={26}
            style={{color}}
          />
        )
      }
    }
  ]
]