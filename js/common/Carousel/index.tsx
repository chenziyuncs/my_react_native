import React, { useState, useRef } from 'react';
import Swiper from 'react-native-swiper';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
const { width: viewportWidth } = Dimensions.get('window')
function CarouselWrap (props: any) {
  let carouselThis: any = null
  const [entries, setEntries] = useState([
    {
      title: '轮播一',
      color: 'red',
      imageSource: require('../../res/img/轮播图1.jpg')
    },
    {
      title: '轮播二',
      color: 'blue',
      imageSource: require('../../res/img/轮播图2.jpg')
    },
    {
      title: '轮播三',
      color: 'green',
      imageSource: require('../../res/img/轮播图3.jpg')
    }
  ])

  const _renderImg = () => {
    let views:any = []
    entries.map(((item, index) => {
      views.push(
        <View key={index}>
           <Image source={item.imageSource} style={styles.slide}></Image>
        </View>
       
      )
    }))
    return views
  }
  return <View style={{height: 170}}>
    <Swiper style={styles.wrapper}
      showsButtons={true}
      autoplay={true}
      autoplayTimeout={2.5}
      horizontal={true}
      loop={true}
      index={0}
      removeClippedSubviews={false}
      dot={<View style={{           //未选中的圆点样式
          backgroundColor: 'rgba(0,0,0,.2)',
          width: 10,
          height: 10,
          borderRadius: 5,
          marginLeft: 10,
          marginRight: 9,
          marginTop: 9,
          marginBottom: 9,
      }}/>}
      activeDot={<View style={{    //选中的圆点样式
        backgroundColor: props.theme.themeColor,
        width: 20,
        height: 10,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 9,
        marginTop: 9,
        marginBottom: 9,
      }}/>}
      paginationStyle={{
        position:'absolute',
        bottom:0,
        left:0
      }}
      nextButton={<Text></Text>}
      prevButton={<Text></Text>}
      buttonWrapperStyle={{
        backgroundColor:'#transparent',
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
    {_renderImg()}
  </Swiper>
  </View>
    
}

const mapStateToCarousel = (state: any) => ({
  theme: state.theme.theme.themeColor
})

export default connect(mapStateToCarousel)(CarouselWrap)

const styles = StyleSheet.create({
  wrapper: {
    flexGrow:1
  },
  slide: {
    width: '100%',
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
