import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
export default function Button(props: any) {
  const theme = useSelector((state: any) => state.theme.theme.themeColor);
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.button, props.block ? styles.blockButton : null, props.wrapperStyle, {backgroundColor: theme.themeColor}]}>
      {
        props.children || (
          <Text style={[styles.buttonTxt, props.titleStyle]}>{props.title}</Text>
        )
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 83.4,
    height: 37.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  },
  buttonTxt: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  blockButton: {
    width: '100%',
  }
});