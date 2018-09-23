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
  ViroParticleEmitter,
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

        <ViroText text={this.state.text} scale={[.1, .1, .1]} height={1} width={4} position={[0, .5, -1]} style={styles.helloWorldTextStyle} />
        <ViroParticleEmitter
            position={[0, 4.5, 0]}
            duration={2000}
            visible={true}
            delay={0}
            run={true}
            loop={true}
            fixedToEmitter={false}

            image={{
              source:require("./res/bubble.png"),                 
              height:0.1,
              width:0.1,
              bloomThreshold:1.0
            }}

            spawnBehavior={{
              particleLifetime:[4000,4000],
              emissionRatePerSecond:[150, 200], 
              spawnVolume:{
                shape:"box", 
                params:[20, 1, 20], 
                spawnOnSurface:false
              },
              maxParticles:100
            }}

            particleAppearance={{
              opacity:{
                initialRange:[0, 0],
                factor:"time",
                interpolation:[
                  {endValue:0.5, interval:[0,500]},
                  {endValue:1.0, interval:[4000,5000]}
                ]
              },

              // rotation:{
              //   initialRange:[0, 360],
              //   factor:"time",
              //   interpolation:[
              //     {endValue:1080, interval:[0,5000]},
              //   ]
              // },

              scale:{
                initialRange:[[10,10,10], [0,0,0]],
                factor:"distance",
                interpolation:[
                  {endValue:[3,3,3], interval:[4000,0]},
                  {endValue:[0,0,0], interval:[5000,4000]}
                ]
              },
            }}

          particlePhysics={{
            velocity:{
            initialRange:[[-2,.5,0], [2,3.5,0]]}
          }}
        />

        <ViroAmbientLight color="#0077be"/>
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

        {this.state.activeFish.map((item, i) => {
          return(
            <Viro3DObject
              key={i}
              source={ require('./res/Magikarp/MagikarpF.vrx') }
              position={[Math.floor(Math.random() * 5)-2, Math.floor(Math.random() * 5)-2, Math.floor(Math.random() * 5)-2]}
              // position={ [-3, 0, -1] }
              type="VRX"
              scale={ [.01, .01, .01] }
              rotation={ [90, 90, 180] }
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
            />,

            // This is a static Magikarp that is always in the same place
            <Viro3DObject
            key={i}
            source={ require('./res/Magikarp/MagikarpF.vrx') }
            position={ [-3, 0, -1] }
            type="VRX"
            scale={ [.01, .01, .01] }
            rotation={ [90, 90, 180] }
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