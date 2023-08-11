import { Animated, Falsy, GestureResponderEvent, RecursiveArray, RegisteredStyle, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState, useEffect} from 'react';
import DeviceInfo from 'react-native-device-info';
const TRANSLATE_Y_OFFSET = 400;

function Modal(props: any) {
  const visible = props.visible;
  const [wrapperOpacity] = useState(new Animated.Value(0));
  const [contentTransformY] = useState(new Animated.Value(TRANSLATE_Y_OFFSET));
  const [computedVisible, setComputedVisible] = useState(visible);
  useEffect(() => {
    if (visible) {
      setComputedVisible(visible);
      Animated.parallel([
        Animated.timing(contentTransformY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(wrapperOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(contentTransformY, {
          toValue: TRANSLATE_Y_OFFSET,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(wrapperOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }),
      ]).start(({finished}) => {
        if (finished) {
          setComputedVisible(false);
        }
      });
    }
  }, [contentTransformY, visible, wrapperOpacity]);
  return computedVisible ? (
    <Animated.View style={[styles.confirmWrapper, { opacity: wrapperOpacity }]}>
      <View style={styles.confirmContainer}>
        <Animated.View
          style={[styles.confirmContent, { transform: [{ translateY: contentTransformY }] }]}>
          {props.titleView || (
            <View style={styles.confirmTitle}>
              <Text style={styles.confirmTitleTxt}>{props.title}</Text>
              <TouchableOpacity
                style={styles.closIcon}
                onPress={props.setVisible(false)}
                >
                <Ionicons
                  name="close-circle-outline"
                  size={24}
                  style={{color: '#E6B57A'}}
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={[styles.content, props.contentStyle]}>
            {props.children}
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  ) : null
}

export default Modal

const styles = StyleSheet.create({
  confirmWrapper: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2,
  },
  confirmContainer: {
    flex: 1,
    justifyContent: 'center',
    // marginLeft: 10,
    // marginRight: 10
  },
  confirmContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 100,
    borderRadius: 8,
  },
  confirmTitle: {
    height: 57.9,
    backgroundColor: 'rgba(0, 0, 0, .1)',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    justifyContent: 'center',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, .1)',
  },
  confirmTitleTxt: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  closIcon: {
    position: 'absolute',
    right: 10,
  },
  content: {
    height: 400,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: (DeviceInfo.hasNotch() ? 24 : 0)
  },
});