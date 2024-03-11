import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Stats, OrbitControls  } from '@react-three/drei'

import { Physics } from '@react-three/rapier';

import Particle from './Particle';
import Glass from './Glass';

function Scene() {
  return (
    <div id="canvas_wrapper">
      <Canvas shadows={true}>
        <color args={["#e2eafc"]} attach="background" />
        {/* <fogExp2 attach="fog" args={["#e2eafc", 0.001]} /> */}
        <axesHelper args={[10]} />
        <Stats />

        <PerspectiveCamera position={[-10, 30, -100]} args={[60, window.innerWidth / window.innerHeight, 0.1, 3000]} makeDefault />
        <OrbitControls />

        <ambientLight color="#ffffff" intensity={0.15} />
        <directionalLight color="#cddafd" position={[0, 50, -100]} intensity={0.8} />

        <Suspense fallback={null}>
        <Physics debug gravity={[0, 0, 0]} interpolation={false} colliders={false}> 
          <Glass index={0} color={"blue"}/>
          <Particle initialPos={[0, 10, 0]} />
        </Physics>
        </Suspense>

      </Canvas>
    </div>
  );
}

export default Scene;
