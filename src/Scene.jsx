import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Stats, OrbitControls  } from '@react-three/drei'

import { Physics } from '@react-three/rapier';

import Particle from './Particle';
import Glass from './Glass';
import Emitter from './Emitter';
import Ray from './Ray';

function Scene() {
  const [glassPositions, setGlassPositions] = useState({});

  const passPosition = (index, position) => {
    setGlassPositions((prevPositions) => ({
      ...prevPositions,
      [index]: position,
    }));
  };

  // useEffect(() => {
  //   console.log(glassPositions)
  // }, [glassPositions])

  return (
    <div id="canvas_wrapper">
      <Canvas shadows={true}>
        <color args={["#eeeeee"]} attach="background" />
        {/* <fogExp2 attach="fog" args={["#e2eafc", 0.001]} /> */}
        <axesHelper args={[10]} />
        <Stats />

        <PerspectiveCamera position={[-10, 30, -70]} args={[60, window.innerWidth / window.innerHeight, 0.1, 3000]} makeDefault />
        <OrbitControls />

        <ambientLight color="#ffffff" intensity={0.8} />
        {/* <directionalLight color="#cddafd" position={[0, 50, -100]} intensity={0.8} /> */}

        <Suspense fallback={null}>
        <Physics  gravity={[0, 0, 0]} interpolation={false} colliders={false}> 
          <Glass index={0} position={[-10, 10, 0]} color={"blue"} sendPosition={passPosition}/>
          {/* <Particle initialPos={[0, 10, 0]} glassPositions={glassPositions}/> */}

          <Emitter numParticles={100} initialPos={[0,10,0]} glassPositions={glassPositions} />
          {/* <Emitter numParticles={100} initialPos={[0,7.5,0]} glassPositions={glassPositions} /> */}
          {/* <Emitter numParticles={100} initialPos={[0,5,0]} glassPositions={glassPositions} /> */}

          {/* <Ray initialPos={[0, 10, 0]} /> */}
        </Physics>
        </Suspense>

      </Canvas>
    </div>
  );
}

export default Scene;
