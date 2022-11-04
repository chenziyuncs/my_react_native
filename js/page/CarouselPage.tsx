import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import SafeAreaVIewPlus from '../common/SafeAreaVIewPlus';
import ViewUtil from '../util/ViewUtil';
import { connect } from 'react-redux';
import BackPressComponent from '../common/BackPressComponent';
import NavigationUtil from '../navigator/NavigationUtil';
import Carousel from '../common/Carousel'
function CarouselPage (props: any) {
  const [theme, setTheme] = useState(props.theme.themeColor)
  const [backPress, setBackPress] = useState(new BackPressComponent({ backPress: () =>  _onBackPress()}))
  useEffect(() => {
    backPress.componentDidMount();
    return function cleanup () {
      backPress.componentWillUnmount();
    }
  })
  const _onBackPress = () => {
    _onBlack();
    return true;
  }
  const _onBlack = () => {
    NavigationUtil.goBack(props.navigation);
    return true;
  }
  let navtartionBar = <NavigationBar
    leftButton={ViewUtil.getLeftBackButton(() => {
      _onBlack();
    })}
    title={'轮播图'}
    style={{ backgroundColor: theme }}
  />
  return <SafeAreaVIewPlus style={styles.container} topColor={theme}>
      {navtartionBar}
      <Carousel />
    </SafeAreaVIewPlus>
}

const mapStateToCarouselPage = (state: any) => ({
  theme: state.theme.theme.themeColor
})

export default connect(mapStateToCarouselPage)(CarouselPage)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})