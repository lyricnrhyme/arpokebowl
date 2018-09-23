'use strict;'

import React, { Component } from 'react';
import { Viro3DObject, ViroNode, ViroText } from 'react-viro';

class Fish3DModel extends Component {
  constructor(props) {
    super(props);
    this.species = props.species;
    this.handlePopUp = this.handlePopUp.bind(this);
  }
  handleEvent = () => {
    console.log(this.props);
  }

  handlePopUp = () => {
    this.props.position = [1, 1, 1]
  }

  onClickEvent = function() {
    this.props.position = [1, 1, 1]
  }

  render() {
    return (
      <ViroNode onDrag={this.props.onDrag || function () { }} dragType={this.props.dragType} animation={this.props.animation}>

        <ViroText
          text={this.props.species}
          color="red"
          width={2} height={2}
          style={{ fontFamily: "Arial", fontSize: 20, fontStyle: "italic" }}
          position={[this.props.position[0], this.props.position[1] + 0.5, this.props.position[2]]}
        />


        <ViroText
          text="TestDescription"
          textAlign="left"
          textAlignVertical="top"
          textLineBreakMode="justify"
          textClipMode="clipToBounds"
          color="#ff0000"
          width={2} height={2}
          style={{ fontFamily: "Arial", fontSize: 20, fontStyle: "italic" }}
          position={[this.props.position[0], this.props.position[1] - 0.5, this.props.position[2]]}
        />

        <Viro3DObject
          source={this.props.source}
          type={this.props.type}
          position={this.props.position}
          scale={this.props.scale}
          rotation={this.props.rotation}
          onClick={() => {this.handlePopUp()}}
        />
      </ViroNode>
    );
  }
}

export default Fish3DModel;