import React, { Component } from 'react';
import NavigationUtil from '../navigator/NavigationUtil'
import {
  StyleSheet,
  SafeAreaView
} from 'react-native'
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import { connect } from 'react-redux';
import SafeSreaViewPlus from '../common/SafeAreaVIewPlus.js'

// export default (props) => {
//   //方便其他页面跳转的时候不传navigation
//   NavigationUtil.navigation = props.navigation;
//   // return <SafeSreaViewPlus topColor="#2196f3">
//   //     <DynamicTabNavigator />
//   //   </SafeSreaViewPlus>
//   return <SafeAreaView style={{'flex': 1}}>
//     <DynamicTabNavigator />
//   </SafeAreaView>
// }
class Props {
  navigation: any
  theme: any
}
class HomePage extends Component<Props> {
  constructor(props: any) {
    super(props)
  }
  render () {
    const { theme } = this.props;
    NavigationUtil.navigation = this.props.navigation;
    return <SafeSreaViewPlus topColor={theme.themeColor}>
      
      <DynamicTabNavigator />
    </SafeSreaViewPlus>
  }
}

const mapStateToProps = (state: { theme: { theme: any; }; }) => ({
  theme: state.theme.theme
})

export default connect(mapStateToProps)(HomePage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100
  }
})