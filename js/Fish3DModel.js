'use strict;'

import React, { Component } from 'react';
import { Viro3DObject, ViroNode, ViroText } from 'react-viro';
const onClickEvent = function () {
  this.setState({ name: this.state.name ? "" : "" });
  this.setState({ description: this.state.description ? "" : "" });
}
class Fish3DModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      species: props.species,
      description: props.description
    }
  }
  handleEvent = () => {
    console.log(this.props);
  }

  onClickEvent = function () {
    this.props.position = [1, 1, 1]
  }

  render() {
    return (
      <ViroNode onDrag={this.props.onDrag || function () { }} dragType={this.props.dragType} animation={this.props.animation}>

        {/* <ViroText
          text={this.props.description}
          color="red"
          width={2} height={2}
          style={{ fontFamily: "Arial", fontSize: 20, fontStyle: "italic" }}
          position={[this.props.position[0], this.props.position[1] + 0.5, this.props.position[2]]}
        /> */}


        <ViroText
          text={`${this.state.species} ${this.state.description}`}
          textAlign="center"
          color="red"
          width={2} height={2}
          style={{ fontFamily: "Helvetica", fontSize: 10, fontStyle: "italic" }}
          position={[this.props.position[0], this.props.position[1] - 0.5, this.props.position[2]]}
        />

        <Viro3DObject
          source={this.props.source}
          type={this.props.type}
          position={this.props.position}
          scale={this.props.scale}
          rotation={this.props.rotation}
          onClick={onClickEvent.bind(this)}
        />
      </ViroNode>
    );
  }
}

export default Fish3DModel;