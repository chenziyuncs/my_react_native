import Types from '../types'

export function setCodePushUpdateInfo (codePushUpdateInfo: any) {
  return { type: Types.SET_CODE_PUSH_UPDATE_INFO, codePushUpdateInfo: codePushUpdateInfo }
}