import React, { Component } from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CodePush from 'react-native-code-push';
import ViewUtils from '../util/ViewUtil';
import NavigationBar from '../common/NavigationBar';
import SafeAreaViewPlus from '../common/SafeAreaVIewPlus';
import GlobalStyles from '../config/GlobalStyles';
import NavigationUtil from '../navigator/NavigationUtil';
import action from '../action';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restartAllowed: true,
      progress: null,
      syncMessage: '',
      // updateInfo: null
    }
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus',
      () => {
        const { navigation } = this.props
        const isUpdateRightNow = navigation.getParam('updateRightNow', false)
        if (isUpdateRightNow) {
          const updateInfo = JSON.parse(navigation.getParam('updateInfo', {}))
          this.setState({
            updateInfo
          })
          this.sync()
        } else {
          this.getUpdateInfo()
        }
      }
    )
  }
  getUpdateInfo() {
    CodePush.checkForUpdate()
      .then(update => {
        const { codePushUpdateInfo } = this.props
        if (update) {
          return this.setState({
            updateInfo: update
          })
        }
        if (codePushUpdateInfo.isNeedUpdate) {
          this.props.setCodePushUpdateInfo({
            ...codePushUpdateInfo,
            isNeedUpdate: false
          })
        }
      })
  }

  codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.syncMessage = '正在检查更新。'
        this.setState({ syncMessage: '正在检查更新。'})
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({ syncMessage: '正在下载包。'})
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({ syncMessage: '正在等待用户操作。'})
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({ syncMessage: '正在安装更新。'})
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({ syncMessage: '最新应用程序。', progress: false})
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({ syncMessage: '用户已取消更新。', progress: false})
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({ syncMessage: '更新已安装并将在重新启动时应用。', progress: false})
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({ syncMessage: '发生未知错误。', progress: false})
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    this.setState({ progress })
  }

  toggleAllowRestart() {
    this.state.restartAllowed
      ? CodePush.disallowRestart()
      : CodePush.allowRestart();

    this.setState({restartAllowed: !this.state.restartAllowed});
  }

  getUpdateMetadata() {
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
      .then((metadata) => {
        this.setState({syncMessage: metadata ? JSON.stringify(metadata) : 'Running binary version', progress: false})
      }, (error) => {
        this.setState({syncMessage: 'Error: ' + error, progress: false})
      });
  }

  /** Update is downloaded silently, and applied on restart (recommended) */
  sync() {
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.ON_NEXT_RESTART,
        mandatoryInstallMode: CodePush.InstallMode.ON_NEXT_RESTART
      },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this),
    ).then(() => {
      const { codePushUpdateInfo } = this.props
      this.props.setCodePushUpdateInfo({
        ...codePushUpdateInfo,
        isNeedUpdate: false
      })
    });
  }

  /** Update pops a confirmation dialog, and then immediately reboots the app */
  syncImmediate() {
    CodePush.sync(
      {installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true},
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this),
    );
  }
  /** 渲染展示的更新描述文字 * */
  renderUpdateInfo() {
    const { codePushUpdateInfo } = this.props
    if (!codePushUpdateInfo.isNeedUpdate) {
      return (
        <Text style={styles.descriptionTxt}>当前版本已经是最新版本</Text>
      )
    }
    return (
      <Text style={styles.descriptionTxt}>
        有新的更新内容
      </Text>
    )
  }

  render() {
    let progressView;
    if (this.state.progress) {
      progressView = (
        <Text style={styles.messages}>
          {this.state.progress.receivedBytes}
          {' '}
          /
          {' '} 
          {this.state.progress.totalBytes}
          {' '}
          bytes
        </Text>
      );
    }
    const { theme, updateInfo } = this.props.route.params
    return (
      <SafeAreaViewPlus
        style={GlobalStyles.root_container}
        topColor={theme.themeColor}
      >
        <NavigationBar
          style={theme.styles.navBar}
          leftButton={ViewUtils.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation))}
          title={'CodePush'}
        />
        <View style={styles.container}>
          <Text style={styles.welcome}>
          { this.renderUpdateInfo.call(this) }
          </Text>
          <TouchableOpacity onPress={this.sync.bind(this)} style={{
                display: updateInfo ? 'flex' : 'none'
              }}>
              <Text style={styles.syncButton}>立即更新</Text>
          </TouchableOpacity>
          { progressView }
          <Text style={styles.messages}>{this.state.syncMessage || ''}</Text>
        </View>
       
        {/* <TouchableOpacity onPress={this.syncImmediate.bind(this)}>
          <Text style={styles.syncButton}>按下以进行对话驱动的同步</Text>
        </TouchableOpacity>
        {progressView}
        <TouchableOpacity onPress={this.toggleAllowRestart.bind(this)}>
          <Text
            style={styles.restartToggleButton}>重新启动 {this.restartAllowed ? 'allowed' : 'forbidden'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getUpdateMetadata.bind(this)}>
          <Text style={styles.syncButton}>按下更新元数据</Text>
        </TouchableOpacity> */}
        
      </SafeAreaViewPlus>
    );
  }
}

const mapStateToUpdatePops = (state) => ({
  codePushUpdateInfo: state.codePush.codePushUpdateInfo,
  theme: state.theme.theme
})

const mapDispatchToUpdatePops = (dispatch) => ({
  setCodePushUpdateInfo: (codePushUpdateInfo) => dispatch(action.setCodePushUpdateInfo(codePushUpdateInfo))
})
/**
* Configured with a MANUAL check frequency for easy testing. For production apps, it is recommended to configure a
* different check frequency, such as ON_APP_START, for a 'hands-off' approach where CodePush.sync() does not
* need to be explicitly called. All options of CodePush.sync() are also available in this decorator.
*/
const codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL, installMode: CodePush.InstallMode.ON_NEXT_RESTART }

export default connect(mapStateToUpdatePops, mapDispatchToUpdatePops)(CodePush(codePushOptions)(App))

const styles = StyleSheet.create({
  descriptionTxt: {
    fontSize: 14,
    color: '#000'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50
  },
  image: {
    margin: 30,
    width: Dimensions.get('window').width - 100,
    height: 365 * (Dimensions.get('window').width - 100) / 651,
  },
  messages: {
    marginTop: 30,
    textAlign: 'center',
    color: '#000'
  },
  restartToggleButton: {
    color: 'blue',
    fontSize: 17,
  },
  syncButton: {
    color: 'green',
    fontSize: 17,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
});
