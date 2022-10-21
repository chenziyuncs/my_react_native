import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class Index extends Component {
  render(): React.ReactNode {
    return(
      <View style={styles.container}>
        <Text>热跟新</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})