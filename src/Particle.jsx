import { useRef, useEffect, useState } from 'react';
import { RigidBody,BallCollider } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';

export default function Particle({ initialPos }) {
  const ref = useRef();
  const [color, setColor] = useState("#ffffff");

  const [intersected, setIntersected] = useState(false);
  const [lifetime, setLifetime] = useState(1);
  const [lifetimeFinished, setLifetimeFinished] = useState(false)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.setLinvel({x:5, y: 0, z:0})
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

  useFrame(() => {
    if(lifetime <= 0.006) {
      setLifetimeFinished(true)
    } else {
      if(intersected){
        decreaseLifetime()
      }
    }
  });

  return !lifetimeFinished ? (
    <RigidBody
      ref={ref}
      mass={1}
      type="dynamic"
      colliders={false}
      position={initialPos ? initialPos : [0, 20, 0]}
    >
      <mesh scale={0.2} 
      // visible={visible}
      visible={true}>
        <sphereGeometry args={[5, 128, 128]} />
        <meshPhongMaterial color={color} opacity={lifetime} transparent={true}/>
      </mesh>
      <BallCollider sensor args={[5, 128, 128]} scale={0.2} 
      onIntersectionExit={(payload) => {
        const glassColor = payload.other.rigidBodyObject.children[0]?.material?.color;
        if(glassColor){
          handleIntersection(glassColor)
        }
    }} />
    </RigidBody>
  ) : null;
}