import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  View,
  Easing,
  Dimensions,
  Text,
  Animated
} from 'react-native';

const {width, height} = Dimensions.get("window");
const viewHeight = 35;

class ToastView extends Component {

  moveAnim = new Animated.Value(height / 12);
  opacityAnim = new Animated.Value(0);
  dismissHandler = null;

  constructor(props) {
    super(props);
    this.state = {
      message: props.message !== undefined ? props.message : '',
      time: props.time && props.time < 1500 ? 1000 : props.time,
    }
  }

  render() {
    return (
      <View style={styles.container} pointerEvents='none'>
        <Animated.View style={[styles.textContainer, {bottom: this.moveAnim, opacity: this.opacityAnim}]}><Text
          style={styles.defaultText}>{this.state.message}</Text></Animated.View>
      </View>
    )
  }

  static getDerivedStateFromProps(props, state) {
    const message = props.message !== undefined ? props.message : ''
    const time = props.time && props.time < 1500 ? 1000 : props.time
    return { message, time }
  }

  componentDidMount() {
    Animated.timing(
      this.moveAnim,
      {
        toValue: height / 8,
        duration: 80,
        easing: Easing.ease,
        useNativeDriver: false
      },
    ).start(this.timingDismiss);
    Animated.timing(
      this.opacityAnim,
      {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: false
      },
    ).start();
  }

  componentWillUnmount() {
    clearTimeout(this.dismissHandler)
  }


  timingDismiss = () => {
    this.dismissHandler = setTimeout(() => {
      this.dismiss()
    }, this.state.time)
  };

  dismiss = () => {
    Animated.timing(
      this.opacityAnim,
      {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: false
      },
    ).start(this.onDismiss);
  };

  onDismiss = () => {
    if (this.props.onDismiss) {
      this.props.onDismiss()
    }
  }
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'rgba(0,0,0,.6)',
    borderRadius: 8,
    padding: 10,
    maxWidth: width / 1.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  defaultText: {
    color: "#FFF",
    fontSize: 15,
  },
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center'
  }
});
export default ToastView