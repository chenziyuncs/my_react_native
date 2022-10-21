import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import HomeIndex from '../page/HomeIndex'
import HapplyPage from '../page/HapplyPage'
import MyPage from '../page/MyPage'
import Nearly from '../page/Nearly.tsx'
import ShoppingPage from '../page/ShoppingPage'
export const TABS = [
  [
    'HomeIndex',
    {
      screen: HomeIndex,
      navigationOptions: {
        tabBarLabel: '首页',
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
    'Nearly',
    {
      screen: Nearly,
      navigationOptions: {
        tabBarLabel: '附近',
        headerShown: false,
        tabBarIcon: ({color, focused}) => (
          <MaterialIcons
            name={'near-me'}
            size={26}
            style={{color}}
          />
        )
      }
    }
  ],
  [
    'HapplyPage',
    {
      screen: HapplyPage,
      navigationOptions: {
        tabBarLabel: '娱乐',
        headerShown: false,
        tabBarIcon: ({color, foucsed}) => (
          <Entypo
            name={'star-outlined'}
            size={26}
            style={{color}}
          />
        )
      }
    }
  ],
  [
    'ShoppingPage',
    {
      screen: ShoppingPage,
      navigationOptions: {
        tabBarLabel: '购物车',
        headerShown: false,
        tabBarIcon: ({color, foucsed}) => (
          <Entypo
            name={'shopping-cart'}
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