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
  const {label, placeholder, shortLine, secure, onChangeText} = props;
  return (
    <View style={{ backgroundColor: 'white'}}>
      <View style={styles.row}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder={placeholder}
          secureTextEntry={secure}
          // 取大小写
          autoCapitalize={'none'}
          onChangeText={onChangeText}
        />
      </View>
      <View style={{
        height: 0.5,
        backgroundColor: '#D0D4D4',
        marginLeft: shortLine ? 20 : 0
      }}></View>
    </View>
  );
};

export const ConfirmButton = (props: any) => {
  const { title, onClick, bgStyle} = props;
  return (
    <TouchableOpacity style={[styles.confirmButton, bgStyle]} onPress={onClick}>
      <Text style={styles.confirmTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export const Tips = (props: any) => {
  const { msg, helpUrl, bgStyle } = props;
  return (
    <View style={styles.tipsLayout}>
      <Text style={styles.tips}>{msg}</Text>
      {!!helpUrl && (
        <TouchableOpacity style={[bgStyle, { padding: 10, marginLeft: 10, borderRadius: 5 }]} onPress={() => {
          Linking.openURL(helpUrl)
        }}>
          <Text style={{color: 'white'}}>查看帮助
          {/* <Button title={'查看帮助'} onPress={() => {
            Linking.openURL(helpUrl)
          }} /> */}
          </Text>
        </TouchableOpacity>
        
      )}
    </View>
  );
};

export const NavBar = (props: any) => {
  const {title, rightTitle, onRightClick, tcStyle} = props;
  return (
    <View style={styles.navBar}>
      <Text></Text>
      <View style={styles.titleLayout}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onRightClick}>
        <Text style={[styles.rightTitle, tcStyle]}>{rightTitle}</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  rightTitle: {
    // color: '#007AFF',
    paddingRight: 15,  
    fontSize: 16
  },
  title: {
    fontSize: 20,
    color: 'black'
  },
  titleLayout: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44
  },
  tips: {
    fontSize: 14,
    color: 'red'
  },
  tipsLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  inputLabel: {
    marginLeft: 15,
    marginTop: 18,
    marginBottom: 18,
    fontSize: 16,
    width: 90
  },
  inputStyle: {
    flex: 1,
    marginRight: 15
  },
  confirmButton: {
    alignItems: 'center',
    padding: 12,
    margin: 20,
    marginTop: 30,
    borderRadius: 5
  },
  confirmTitle: {
    fontSize: 20,
    color: 'white'
  }
});