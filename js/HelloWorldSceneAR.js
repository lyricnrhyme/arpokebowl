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

          <ViroSound 
          paused={false}
           muted={false}
           source={require('./sound/magikarp.mp3')}
           loop={true}
           volume={1}
           onFinish={this.onFinishSound}
           onError={this.onErrorSound}/>

        <ViroAmbientLight color="#ffffff" />

       <ViroParticleEmitter
            key={"effect_bubbles"}
            position={[0, -5.0, 0]}
            duration={5000}
            visible={true} 
            delay={0}
            run={true}
            loop={true}
            fixedToEmitter={true}

            image={{
                   source:require("./res/particle_bubble.png"), 
                   height:0.1,
                   width:0.1
            }}

            spawnBehavior={{
              particleLifetime:[14000,14000],
              emissionRatePerSecond:[80, 150], // or 300 with a max of 2000
              spawnVolume:{shape:"box", params:[15, 1, 15], spawnOnSurface:false},
              maxParticles:2000
            }}
            particleAppearance={{
              opacity:{
                initialRange:[0.0, 0.0],
                factor:"Time",
                interpolation:[
                  {endValue:1.0, interval:[0,500]},
                  {endValue:0.0, interval:[13700,14000]}
                ]
              },
              scale:{
                initialRange:[[1,1,1], [1,1,1]],
                factor:"Time",
                interpolation:[
                  {endValue:[1.5,1.5,1.5], interval:[4000,9700]},
                  {endValue:[3,3,3], interval:[13700,14000]}
                ]
              },

            }}

            particlePhysics={{
              velocity:{initialRange:[[-.1,.7,0], [.1,.95,0]]}
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
          position={[1, .5, -1]}
          type="VRX"
          scale={[.01, .01, .01]}
          rotation={[90, 180, 180]}
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
            position={[-2, 1, -1]}
            scale={[.0025, .0025, .0025]}
            rotation={[90, 140, 180]}
            type="VRX"
            onClick={this._test.bind(null, this)}
            direction={[0, -1, -.2]}
            animation={{ name: "spin", run: true, loop: true }}
          />
        </ViroNode>
        <ViroNode position={[0, -1, 0]} dragType="FixedToWorld" onDrag={() => { }} >
          <Fish3DModel
            source={require('./res/Psyduck/Psyduck.vrx')}
            position={[Math.floor(Math.random() * 5) - 2, Math.floor(Math.random() * 5) - 2, Math.floor(Math.random() * 5) - 2]}
            scale={[.0035, .0035, .0035]}
            rotation={[90, 130, 180]}
            type="VRX"
            direction={[0, -1, -.2]}
          // animation={{ name: "spin", run: true, loop: true }}
          />
        </ViroNode>

        <ViroNode position={[0, -1, 0]} dragType="FixedToWorld" onDrag={() => { }} >
          <Fish3DModel
            source={require('./res/Dragonair/Dragonair.vrx')}
            position={[Math.floor(Math.random() * 5) - 2, Math.floor(Math.random() * 5) - 2, Math.floor(Math.random() * 5) - 2]}
            scale={[.002, .002, .002]}
            rotation={[90, 150, 180]}
            type="VRX"
            direction={[0, -1, -.2]}
          // animation={{ name: "spin", run: true, loop: true }}
          />
        </ViroNode>

        <ViroNode position={[0, -1, 0]} dragType="FixedToWorld" onDrag={() => { }} >
          <Fish3DModel
            source={require('./res/Wailord/Wailord.vrx')}
            position={[Math.floor(Math.random() * 5) - 2, Math.floor(Math.random() * 5) - 2, Math.floor(Math.random() * 5) - 2]}
            scale={[.0005, .0005, .0005]}
            rotation={[90, 160, 180]}
            type="VRX"
            direction={[0, -2, -.2]}
          // animation={{ name: "spin", run: true, loop: true }}
          />
        </ViroNode>

        <ViroNode position={[0, -1, 0]} dragType="FixedToWorld" onDrag={() => { }} >
          <Fish3DModel
            source={require('./res/Paras/Paras.vrx')}
            position={[Math.floor(Math.random() * 5) - 2, Math.floor(Math.random() * 5) - 2, Math.floor(Math.random() * 5) - 2]}
            scale={[.005, .005, .005]}
            rotation={[90, 160, 180]}
            type="VRX"
            direction={[0, -1, -.2]}
          // animation={{ name: "spin", run: true, loop: true }}
          />
        </ViroNode>

        <ViroNode position={[0, -1, 0]} dragType="FixedToWorld" onDrag={() => { }} >
          <Fish3DModel
            source={require('./res/Squirtle/Squirtle.vrx')}
            position={[Math.floor(Math.random() * 5) - 2, Math.floor(Math.random() * 5) - 2, Math.floor(Math.random() * 5) - 2]}
            scale={[.006, .006, .006]}
            rotation={[90, 200, 180]}
            type="VRX"
            direction={[0, -1, -.2]}
          // animation={{ name: "spin", run: true, loop: true }}
          />
        </ViroNode>

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