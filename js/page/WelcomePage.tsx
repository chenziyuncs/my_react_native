import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView
} from 'react-native'
import NavigationUtil from '../navigator/NavigationUtil';
import { getBoarding } from '../util/boardingUtil';
import { connect } from 'react-redux'
interface Props {
  navigation: any,
  boarding: any
}
class WelcomePage extends Component<Props> {
  constructor(props: any) {
    super(props);
  }
  timer!: number;
  async doLaunch() {
    const { navigation } = this.props;
    // const boarding = await getBoarding();
    const { boarding } = this.props;
    this.timer = setTimeout(() => {
      // NavigationUtil.resetToHomePage({ navigation })
      if (boarding) {
        NavigationUtil.resetToHomePage({ navigation })
      } else {
        NavigationUtil.login({ navigation })
      }
    }, 2000)
  }
  componentDidMount(): void {
    this.doLaunch()
  }
  componentWillUnmount(): void {
    this.timer && clearTimeout(this.timer);
  }
  render(): React.ReactNode {
    return(
      <SafeAreaView style={{'flex': 1}}>
        <View style={styles.container}>
          <Text>欢迎页面</Text>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToelcomePage = (state: any) => ({
  boarding: state.user.boarding
})

export default connect(mapStateToelcomePage)(WelcomePage)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
