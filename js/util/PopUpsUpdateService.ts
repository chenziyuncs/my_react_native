let _pop: any;

function setTopLevelPop (popRef: any) {
  _pop = popRef
}

/**
 * 显示弹窗
 * contentTxt 显示的文本
 * confirmPress 确实事件
 * cancel 取消事件
 */

export function showPop (PopSetting: any) {
  if (_pop && _pop.show) return _pop.show(PopSetting)
}

export function hidePop () {
  if (_pop && _pop.hide) return _pop.hide()
}

export default {
  _pop,
  setTopLevelPop
}