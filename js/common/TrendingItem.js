import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
// import HTMLView from 'react-native-htmlview';
import BaseItem from './BaseItem'

export default class TrendingItem extends BaseItem {
  constructor (props) {
    super(props)
  }
  render() {
    const {projectModel} = this.props;
    if (!projectModel) return null;
    // let description = `<p>${item.description}</p>`
    return (
      <TouchableOpacity
        // onPress={this.props.onSelect}
        onPress={() => this.onItemClick()}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{projectModel.fullName}</Text>
          {/* <HTMLView
            value={description}
            onLinkPress={() => {}}
            stylesheet={{
              p: styles.description,
              a: styles.description
            }}
          /> */}
          <Text style={styles.description}>{projectModel.description}</Text>
          <Text style={styles.description}>{projectModel.meta}</Text>
          <View style={styles.minStyle}>
            <View style={styles.authorWrap}>
              <Text>Built by:</Text>
              {
                projectModel.contributors.map((result, i, arr) => {
                  return <Image
                    key={i}
                    style={{...styles.imgStyle, margin: 2}}
                    source={{ uri: arr[1] }} />
                })
              }
              
            </View>
            {this._favoriteIcon()}
          </View>
        </View>
      </TouchableOpacity>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gary',
    shadowOpacity: 0.4,
    shadowOffset: {width: 0.5, height: 0.5},
    shadowRadius: 1,
    elevation: 2
  },
  minStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imgStyle: {
    height: 22,
    width: 22
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121'
  },
  description: {
    fontSize: 12,
    marginBottom: 2,
    color: '#757575'
  },
  authorWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})