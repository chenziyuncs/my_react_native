import React, { Component } from 'react';
import NavtartionBar, {NAVIGATION_BAR_HEIGHT} from '../common/NavigationBar'
import ViewUtil from '../util/ViewUtil';
import { WebView } from 'react-native-webview';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationUtil from '../navigator/NavigationUtil'
import BackPressComponent from '../common/BackPressComponent'
import FavoriteDao from '../expand/dao/FavoriteDao'
import { connect } from 'react-redux'
import action from '../action'
import SafeAreaVIewPlus from '../common/SafeAreaVIewPlus'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  // DeviceInfo,
  Platform
} from 'react-native'
import DeviceInfo from 'react-native-device-info'
const TRENDING_URL = 'https://github.com/'
const THEME_COLOR = '#678'
const favoriteDao = new FavoriteDao('trending')
class DetailPage extends Component {

  constructor(props) {
    super(props);
    // this.params = this.props.navigation.state.params;
    this.params = this.props.route.params;
    const { projectModel, flag } = this.params;
    this.url = projectModel.html_url || TRENDING_URL + projectModel.fullName;
    const title = projectModel.full_name || projectModel.fullName;
    const isFavorite = projectModel.isFavorite
    this.state= {
      title: title,
      url: this.url,
      canGoBack: false,
      flag,
      isFavorite
    }
    this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
  }
  componentDidMount() {
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }
  onBackPress () {
    this._onBlack();
    return true;
  }
  _onBlack () {
    //高版本react-native-webview 在Android上存在webView.goBack()没有回调onNavigationStateChange的bug
    //在此bug 未修复之前可以直接通过NavigationUtil.goBack(this.props.navigation) 返回上一页来规避
    if (this.state.canGoBack && Platform.OS === 'ios') {
      this.webView.goBack();
    } else {
      NavigationUtil.goBack(this.props.navigation);
    }
  }
  _onFavorite () {
    const { projectModel } = this.params
    const { updateOnLoadFavoriteData } = this.props

    const isFavorite = !this.state.isFavorite
    const type = this.state.flag === 'popular' ? 'CLICK_POUPULAR_FAVORITE' : 'CLICK_TRENDING_FAVORITE'
    updateOnLoadFavoriteData(this.state.flag, projectModel.flagType, [projectModel], isFavorite, type)

    this.params.projectModel.isFavorite = isFavorite;
    this.setState({
      isFavorite: isFavorite
    })    
  }
  _renderRightButton() {
    return (<View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        onPress={() => {
          this._onFavorite();
        }}>
        <FontAwesome
          name={this.state.isFavorite ? 'star' : 'star-o'}
          size={20}
          style={{ color: 'white', marginRight: 10 }}
        />
      </TouchableOpacity>
      {ViewUtil.getShareButton(() => {

      })}
    </View>
    )
  }
  _onNavigationStateChange (navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url,
  });
  }
  render () {
    console.log(DeviceInfo.hasNotch(), 11111)
    let titleLayoutStyle = this.state.title.length > 20 ? {paddingRight: 30} : null;
    let navtartionBar = <NavtartionBar
      leftButton={ViewUtil.getLeftBackButton(() => {
        this._onBlack()
      })}
      titleLayoutStyle={titleLayoutStyle}
      title={this.state.title}
      style={{backgroundColor: THEME_COLOR}}
      rightButton={this._renderRightButton()}
    />
    return(
      <View style={styles.container}>
        {navtartionBar}
        <WebView
          // style={{marginTop: NAVIGATION_BAR_HEIGHT}}
          ref={webView => this.webView = webView}
          startInLoadingState={true}
          onNavigationStateChange={e => this._onNavigationStateChange(e)}
          source={{uri: this.state.url}}
        />
      </View>
    )
  }
}

const mapDetailPageDispatch = (dispatch) => ({
  updateOnLoadFavoriteData: (storeName, flag, data, isFavorite, type) => dispatch(action.updateOnLoadFavoriteData(storeName, flag, data, isFavorite, type))
})

export default connect(null, mapDetailPageDispatch)(DetailPage)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: DeviceInfo.hasNotch() ? 35 : 0
  }
})