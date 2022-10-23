import React from 'react'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
// import EvilIcons from 'react-native-vector-icons/EvilIcons'
// import Feather from 'react-native-vector-icons/Feather'
// import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import Fontisto from 'react-native-vector-icons/Fontisto'
// import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFontConfig from './config'

// const Icon = createIconSetFromIcoMoon(IconFontConfig)

export default (props) => {
  switch (props.type) {
    case 'AntDesign':
      return (<AntDesign name={props.name} style={props.style} { ...props } />)
    case 'Ionicons':
      return (<Ionicons name={props.name} style={props.style} { ...props } />)
    case 'MaterialCommunityIcons':
      return (<MaterialCommunityIcons name={props.name} style={props.style} { ...props } />)
    case 'Entypo':
      return (<Entypo name={props.name} style={props.style} { ...props } />)
    default:
      // return (<Icon name={props.name} style={props.style} />)
      return null
  }
}
