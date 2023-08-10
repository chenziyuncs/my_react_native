import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
import SafeAreaVIewPlus from '../common/SafeAreaVIewPlus';
import { connect } from 'react-redux';
import BackPressComponent from '../common/BackPressComponent.js';
import { Translation } from 'react-i18next';
import NavigationBar from '../common/NavigationBar';
import { useTranslation } from 'react-i18next';
import ViewUtil from '../util/ViewUtil';
function LanguagePage(props: any) {
  const [backPress, setBackPress] = useState(new BackPressComponent({ backPress: () => _onBackPress() }));
  const { t } = useTranslation();
  let navigationBar = <NavigationBar
    leftButton={ViewUtil.getLeftBackButton(() => {
      _onBlack();
    })}
    title={t('切换语言')}
    statusBar={{
      backgroundColor: props.theme.themeColor,
      barStyle: 'light-content',
    }}
    style={props.theme.styles.navBar}
  />
  const _onBackPress = () => {
    _onBlack();
    return true;
  };
  const _onBlack = () => {
    NavigationUtil.goBack(props.navigation);
    return true;
  }
  useEffect(() => {
    backPress.componentDidMount();
    return () => {
      backPress.componentWillUnmount();
    }
  });
  return (
    <SafeAreaVIewPlus style={styles.container} topColor={props.theme.themeColor}>
      {navigationBar}
      <View style={styles.languageInner}>
        <Translation>
          {
            (t, { i18n }) => (
              <View>
                <Button title={t('切换到中文')} onPress={() => i18n.changeLanguage('zh')}></Button>
                <Button title={t('切换到英文')} onPress={() => i18n.changeLanguage('en')}></Button>
                <Button title={t('切换到日文')} onPress={() => i18n.changeLanguage('ja')}></Button>
              </View>
            )
          }
        </Translation>
      </View>
    </SafeAreaVIewPlus>
    
  )
}

const mapStateToCarouselPage = (state: any) => ({
  theme: state.theme.theme.themeColor
})

export default connect(mapStateToCarouselPage)(LanguagePage)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  languageInner: {
    marginTop: 20
  }
})
