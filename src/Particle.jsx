import { useRef, useEffect, useState } from 'react';
import { RigidBody,BallCollider } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

function RandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function Particle({ initialPos, glassPositions }) {
  const ref = useRef();
  const meshRef = useRef();
  const [color, setColor] = useState("#ffffff");

  const [intersected, setIntersected] = useState(false);
  const [lifetime, setLifetime] = useState(0.8);
  const [lifetimeFinished, setLifetimeFinished] = useState(false)
  const [visible, setVisible] = useState(false);

  const currentPosition = new Vector3();
  const velocity = useRef(new Vector3());
  const acceleration = useRef(new Vector3());
  const maxSpeed = 4;
  const maxForce = 0.05;

  useEffect(() => {
    setIntersected(false)
    ref.current.setTranslation({ x: initialPos[0], y: initialPos[1], z: initialPos[2] });
    velocity.current.randomDirection();
    velocity.current.multiplyScalar(RandomInt(1, 10))
    acceleration.current.set(0, 0, 0)
  }, [initialPos]);

  const seek = (target) => {
    const force = new Vector3().subVectors(target, currentPosition)
    force.normalize().multiplyScalar(maxSpeed)
    const seekingForce = force.clone().sub(velocity.current)
    seekingForce.clampLength(0, maxForce)
    applyForce(seekingForce)
  };
  
  const applyForce = (force) => {
      const newAcceleration = new Vector3().copy(acceleration.current).add(force);
      acceleration.current.copy(newAcceleration);
  };

  const decreaseLifetime = () => {
    setLifetime((value) => Math.max(value - 0.005, 0))
  };

  useFrame((delta) => {
    if (ref.current && meshRef.current) {
      velocity.current.add(acceleration.current)
      velocity.current.clampLength(0, maxSpeed);
      ref.current.setLinvel({ x: velocity.current.x, y: velocity.current.y, z: velocity.current.z });
      currentPosition.copy(meshRef.current.parent.position);
      acceleration.current.set(0,0,0)
    }

    if(!intersected){
    if (glassPositions && Object.keys(glassPositions).length > 0) {
      const glassPositionsArray = Object.values(glassPositions);
      let nearestGlassPos = null;
      let nearestDistance = Number.MAX_VALUE;
    
      glassPositionsArray.forEach((glassPos) => {
        const glassVector = new Vector3(glassPos[0], glassPos[1], glassPos[2])
        const distance = currentPosition.distanceTo(glassVector);
    
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestGlassPos = glassVector;
        }
      });
      if (nearestGlassPos) {
        seek(nearestGlassPos);
      }
    }
  }
    // console.log(intersected)

  if(lifetime <= 0.006) {
    setLifetimeFinished(true)
    setIntersected(false)
  } else {
    if(intersected){
      decreaseLifetime()
    }
  }

    setTimeout(() => {
      decreaseLifetime()
    }, 10000)

  });

  const handleIntersection = (glassColor) => {
    setColor(glassColor);
    setIntersected(true)
  }

  return !lifetimeFinished ? (
    <RigidBody
      ref={ref}
      mass={1}
      type="dynamic"
      colliders={false}
      canSleep={false}
      // position={initialPos ? initialPos : [0, 20, 0]}
    >
      <mesh scale={0.1} 
      ref={meshRef}
      position={[0,0,0]}
      visible={visible}
      // visible={true}
      >
        <sphereGeometry args={[5, 5, 5]} />
        <meshPhongMaterial color={color} opacity={lifetime} transparent={true}/>
      </mesh>

      <BallCollider sensor args={[5, 5, 5]} scale={0.1} position={[0,0,0]}
      onIntersectionEnter={(payload) => {
        // if(payload.other.rigidBodyObject.name == "glassSensor"){
        //   setIntersected(true)
        // }
        //  else 
         if(payload.other.rigidBodyObject.name == "glass"){
          const glassColor = payload.other.rigidBodyObject.children[0]?.material?.color;
          if(glassColor){
            handleIntersection(glassColor)
          }
        }
      }} 
      onIntersectionExit={(payload) => {
        if(payload.other.rigidBodyObject.name == "glass"){
        setVisible(true)
        }
      }}
    />
    </RigidBody>
  ) : null;
}

