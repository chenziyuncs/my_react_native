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
    return <SafeSreaViewPlus topColor={theme} >
      <DynamicTabNavigator />
      {this.renderCustomThemePageView()}
      
      
    </SafeSreaViewPlus>
  }
}

const mapStateToProps = (state: { theme: { theme: { themeColor: { themeColor: any; }; }; customThemeViewVisible: any; }; }) => ({
  theme: state.theme.theme.themeColor.themeColor,
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