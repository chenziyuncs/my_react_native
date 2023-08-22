import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'

import BaseItem from './BaseItem'
export default class PopularItem extends BaseItem {
  render () {
    // const { item } = this.props.item;
    const {projectModel} = this.props;
    // const {item} = projectModel;
    if (!projectModel || !projectModel.owner) return null;
    return (
      <TouchableOpacity
        onPress={this.props.onSelect}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{projectModel.full_name}</Text>
          <Text style={styles.description}>{projectModel.description}</Text>
          <View style={styles.minStyle}>
            <View style={styles.authorWrap}>
              <Text>Author:</Text>
              <Image style={styles.imgStyle} source={{uri: projectModel.owner.avatar_url}} />
            </View>
            <View style={styles.itemWrap}>
              <Text>Start:</Text>
              <Text>{projectModel.stargazers_count}</Text>
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