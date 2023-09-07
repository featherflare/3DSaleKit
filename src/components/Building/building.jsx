import { OrbitControls, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import {
  CuboidCollider,
  InstancedRigidBodies,
  Physics,
  RigidBody,
} from '@react-three/rapier'
import { useEffect, useMemo, useRef, useState } from 'react'
import fragmentShader from './fragment.glsl'
import vertexShader from './vertex.glsl'
import { PerspectiveCamera } from 'three'
import Build3D from '../../assets/glb/demo.glb'

export default function Building({ count }) {
  const ref = useRef()
  const buildref = useRef()
  const { nodes } = useGLTF(Build3D)
  console.log(nodes)

  // const data = useMemo(
  //   () => ({
  //     uniforms: { uHeight: { type: 'f', value: 0.0 } },
  //     transparent: true,
  //     fragmentShader,
  //     vertexShader,
  //   }),
  //   []
  // )
  const pointsRefs = useRef([])
  pointsRefs.current = []

  const addToRefs = (el) => {
    if (el && !pointsRefs.current.includes(el)) {
      pointsRefs.current.push(el)
    }
  }

  function box() {
    let item = []

    for (let i = 0; i < count; i++) {
      if (i === 0) {
        item.push(
          <RigidBody type='fixed' key={i} gravityScale={1} position-y={0}>
            <mesh receiveShadow ref={addToRefs} scale={1}>
              <boxGeometry args={[1, 0.2, 1]} />
              <meshStandardMaterial color={'tomato'} />
            </mesh>
          </RigidBody>
        )
      } else {
        item.push(
          <RigidBody
            key={i}
            gravityScale={1}
            friction={0.7}
            position-y={(i + 1) / 5}
            colliders='hull'
            type='dynamic'
          >
            <mesh castShadow ref={addToRefs} scale={1}>
              <boxGeometry args={[1, 0.2, 1]} />
              <meshStandardMaterial color={`hsl(${i * 10}, ${i * 10}%, 30%)`} />
            </mesh>
          </RigidBody>
        )
      }
    }

    return <>{item}</>
  }

  useFrame(() => {
    // buildref.current.uniforms.uHeight.value = count
  })

  useEffect(() => {
    // console.log(buildref.current)
  }, [count])

  function Controls() {
    const {
      camera,
      gl: { domElement },
    } = useThree()

    return <OrbitControls args={[camera, domElement]} />
  }
  return (
    <>
      {/* <OrbitControls /> */}
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Controls />
      <group ref={ref} position={[0, -(32 / 10) - 0.6, 0]}>
        <Physics
          gravity={[0, -2.8, 0]}
          // debug
        >
          {box()}
          <RigidBody type='fixed'>
            <CuboidCollider args={[0.01, 7, 0.5]} position={[0.511, 5, 0]} />
            <CuboidCollider args={[0.01, 7, 0.5]} position={[-0.511, 5, 0]} />
            <CuboidCollider args={[0.5, 7, 0.01]} position={[0, 5, 0.511]} />
            <CuboidCollider args={[0.5, 7, 0.01]} position={[0, 5, -0.511]} />
          </RigidBody>
          {/* <RigidBody type='fixed'>
            <mesh>
              <boxGeometry args={[1, 10, 1]} />
              <shaderMaterial ref={buildref} attach='material' {...data} />
            </mesh>
          </RigidBody> */}
        </Physics>
      </group>
    </>
  )
}
