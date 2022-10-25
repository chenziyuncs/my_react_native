import React, { Component } from 'react';
import NavigationUtil from '../navigator/NavigationUtil';
import {
  StyleSheet,
  View
} from 'react-native';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import { connect } from 'react-redux';
import SafeSreaViewPlus from '../common/SafeAreaVIewPlus.js';
import CustomThemePage from './CustomThemePage';
import action from '../action';
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
  customThemeViewVisible: any
  onShowThemeView: any
}
class HomePage extends Component<Props> {
  constructor(props: any) {
    super(props)
  }
  renderCustomThemePageView () {
    const { onShowThemeView, customThemeViewVisible } = this.props;
    return <CustomThemePage
     visible={customThemeViewVisible} 
     {...this.props}
     onClose={() => onShowThemeView(false)}
    />
  }
  render () {
    const { theme } = this.props;
    NavigationUtil.navigation = this.props.navigation;
    return <SafeSreaViewPlus topColor={theme.themeColor.themeColor}>
     
      <DynamicTabNavigator />
      {this.renderCustomThemePageView()}
      
    </SafeSreaViewPlus>
  }
}

const mapStateToProps = (state: { theme: { theme: any; customThemeViewVisible: any; }; }) => ({
  theme: state.theme.theme,
  customThemeViewVisible: state.theme.customThemeViewVisible
})
const mapStateToHomePage = (dispatch: any) => ({
  onShowThemeView: (show: boolean) => dispatch(action.onShowThemeView(show))
})

export default connect(mapStateToProps, mapStateToHomePage)(HomePage)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})