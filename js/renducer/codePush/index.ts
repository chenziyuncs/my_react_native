import Types from '../../action/types'

const defaultState = {
  codePushUpdateInfo: {

  }
};
export default function onAction(state = defaultState, action: { type: any; codePushUpdateInfo: any; }) {
  switch (action.type) {
    case Types.SET_CODE_PUSH_UPDATE_INFO:
      return {
        ...state,
        codePushUpdateInfo: action.codePushUpdateInfo
      };
    default:
      return state;
  }
}