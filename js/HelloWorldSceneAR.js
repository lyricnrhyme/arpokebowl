'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >

        {/* Hello World Text */}
        {/* <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} /> */}

        {/* Grid Box */}
        {/* <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} animation={{ name: "rotate", run: true, loop: true }} /> */}

        {/* Emoji */}
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

        {/* Emoji */}
        {/* <ViroNode position={[0, -1, 0]} dragType="FixedToWorld" onDrag={() => { }} > */}
        {/* <Viro3DObject
            source={require('./res/emoji_smile/emoji_smile.vrx')}
            resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
            require('./res/emoji_smile/emoji_smile_normal.png'),
            require('./res/emoji_smile/emoji_smile_specular.png')]}
            position={[-.5, .5, -1]}
            scale={[.2, .2, .2]}
            type="VRX" /> */}

        {/* </ViroNode> */}

        {/* Magikarp */}
        <ViroNode position={[0, -1, 0]} dragType="FixedToWorld" onDrag={() => { }} >
          <Viro3DObject
            source={require('./res/Magikarp/MagikarpF.vrx')}
            position={[0, 0, -1]}
            scale={[.002, .002, .002]}
            rotation={[90, 90, 180]}
            type="VRX"
            dragType="FixedDistance" onDrag={() => { }}
            animation={{ name: 'animateImage', run: true }}
          />
        </ViroNode>

        <Viro3DObject
          source={require('./res/Magikarp/MagikarpF.vrx')}
          position={[Math.floor(Math.random() * 5) - 2, Math.floor(Math.random() * 5) - 2, Math.floor(Math.random() * 5) - 2]}
          // position={[2,1,1,]}
          scale={[.003, .003, .003]}
          rotation={[90, 90, 180]}
          type="VRX"
          direction={[0, -1, -.2]}
          animation={{ name: "spin", run: true, loop: true }}
        />

        <Viro3DObject
          source={require('./res/Gyarados/GyaradosM.vrx')}
          // position={[Math.floor(Math.random() * 5) - 2, Math.floor(Math.random() * 5) - 2, Math.floor(Math.random() * 5) - 2]}
          position={[2, 1, 1,]}
          scale={[.002, .002, .002]}
          rotation={[90, 90, 180]}
          type="VRX"
          direction={[0, -1, -.2]}
        // animation={{ name: "spin", run: true, loop: true }}
        />


      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

// Styling for text
var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

//Styling for the grid
ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});

//Animation for the grid
ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250, //.25 seconds
  },
});

ViroAnimations.registerAnimations({
  spin: {
    properties: {
      rotateY: "+=90"
    },
    duration: 100, //.25 seconds
  },
  animateImage: {
    properties: { scaleX: .01, scaleY: .01, scaleZ: .01, opacity: 1 },
    easing: "Bounce", duration: 5000
  },
});

module.exports = HelloWorldSceneAR;