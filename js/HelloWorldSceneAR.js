'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  Viro360Image,
  ViroARPlane,
  ViroScene,
  ViroText,
  ViroMaterials,
  ViroBox,
  ViroImage,
  ViroSkyBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroParticleEmitter,
  ViroSound,
  ViroAnimations,
} from 'react-viro';
import Fish3DModel from './Fish3DModel';
// TODO -

const createReactClass = require('create-react-class');
const HelloWorldSceneAR = createReactClass({
  getInitialState() {
    return {
      text: "Initializing AR...",
      activeFish: [{}, {}, {}],
      currentAnim: "moveInstructions"
    };
  },

  render: function () {
    return (
      <ViroARScene onTrackingUpdated={()=>{this.setState({text : "Hello World!"})}}>


      <ViroSound paused={false}
           muted={false}
           source={require('./sound/ukulele.mp3')}
           loop={false}
           volume={.75}
           onFinish={this.onFinishSound}
           onError={this.onErrorSound}/>
          <ViroSound paused={false}
           muted={false}
           source={require('./sound/magikarp.mp3')}
           loop={false}
           volume={.75}
           onFinish={this.onFinishSound}
           onError={this.onErrorSound}/>

        <ViroAmbientLight color="#ffffff" />

        <ViroParticleEmitter
          position={[0, -4, 0]}
          duration={2000}
          visible={true}
          delay={0}
          run={true}
          loop={true}
          fixedToEmitter={false}

          image={{
            source: require("./res/bubble.png"),
            height: 1,
            width: 1,
            bloomThreshold: 100
          }}

          spawnBehavior={{
            particleLifetime: [4000, 4000],
            emissionRatePerSecond: [150, 200],
            spawnVolume: {
              shape: "box",
              params: [20, 1, 20],
              spawnOnSurface: false
            },
            maxParticles: 40
          }}

          particlePhysics={{
            velocity: {
              initialRange: [[-2, .5, 0], [2, 3.5, 0]]
            }
          }}
        />

        {this.state.activeFish.map((item, i) => {
          return (
            <Fish3DModel
              key={i}
              species="Magikarp"
              source={require('./res/Magikarp/MagikarpF.vrx')}
              position={[Math.floor(Math.random() * 5) - 2, Math.floor(Math.random() * 5) - 2, Math.floor(Math.random() * 5) - 2]}
              // position={ [-3, 0, -1] }
              type="VRX"
              scale={[.01, .01, .01]}
              rotation={[90, 90, 180]}
              // direction={[0,-1,-.2]}
              dragType="FixedToWorld"
              onDrag={() => { }}
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

        <Fish3DModel
          source={require('./res/Magikarp/MagikarpF.vrx')}
          position={[-3, 0, -1]}
          type="VRX"
          scale={[.01, .01, .01]}
          rotation={[90, 90, 180]}
          // direction={[0,-1,-.2]}
          dragType="FixedToWorld"
          onDrag={() => { }}
          onClick={this._test.bind(null, this)}
          animation={
            {
              name: this.state.currentAnim,
              run: true,
              interruptible: true
            }
          }
        />

        <ViroNode position={[0, -1, 0]} dragType="FixedToWorld" onDrag={() => { }} >
          <Fish3DModel
            source={require('./res/Gyarados/GyaradosM.vrx')}
            position={[-.5, .5, -1]}
            scale={[.003, .003, .003]}
            rotation={[90, 140, 180]}
            type="VRX"
            onClick={this._test.bind(null, this)}
            direction={[0, -1, -.2]}
            animation={{ name: "spin", run: true, loop: true }}
          />
        </ViroNode>

        <Viro360Image
    source={require('./res/blueWater.png')}
    rotation={[0, 45, 0]}
    format="RGBA8"
    onLoadStart={this._onLoadStart}
    onLoadEnd={this._onLoadEnd}
    style={"opacity:0.7"}
    onError={this._onError} />

      </ViroARScene>
    );
  },
  _test() {
    console.log(this);
  },
  _switchAnimation() {
    if (this.state.currentAnim == "moveInstructions") {
      this.setState({
        currentAnim: "stop",
      });
    } else {
      this.setState({
        currentAnim: "moveInstructions",
      });
    }
  },
}
);

ViroAnimations.registerAnimations({
  moveRight: {
    properties: { positionX: "+=1" },
    duration: 10000
  },
  stop: {
    properties: { positionX: "-=0" },
    duration: 0
  },
  moveInstructions: [
    ["moveRight", "stop"],
  ],
  spin: {
    properties: {
      rotateY: "+=90"
    },
    duration: 1000, //.25 seconds
  },
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