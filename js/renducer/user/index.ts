import Types from '../../action/types'

const defaultState = {
  token: '',
  boarding: ''
};
export default function onAction(state = defaultState, action: { type: any; token: any; boarding: any}) {
  switch (action.type) {
    case Types.SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case Types.KEY_BOADRDING_PASS:
      return {
        ...state,
        boarding: action.boarding
      }
    default:
      return state;
  }
}