import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {PropTypes}  from 'prop-types';


export default class BaseItem extends Component {
  static propsType = {
    projectModel: PropTypes.object,
    onFavorite: PropTypes.func
  }
  constructor (props) {
    super(props);
    const isFavorite = this.props.projectModel.isFavorite
    this.state = {
      isFavorite: isFavorite
    }
  }

  onItemClick () {
    this.props.onSelect((isFavorite) => {
      this.setFavoriteState(isFavorite);
    })
  }

  setFavoriteState (isFavorite) {
    this.props.projectModel.isFavorite = isFavorite;
    this.setState({
      isFavorite: isFavorite
    })
  }

  onPressFavorite () {
    // this.props.projectModel.isFavorite = !this.state.isFavorite;
    // this.setState({
    //   isFavorite: !this.state.isFavorite
    // })
    this.setFavoriteState(!this.state.isFavorite)
    this.props.onFavorite(this.props.projectModel, !this.state.isFavorite)
  }

   /**
   *
   * componentWillReceiveProps在新版React中不能再用了
   * @param nextProps
   * @param prevState
   * @returns {*}
   */
  static getDerivedStateFromProps (nextProps, prevState) {
    const isFavorite = nextProps.projectModel.isFavorite;
    if (prevState.isFavorite !== isFavorite) {
      return {
        isFavorite: isFavorite,
      };
    }
    return null;
  }

  _favoriteIcon () {
    const {theme} = this.props;
    return <TouchableOpacity
    underlayColor={'transparent'}
    style={{padding: 6}} 
    onPress={() => {
      this.onPressFavorite();
    }}
  >
    <FontAwesome name={this.state.isFavorite ? 'star' : 'star-o'} size={26} style={{ color: theme.themeColor }} />
  </TouchableOpacity>
  }
}

const styles = StyleSheet.create({

})