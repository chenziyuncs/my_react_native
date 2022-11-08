# my_react_native

# npm install

# 修改 node_modules 包
## react-native-parallax-scroll-view 以及 react-native-check-box 包为
## import { ViewPropTypes } from 'deprecated-react-native-prop-types'

# 查看AppCenter 应用
## appcenter apps list
# 查看应用部署密钥
## appcenter codepush deployment list -a 76058789-qq.com/RN-android -k

# 查看已发布的更新
## appcenter codepush deployment list -a 76058789-qq.com/RN-android

# 安卓codepush更新
## appcenter codepush release-react -a 76058789-qq.com/RN-android
## 发布带有更改日志的强制更新 appcenter codepush release-react -a 76058789-qq.com/RN-android  -m --description "更新内容"

# 安卓打包应用
## cd android && ./gradlew assembleRelease

# ios 打包JS部分的代码和图片资源等打包导出
## react-native bundle --platform ios --entry-file index.js --bundle-output ./bundles/main.jsbundle --assets-dest  ./bundles --dev false
