'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
} from 'react-viro';
var createReactClass = require('create-react-class');
var HelloWorldSceneAR = createReactClass({
  getInitialState() {
    return {
      text : "Initializing AR...",
      currentAnim:"moveLeftRight"
    };
  },

  render: function() {
    return (
      <ViroARScene onTrackingUpdated={()=>{this.setState({text : "Hello World!"})}}>
        <ViroText text={this.state.text} scale={[.1, .1, .1]} height={1} width={4} position={[0, .5, -1]} style={styles.helloWorldTextStyle} />

        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

        <Viro3DObject
            source={require('./res/Magikarp/MagikarpF.vrx')}
            // position={[Math.floor(Math.random() * 5)-2, Math.floor(Math.random() * 5)-2, Math.floor(Math.random() * 5)-2]}
            position={[-3, 0, -1]}
            type="VRX"
            scale={[.01, .01, .01]}
            rotation={[90, 90, 180]}
            // direction={[0,-1,-.2]}
            dragType="FixedToWorld" onDrag={()=>{}}
            onClick={this._switchAnimation}
            animation={{name:this.state.currentAnim, 
              run:true, 
              interruptible: true}}
          />


      </ViroARScene>
    );
  },
  _switchAnimation() {
    if(this.state.currentAnim == "moveLeftRight") {
        this.setState({
          currentAnim:"stop", 
        });
    } else {
       this.setState({
          currentAnim:"moveLeftRight",
       });
    }
 },     
}
);

ViroAnimations.registerAnimations({
  moveRight:{properties:{positionX:"+=1"}, duration: 10000},
  stop:{properties:{positionX:"-=0"}, duration: 0},
  moveLeftRight:[
    ["moveRight", "stop"],
  ]
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 50,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;