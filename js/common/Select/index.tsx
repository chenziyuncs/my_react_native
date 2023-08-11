import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
function SelectComponents(props: any) {
  const theme = useSelector((state: any) => state.theme.theme);
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View style={styles.selectContainer}>
        <View style={styles.selectValue}>
          <Text style={styles.selectValueTxt}>{props.label}</Text>
        </View>
        <View style={[styles.arrowBottomContainer, { 'backgroundColor': theme.themeColor.themeColor }]}>
          <Ionicons size={24} name='ios-chevron-down-outline' style={styles.arrowBottomIcon} />
        </View>
      </View>
    </TouchableNativeFeedback>
  )

}

export default SelectComponents

const styles = StyleSheet.create({
  selectContainer: {
    borderRadius: 6,
    width: '100%',
    height: 38.4,
    flexDirection: 'row'
  },
  selectValue: {
    flex: 1,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, .2)',
    justifyContent: 'center',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    paddingLeft: 10,
  },
  selectValueTxt: {
    color: '#fff',
    fontSize: 12.6,
  },
  arrowBottomContainer: {
    width: 38.4,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBottomIcon: {
    color: '#fff',
  }
})