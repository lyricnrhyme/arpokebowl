'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  Viro360Image,
  ViroARPlane,
  ViroScene,
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
// TODO -
const onClickEvent = function() { console.log("Hello world!"); }
var createReactClass = require('create-react-class');
var HelloWorldSceneAR = createReactClass({
  getInitialState() {
    return {
      text : "Initializing AR...",
      activeFish : [{},{},{}],
      currentAnim:"moveInstructions"
    };
  },

  render: function() {
    return (
      <ViroARScene onTrackingUpdated={()=>{this.setState({text : "Hello World!"})}}>

        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

        <Viro360Image
      source={require("./res/blueWater.png")}
      format="RGBA8"
      onLoadStart={this._onLoadStart}
      onLoadEnd={this._onLoadEnd}
      onError={this._onError} />

        {this.state.activeFish.map((item, i) => {
          return(
            <Viro3DObject
              key={i}
              source={ require('./res/Magikarp/MagikarpF.vrx') }
              position={[Math.floor(Math.random() * 5)-2, Math.floor(Math.random() * 5)-2, Math.floor(Math.random() * 5)-2]}
              // position={ [-3, 0, -1] }
              type="VRX"
              scale={ [.01, .01, .01] }
              rotation={ [90, Math.floor(Math.random() * 360), 180] }
              // direction={[0,-1,-.2]}
              dragType="FixedToWorld"
              onDrag={ () => { } }
              onClick={ this._switchAnimation}
              animation={
                {
                  name: this.state.currentAnim,
                  run: true,
                  interruptible: true
                }
              }
            />
          )
        })
        }
      </ViroARScene>
    );
  },
  _switchAnimation() {
    if(this.state.currentAnim == "moveInstructions") {
        this.setState({
          currentAnim:"stop", 
        });
    } else {
       this.setState({
          currentAnim:"moveInstructions",
       });
    }
 },     
}
);

ViroAnimations.registerAnimations({
  moveRight:{properties:{positionX:"+=1"}, duration: 10000},
  stop:{properties:{positionX:"-=0"}, duration: 0},
  moveInstructions:[
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