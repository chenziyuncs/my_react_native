import React, { useState } from 'react';

import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
const KEY = 'devio.org'
export default (props: any) => {
  const [text, onChangeText] = useState('');
  const [showText, setShowText] = useState('');
  const onSave = async () => {
    try {
      await AsyncStorage.setItem(KEY, text);
    } catch (error) {
      console.log(error);
    }
  }

  const onGet = async () => {
    try {
      const value = await AsyncStorage.getItem(KEY);
      setShowText(value || '');
      console.log(value);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <TextInput
        style={styles.myInput}
        onChangeText={onChangeText}
        value={text}>
      </TextInput>
      <Button title={'Save'} onPress={onSave}></Button>
      <Button title={'Get'} onPress={onGet}></Button>
      <Text>Result: {showText}</Text>
    </SafeAreaView>
  )
};
const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  myInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
});