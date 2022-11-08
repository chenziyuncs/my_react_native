let _loading: any;

function setTopLevelLoading(loadingRef: any) {
  _loading = loadingRef
}

// 显示loading
export function showLoading() {
  if (_loading && _loading.showLoading) return _loading.showLoading()
}

// 隐藏Loading
export function hideLoading(status: number, hideLoadingTxt: string) {
  if (_loading && _loading.hideLoading) return _loading.hideLoading(status, hideLoadingTxt)
}

export default {
  _loading,
  setTopLevelLoading,
}
