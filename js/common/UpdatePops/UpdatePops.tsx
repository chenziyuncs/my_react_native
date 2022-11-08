import React, { Component } from 'react'
import CodePush from 'react-native-code-push'
import { connect } from 'react-redux'
import PopUps from '../PopUp'
import PopUpservice, { hidePop, showPop } from '../../util/PopUpsUpdateService'
import UpdateScrollView from './Components/UpdateScrollView'
import action from '../../action'
import NavigationUtil from '../../navigator/NavigationUtil';
interface Props {
  codePushUpdateInfo: any,
  setCodePushUpdateInfo: any,
  navigation: any,
  theme: any
}

class UpdatePops extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.updateByCodePush.call(this)
    }, 500)
  }

  // 获取最新的版本信息
  updateByCodePush() {
    CodePush.checkForUpdate()
      .then(update => {
        const { codePushUpdateInfo } = this.props
        if (update) {
          hidePop()
          if (update.description) {
            this.props.setCodePushUpdateInfo({
              ...update,
              isNeedUpdate: true
            })
          }
          showPop({
            confirmButtonTxt: '确定',
            confirmPress: () => {
              NavigationUtil.goPage({
                updateRightNow: true,
                updateInfo: JSON.stringify(update),
                theme: this.props.theme.themeColor
              }, 'CodePushPage');
            },
          })
        } else {
          this.props.setCodePushUpdateInfo({
            ...codePushUpdateInfo,
            isNeedUpdate: false
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <PopUps ref={(PopRef: any) => PopUpservice.setTopLevelPop(PopRef)} style={{ zIndex: 10 }}>
        <UpdateScrollView codePushUpdateInfo={this.props.codePushUpdateInfo} isShowStaticTxt />
      </PopUps>
    )
  }
}

const codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL, installMode: CodePush.InstallMode.ON_NEXT_RESTART }

const mapStateToUpdatePops = (state: any) => ({
  codePushUpdateInfo: state.codePush.codePushUpdateInfo,
  theme: state.theme.theme
})

const mapDispatchToUpdatePops = (dispatch: any) => ({
  setCodePushUpdateInfo: (codePushUpdateInfo: any) => dispatch(action.setCodePushUpdateInfo(codePushUpdateInfo))
})

export default connect(mapStateToUpdatePops, mapDispatchToUpdatePops)(CodePush(codePushOptions)(UpdatePops))
