import { RigidBody } from '@react-three/rapier'

export default function Glass({position, color}){
  return(
    <RigidBody mass={1} type="fixed" colliders="cuboid" position={position ? position:[10, 10, 0]}> 
      <mesh>
        <boxGeometry args={[0.5, 8, 8]} />
        <meshBasicMaterial color={color} opacity={0.5} transparent={true}/>
      </mesh>
    </RigidBody>
  )
}