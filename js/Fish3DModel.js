'use strict;'

import React, { Component } from 'react';
import { Viro3DObject, ViroNode, ViroText } from 'react-viro';
import fishData from './fishy.json';
const onClickEvent = function() {
  this.setState({name : this.state.name ? "" : "TestName"});
  this.setState({description : this.state.description ? "" : "TestDescription"});
}

class Fish3DModel extends Component {
  constructor(props){
    super(props);
    this.species = props.species;
    this.state = {name : "", description : ""};
  }
  getInitialState() {
    return {
      name: "TestName",
      description: "TestDescription"
    };
  }
  handleEvent = () => {
    console.log(this.props);
  }
  

  
  render() {
    return (
      <ViroNode onDrag = {this.props.onDrag || function() {}} dragType = {this.props.dragType} animation={this.props.animation}>
        
        <ViroText
          text={this.state.name}
          textLineBreakMode="Justify"
          textClipMode="None"
          color="#ff0000"
          width={2} height={2}
          style={{fontFamily:"Arial", fontSize:20, fontStyle:"italic"}}
          position={[this.props.position[0], this.props.position[1] + 0.5, this.props.position[2]]}
        />

        
        <ViroText
          text={this.state.description}
          textLineBreakMode="Justify"
          textClipMode="None"
          color="#ff0000"
          width={2} height={2}
          style={{fontFamily:"Arial", fontSize:20, fontStyle:"italic"}}
          position={[this.props.position[0], this.props.position[1] - 0.5, this.props.position[2]]}
        />

        <Viro3DObject
          source = {this.props.source}
          type = {this.props.type}
          position = {this.props.position}
          scale = {this.props.scale}
          rotation = {this.props.rotation}
          onClick={onClickEvent.bind(this)}
          
        />
      </ViroNode>
    );
  }
}

export default Fish3DModel;