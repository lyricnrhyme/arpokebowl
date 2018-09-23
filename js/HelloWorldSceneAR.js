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
// TODO -
const onClickEvent = function() { console.log("Hello world!"); }
var createReactClass = require('create-react-class');
var HelloWorldSceneAR = createReactClass({
  getInitialState() {
    return {
      text : "Initializing AR...",
      activeFish : [{},{},{}]
    };
  },

  render: function() {
    return (
      <ViroARScene onTrackingInitialized={()=>{this.setState({text : "Hello World!"})}}>
        <ViroText text={this.state.text} scale={[.1, .1, .1]} height={1} width={4} position={[0, .5, -1]} style={styles.helloWorldTextStyle} />

        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

          // dynamic spawning of fish using arguments in this.state.activeFish
          {
            this.state.activeFish.map((item, i) => {
              return (<Viro3DObject
                source={require('./res/Magikarp/MagikarpF.vrx')}
                position={[0, 0, -1 * i]}
                scale={[.002, .002, .002]}
                rotation={[90, 90, 180]}
                type="VRX"
                dragType="FixedDistance" onDrag={()=>{}}
                animation={{name:'animateImage', run:true}}
                onClick={() => console.log("hello world")}
              />)
            })
          }



      </ViroARScene>
    );
  },
});

ViroAnimations.registerAnimations({
  animateImage:{properties:{scaleX:.01, scaleY:.01, scaleZ:.01, opacity: 1},
        easing:"Bounce", duration: 5000},
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