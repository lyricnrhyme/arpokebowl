'use strict;'

import React, { Component } from 'react';
import { Viro3DObject } from 'react-viro';

class Fish3DModel extends Component {
  constructor(props){
    super(props);
    this.species = props.species;
  }
  handleEvent = () => {
    console.log(this.props);
  }
  render() {
    return (
      <Viro3DObject
        source = {this.props.source}
        type = {this.props.type}
        position = {this.props.position}
        scale = {this.props.scale}
        rotation = {this.props.rotation}
        dragType = {this.props.dragType}
        onDrag = {this.props.onDrag || function() {}}
        // onClick={onClickEvent}
        animation={this.props.animation}
      />
    );
  }
}

export default Fish3DModel;