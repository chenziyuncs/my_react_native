import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Linking,
} from 'react-native'

export const Input = (props: any) => {
  const {label, placeholder, secure, shortLine, onChangeText} = props;
  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.row}>
        <Text style={styles.labelStyle}>{label}</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={secure}
          autoCapitalize={'none'}
        />
      </View>
      <View
        style={{
          height: 0.5,
          backgroundColor: '#D0D4D4',
          marginLeft: shortLine ? 20: 0
        }}></View>
    </View>
  );
};

export const ConfirmButton = (props: any) => {
  const {title, onClick} = props;
  return (
    <TouchableOpacity style={styles.confirmButtonStyle} onPress={onClick}>
      <Text style={{color: 'white'}}>{title}</Text>
    </TouchableOpacity>
  );
};

export const Tips = (props: any) => {
  const {title} = props
  return (
    <View style={styles.tipsLayout}>
      <Text style={styles.tipsTitle}>{title}</Text>
    </View>
  )
};

export const NavBar = (props: any) => {
  const {title, rightTitle, onRightClick} = props;
  return (
    <View style={styles.navBarStyle}>
      <Text></Text>
      <View style={styles.titlelayout}>
        <Text style={styles.titleStyls}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onRightClick}>
        <Text style={styles.rightTitleStyle}>{rightTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  rightTitleStyle: {
    color: '#007AFF',
    paddingRight: 15,
    fontSize: 16
  },
  titleStyls: {
    fontSize: 20,
    color: 'black'
  },
  titlelayout: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0
  },
  navBarStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 44,
    alignItems: 'center',
  },
  tipsTitle: {
    color: 'red'
  },
  tipsLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlignVertical: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  labelStyle: {
    fontSize: 16,
    width: 90,
    marginLeft: 15,
    marginTop: 18,
    marginBottom: 18,
    textAlign: 'left'
  },
  inputStyle: {
    marginLeft: 15,
    flex: 1
  },
  confirmButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#2196F3',
    margin: 20,
    padding: 12
  }
});
