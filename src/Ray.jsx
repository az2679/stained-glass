import { useRef, useEffect, useState } from 'react';
import { RigidBody,CuboidCollider } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

function RandomInt(min, max){
  // return Math.floor(Math.random() * (max - min + 1) + min);
  return Math.random() * (max - min + 1) + min
}

export default function Ray({ initialPos }) {
  const ref = useRef();
  const [color, setColor] = useState("#ffffff");

  const [intersected, setIntersected] = useState(false);
  const [lifetime, setLifetime] = useState(1);
  const [lifetimeFinished, setLifetimeFinished] = useState(false)
  const [visible, setVisible] = useState(false);
  const [growth, setGrowth] = useState(0.1);

  const velocity = new Vector3();

  useEffect(() => {
    setIntersected(false)
  }, []);

  useEffect(() => {
    velocity.randomDirection();
    velocity.multiplyScalar(RandomInt(0.5, 1));
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.setLinvel({x:2, y: velocity.y, z:velocity.z})
    }
  }, [ref.current]);

  const handleIntersection = (glassColor) => {
    setColor(glassColor);
    setVisible(true)
    setIntersected(true)
  }

  const decreaseLifetime = () => {
    setLifetime((value) => Math.max(value - 0.005, 0))
  };

  const increaseGrowth = () => {
    setGrowth((value) => value + 0.005)
  };

  useFrame(() => {
    if(lifetime <= 0.006) {
      setLifetimeFinished(true)
      setIntersected(false)
    } else {
      if(intersected){
        decreaseLifetime()
        increaseGrowth()
      }
    }

    setTimeout(() => {
      decreaseLifetime()
    }, 10000)

  });

  return !lifetimeFinished ? (
    <RigidBody
      ref={ref}
      mass={1}
      type="dynamic"
      colliders={false}
      position={initialPos ? initialPos : [0, 20, 0]}
    >
      <mesh scale={growth} 
      // visible={visible}
      visible={true}
      >
        <boxGeometry args={[2, 10, 10]} />
        <meshPhongMaterial color={color} opacity={lifetime} transparent={true}/>
      </mesh>
      <CuboidCollider sensor args={[2, 10, 10]} scale={growth/2} 
      onIntersectionExit={(payload) => {
        if(payload.other.rigidBodyObject.name == "glass"){

        const glassColor = payload.other.rigidBodyObject.children[0]?.material?.color;
        if(glassColor){
          handleIntersection(glassColor)
        }
      }
    }} />
    </RigidBody>
  ) : null;
}