import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Stats, OrbitControls  } from '@react-three/drei'

import { Physics } from '@react-three/rapier';

import Particle from './Particle';
import Glass from './Glass';
import Emitter from './Emitter';
import Sun, {Line, Wall} from './GlassShapes';

function Scene() {
  const [glassPositions, setGlassPositions] = useState({});

  const passPosition = (index, position) => {
    setGlassPositions((prevPositions) => ({
      ...prevPositions,
      [index]: position,
    }));
  };

  const RandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // useEffect(() => {
  //   console.log(glassPositions)
  // }, [glassPositions])

  return (
    <div id="canvas_wrapper">
      <Canvas shadows={true}>
        <color args={["#eeeeee"]} attach="background" />
        {/* <fogExp2 attach="fog" args={["#e2eafc", 0.001]} /> */}
        {/* <axesHelper args={[10]} /> */}
        <Stats />

        <PerspectiveCamera position={[-25, 15, -35]} args={[60, window.innerWidth / window.innerHeight, 0.1, 3000]} makeDefault />
        <OrbitControls />

        <ambientLight color="#ffffff" intensity={0.8} />
        {/* <directionalLight color="#cddafd" position={[0, 50, -100]} intensity={0.8} /> */}

        <Suspense fallback={null}>
        <Physics  gravity={[0, 0, 0]} interpolation={false} colliders={false}> 
          
          <Sun position={[-10, 10, 0]} startIndex={0} color="orange" passPosition={passPosition} />
          <Line position={[-10, 12, 0]} startIndex={17} color="blue" passPosition={passPosition} />
          <Line position={[-10, 6, -3]} startIndex={24} color={['green', 'red', 'purple']} passPosition={passPosition} />

          <Wall position={[-2, 10, -10]} startIndex={31} color={['#FF5F5F', '#FFD700', '#FF00FF']} colorPattern={"alternate"} passPosition={passPosition} />
          <Wall position={[6, 2, -10]} startIndex={140} color={["#FF6347", "#00FFFF", "#FFD700"]} passPosition={passPosition} />

           {/* <Particle initialPos={[0,10, 0]} glassPositions={glassPositions}/> */}

          {/* <mesh position={[-3,10, 0]}>
            <boxGeometry />
          </mesh> */}

          <Emitter numParticles={200} initialPos={[10,6, -5]} glassPositions={glassPositions} />
          <Emitter numParticles={200} initialPos={[1,13, -5]} glassPositions={glassPositions} /> 
          <Emitter numParticles={200} initialPos={[-3,8, 0]} glassPositions={glassPositions} />

          <Emitter numParticles={300} initialPos={[0,10, 0]} glassPositions={glassPositions} />

        </Physics>
        </Suspense>

      </Canvas>
    </div>
  );
}

export default Scene;
