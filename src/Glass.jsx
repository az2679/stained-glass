import { RigidBody } from '@react-three/rapier'
import { useEffect } from 'react'

export default function Glass({index, position, color, sendPosition, geometry, rotation}){
  useEffect(() => {
    sendPosition(index, position)
  }, [])

  return(
    <>
    <RigidBody
        name="glass"
        index={index}
        mass={1}
        type="fixed"
        colliders='hull'
        position={position ? position : [10, 10, 0]}
        rotation={rotation ? rotation : [-Math.PI/4, 0, -Math.PI/2]}
      >
    <mesh>
        {geometry === 'box' ? (
          <boxGeometry args={[0.2, 1, 1]} />
        ) : geometry === 'cylinder' ? (
          <cylinderGeometry args={[1, 1, 1, 8, 1]} />
        ) : geometry === 'triangle' ? (
          <cylinderGeometry args={[1, 1, 1, 3, 1]} />
        ) : geometry === 'cone' ? (
          <cylinderGeometry args={[1, 0, 3, 3, 1]} />
        ) : (
          <boxGeometry args={[1, 0.2, 1]} />
        )}
        <meshBasicMaterial color={color} opacity={0.5} transparent />
      </mesh>
      </RigidBody>





    {/* <RigidBody name="glassSensor" mass={1} type="fixed">
      <mesh />
      <CuboidCollider args={[0.2, 2, 2]} scale={0.5} position={[position[0]+2, position[1], position[2]]} />
    </RigidBody> */}

    {/* <RigidBody name="frame" mass={1} type="fixed" colliders="cuboid" position={position ? position : [10, 10, 0]}> */}
        {/*top*/}
        {/* <mesh position={[0, 2, 0]}>
          <boxGeometry args={[0.2, 0.05, 4.05]} />
          <meshBasicMaterial color={"#636363"} />
        </mesh> */}

        {/*bottom*/}
        {/* <mesh position={[0, -2, 0]}>
          <boxGeometry args={[0.2, 0.05, 4.05]} />
          <meshBasicMaterial color={"#636363"} />
        </mesh> */}

        {/*left*/}
        {/* <mesh position={[0, 0, -2]}>
          <boxGeometry args={[0.2, 4, 0.05]} />
          <meshBasicMaterial color={"#636363"} />
        </mesh> */}

        {/*right*/}
        {/* <mesh position={[0, 0, ]}>
          <boxGeometry args={[0.2, 4, 0.05]} />
          <meshBasicMaterial color={"#636363"} />
        </mesh> */}
      {/* </RigidBody> */}
    </>
  )
}