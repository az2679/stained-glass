import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useEffect } from 'react'

export default function Glass({index, position, color, sendPosition}){
  useEffect(() => {
    sendPosition(index, position)
  }, [])

  return(
    <>
    <RigidBody name="glass" index={index} mass={1} type="fixed" colliders="cuboid" position={position ? position:[10, 10, 0]}> 
      <mesh>
        <boxGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial color={color} opacity={0.5} transparent={true}/>
      </mesh>
    </RigidBody>

    <RigidBody name="glassSensor">
      <mesh />
      <CuboidCollider args={[0.2, 8, 8]} scale={0.5} position={[position[0]+2, position[1], position[2]]} />
    </RigidBody>

    <RigidBody name="frame" mass={1} type="fixed" colliders="cuboid" position={position ? position : [10, 10, 0]}>
        {/*top*/}
        <mesh position={[0, 4, 0]}>
          <boxGeometry args={[0.2, 0.05, 8.05]} />
          <meshBasicMaterial color={"#636363"} />
        </mesh>

        {/*bottom*/}
        <mesh position={[0, -4, 0]}>
          <boxGeometry args={[0.2, 0.05, 8.05]} />
          <meshBasicMaterial color={"#636363"} />
        </mesh>

        {/*left*/}
        <mesh position={[0, 0, -4]}>
          <boxGeometry args={[0.2, 8, 0.05]} />
          <meshBasicMaterial color={"#636363"} />
        </mesh>

        {/*right*/}
        <mesh position={[0, 0, 4]}>
          <boxGeometry args={[0.2, 8, 0.05]} />
          <meshBasicMaterial color={"#636363"} />
        </mesh>
      </RigidBody>
    </>
  )
}