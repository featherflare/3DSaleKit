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

    switch (count) {
      case 8:
        item.push(
          <RigidBody type='fixed' key='0' gravityScale={1} position-y={0}>
            <mesh
              receiveShadow
              ref={addToRefs}
              scale={1}
              geometry={nodes.Mesh005.geometry}
              material={nodes.Mesh005.material}
            ></mesh>
          </RigidBody>
        )
        break
      case 9:
        item.push(
          <>
            <RigidBody type='fixed' key='0' gravityScale={1} position-y={0}>
              <mesh
                receiveShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005.geometry}
                material={nodes.Mesh005.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='1'
              gravityScale={1}
              friction={0.7}
              position-y={2.71}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_1.geometry}
                material={nodes.Mesh005_1.material}
              ></mesh>
            </RigidBody>
          </>
        )
        break
      case 10:
        item.push(
          <>
            <RigidBody type='fixed' key='0' gravityScale={1} position-y={0}>
              <mesh
                receiveShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005.geometry}
                material={nodes.Mesh005.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='1'
              gravityScale={1}
              friction={0.7}
              position-y={2.71}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_1.geometry}
                material={nodes.Mesh005_1.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='2'
              gravityScale={1}
              friction={0.7}
              position-y={3.36}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_2.geometry}
                material={nodes.Mesh005_2.material}
              ></mesh>
            </RigidBody>
          </>
        )
        break
      case 11:
        item.push(
          <>
            <RigidBody type='fixed' key='0' gravityScale={1} position-y={0}>
              <mesh
                receiveShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005.geometry}
                material={nodes.Mesh005.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='1'
              gravityScale={1}
              friction={0.7}
              position-y={2.71}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_1.geometry}
                material={nodes.Mesh005_1.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='2'
              gravityScale={1}
              friction={0.7}
              position-y={3.36}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_2.geometry}
                material={nodes.Mesh005_2.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='3'
              gravityScale={1}
              friction={0.7}
              position-y={3.81}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_2.geometry}
                material={nodes.Mesh005_2.material}
              ></mesh>
            </RigidBody>
          </>
        )
        break
      case 12:
        item.push(
          <>
            <RigidBody type='fixed' key='0' gravityScale={1} position-y={0}>
              <mesh
                receiveShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005.geometry}
                material={nodes.Mesh005.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='1'
              gravityScale={1}
              friction={0.7}
              position-y={2.71}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_1.geometry}
                material={nodes.Mesh005_1.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='2'
              gravityScale={1}
              friction={0.7}
              position-y={3.36}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_2.geometry}
                material={nodes.Mesh005_2.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='3'
              gravityScale={1}
              friction={0.7}
              position-y={3.81}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_2.geometry}
                material={nodes.Mesh005_2.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='4'
              gravityScale={1}
              friction={0.7}
              position-y={4.26}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_2.geometry}
                material={nodes.Mesh005_2.material}
              ></mesh>
            </RigidBody>
          </>
        )
        break
      case 13:
        item.push(
          <>
            <RigidBody type='fixed' key='0' gravityScale={1} position-y={0}>
              <mesh
                receiveShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005.geometry}
                material={nodes.Mesh005.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='1'
              gravityScale={1}
              friction={0.7}
              position-y={2.71}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_1.geometry}
                material={nodes.Mesh005_1.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='2'
              gravityScale={1}
              friction={0.7}
              position-y={3.36}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_2.geometry}
                material={nodes.Mesh005_2.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='3'
              gravityScale={1}
              friction={0.7}
              position-y={3.81}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_2.geometry}
                material={nodes.Mesh005_2.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='4'
              gravityScale={1}
              friction={0.7}
              position-y={4.26}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_2.geometry}
                material={nodes.Mesh005_2.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='5'
              gravityScale={1}
              friction={0.7}
              position-y={4.71}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_2.geometry}
                material={nodes.Mesh005_2.material}
              ></mesh>
            </RigidBody>
          </>
        )
        break
      case 14:
        item.push(
          <>
            <RigidBody type='fixed' key='0' gravityScale={1} position-y={0}>
              <mesh
                receiveShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005.geometry}
                material={nodes.Mesh005.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='1'
              gravityScale={1}
              friction={0.7}
              position-y={2.71}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_1.geometry}
                material={nodes.Mesh005_1.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='2'
              gravityScale={1}
              friction={0.7}
              position-y={3.36}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_2.geometry}
                material={nodes.Mesh005_2.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='3'
              gravityScale={1}
              friction={0.7}
              position-y={3.81}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_2.geometry}
                material={nodes.Mesh005_2.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='4'
              gravityScale={1}
              friction={0.7}
              position-y={4.26}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_2.geometry}
                material={nodes.Mesh005_2.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='5'
              gravityScale={1}
              friction={0.7}
              position-y={4.71}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_2.geometry}
                material={nodes.Mesh005_2.material}
              ></mesh>
            </RigidBody>
            <RigidBody
              key='6'
              gravityScale={1}
              friction={0.7}
              position-y={5.16}
              // colliders='hull'
              type='fixed'
              // type='dynamic'
            >
              <mesh
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={nodes.Mesh005_2.geometry}
                material={nodes.Mesh005_2.material}
              ></mesh>
            </RigidBody>
          </>
        )
        break
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
        <Physics gravity={[0, -2.8, 0]} debug>
          {box()}
          <RigidBody type='fixed'>
            <CuboidCollider
              args={[0.01, 7, 4.1]}
              position={[2.411, 5, -4.05]}
            />
            <CuboidCollider
              args={[0.01, 7, 4.1]}
              position={[-2.211, 5, -4.05]}
            />
            <CuboidCollider args={[2.6, 7, 0.01]} position={[0, 5, 0.111]} />
            <CuboidCollider args={[2.6, 7, 0.01]} position={[0, 5, -8.211]} />
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
