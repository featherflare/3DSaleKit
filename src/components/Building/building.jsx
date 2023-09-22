import { Center, OrbitControls, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import {
  CuboidCollider,
  InstancedRigidBodies,
  Physics,
  RigidBody,
  vec3,
} from '@react-three/rapier'
import { useEffect, useMemo, useRef, useState } from 'react'
import fragmentShader from './fragment.glsl'
import vertexShader from './vertex.glsl'
import { PerspectiveCamera } from 'three'
import Build3D from '../../assets/glb/demo.glb'
import FinalCut1 from '../../assets/glb/final_cut1-7.glb'
import FinalCut2 from '../../assets/glb/final_8-9.glb'
import FinalCut3 from '../../assets/glb/final_10.glb'
import FinalCut4 from '../../assets/glb/final_11-12.glb'
import FinalCut5 from '../../assets/glb/final_13.glb'
import FinalCut6 from '../../assets/glb/final_14-15.glb'
import FinalCut7 from '../../assets/glb/final_16-rooftop.glb'
import Final1 from '../../assets/glb/final1.glb'
import Final2 from '../../assets/glb/final2.glb'
import * as THREE from 'three'

export default function Building({ count, focus, focusObj }) {
  const ref = useRef()
  const buildref = useRef()
  const building = [
    // { node: useGLTF(FinalCut1).nodes['cut1-7obj'].children[0].children },
    // { node: useGLTF(FinalCut2).nodes['cut8obj'].children[0].children },
    // { node: useGLTF(FinalCut3).nodes['cut9obj'].children[0].children },
    // { node: useGLTF(Final1).nodes['demo_demo01obj'].children[0].children },
    { node: useGLTF(Final2).nodes['demo_demo01obj'].children[0].children },
  ]
  const building2 = [{ node: useGLTF(Final1) }, { node: useGLTF(Final2) }]
  console.log(building2)

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
    let item = [
      <RigidBody key='border' type='fixed'>
        <CuboidCollider args={[0.01, 7, 1.4]} position={[2.411, 2, 0.5]} />
        <CuboidCollider args={[0.01, 7, 1.4]} position={[-2.211, 2, 0.5]} />
        <CuboidCollider args={[2.3, 7, 0.01]} position={[0.1, 2, 1.911]} />
        <CuboidCollider args={[2.3, 7, 0.01]} position={[0.1, 2, -0.911]} />
      </RigidBody>,
    ]
    building.forEach((b, j) => {
      b.node.map((item) => {
        item.castShadow = true
      })
      item.push(
        <group key={j} castShadow>
          {b.node.map((item, i) => (
            <RigidBody
              type='fixed'
              key={i}
              gravityScale={1}
              position-y={-5 + j}
            >
              <mesh
                receiveShadow
                castShadow
                ref={addToRefs}
                scale={1}
                geometry={item.geometry}
                material={item.material}
              ></mesh>
            </RigidBody>
          ))}
        </group>
      )
      console.log(b)
    })
    // item.push(
    //   <group key='build'>
    //     {b.map((item, i) => (
    //       <RigidBody type='fixed' key={i} gravityScale={1} position-y={-5}>
    //         <mesh
    //           receiveShadow
    //           ref={addToRefs}
    //           scale={1}
    //           geometry={item.geometry}
    //           material={item.material}
    //         ></mesh>
    //       </RigidBody>
    //     ))}
    //   </group>
    // )
    // switch (count) {
    //   case 8:
    //     item.push(
    //       <RigidBody type='fixed' key='0' gravityScale={1} position-y={0}>
    //         <mesh
    //           receiveShadow
    //           ref={addToRefs}
    //           scale={1}
    //           geometry={nodes.Mesh005.geometry}
    //           material={nodes.Mesh005.material}
    //         ></mesh>
    //       </RigidBody>
    //     )
    //     break
    //   case 9:
    //     item.push(
    //       <>
    //         <RigidBody type='fixed' key='1' gravityScale={1} position-y={0}>
    //           <mesh
    //             receiveShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005.geometry}
    //             material={nodes.Mesh005.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='2'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={2.71}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_1.geometry}
    //             material={nodes.Mesh005_1.material}
    //           ></mesh>
    //         </RigidBody>
    //       </>
    //     )
    //     break
    //   case 10:
    //     item.push(
    //       <>
    //         <RigidBody type='fixed' key='3' gravityScale={1} position-y={0}>
    //           <mesh
    //             receiveShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005.geometry}
    //             material={nodes.Mesh005.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='4'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={2.71}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_1.geometry}
    //             material={nodes.Mesh005_1.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='5'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={3.36}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_2.geometry}
    //             material={nodes.Mesh005_2.material}
    //           ></mesh>
    //         </RigidBody>
    //       </>
    //     )
    //     break
    //   case 11:
    //     item.push(
    //       <>
    //         <RigidBody type='fixed' key='6' gravityScale={1} position-y={0}>
    //           <mesh
    //             receiveShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005.geometry}
    //             material={nodes.Mesh005.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='1'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={2.71}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_1.geometry}
    //             material={nodes.Mesh005_1.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='7'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={3.36}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_2.geometry}
    //             material={nodes.Mesh005_2.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='8'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={3.81}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_2.geometry}
    //             material={nodes.Mesh005_2.material}
    //           ></mesh>
    //         </RigidBody>
    //       </>
    //     )
    //     break
    //   case 12:
    //     item.push(
    //       <>
    //         <RigidBody type='fixed' key='9' gravityScale={1} position-y={0}>
    //           <mesh
    //             receiveShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005.geometry}
    //             material={nodes.Mesh005.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='10'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={2.71}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_1.geometry}
    //             material={nodes.Mesh005_1.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='11'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={3.36}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_2.geometry}
    //             material={nodes.Mesh005_2.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='12'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={3.81}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_2.geometry}
    //             material={nodes.Mesh005_2.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='13'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={4.26}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_2.geometry}
    //             material={nodes.Mesh005_2.material}
    //           ></mesh>
    //         </RigidBody>
    //       </>
    //     )
    //     break
    //   case 13:
    //     item.push(
    //       <>
    //         <RigidBody type='fixed' key='14' gravityScale={1} position-y={0}>
    //           <mesh
    //             receiveShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005.geometry}
    //             material={nodes.Mesh005.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='15'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={2.71}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_1.geometry}
    //             material={nodes.Mesh005_1.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='16'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={3.36}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_2.geometry}
    //             material={nodes.Mesh005_2.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='17'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={3.81}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_2.geometry}
    //             material={nodes.Mesh005_2.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='18'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={4.26}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_2.geometry}
    //             material={nodes.Mesh005_2.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='19'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={4.71}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_2.geometry}
    //             material={nodes.Mesh005_2.material}
    //           ></mesh>
    //         </RigidBody>
    //       </>
    //     )
    //     break
    //   case 14:
    //     item.push(
    //       <>
    //         <RigidBody type='fixed' key='20' gravityScale={1} position-y={0}>
    //           <mesh
    //             receiveShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005.geometry}
    //             material={nodes.Mesh005.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='21'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={2.71}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_1.geometry}
    //             material={nodes.Mesh005_1.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='22'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={3.36}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_2.geometry}
    //             material={nodes.Mesh005_2.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='23'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={3.81}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_2.geometry}
    //             material={nodes.Mesh005_2.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='24'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={4.26}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_2.geometry}
    //             material={nodes.Mesh005_2.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='25'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={4.71}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_2.geometry}
    //             material={nodes.Mesh005_2.material}
    //           ></mesh>
    //         </RigidBody>
    //         <RigidBody
    //           key='26'
    //           gravityScale={1}
    //           friction={0.7}
    //           position-y={5.16}
    //           // colliders='hull'
    //           type='fixed'
    //           // type='dynamic'
    //         >
    //           <mesh
    //             castShadow
    //             ref={addToRefs}
    //             scale={1}
    //             geometry={nodes.Mesh005_2.geometry}
    //             material={nodes.Mesh005_2.material}
    //           ></mesh>
    //         </RigidBody>
    //       </>
    //     )
    //     break
    // }

    return <>{item}</>
  }

  useFrame((state) => {
    if (focus) {
      // console.log(state)
      ref.current.position.set(0, -(32 / 10) - 0.6, 4)
      // state.camera.lookAt(ref.current.position)
    }
    // buildref.current.uniforms.uHeight.value = count
  })

  useEffect(() => {
    // console.log(buildref.current)
    focusObj(ref.current.position)
  }, [])

  return (
    <>
      <Center>
        <directionalLight
          position={[-2, 4, -2.5]}
          intensity={10.5}
          castShadow
        />
        <ambientLight intensity={0.5} />

        <group ref={ref} position={[0, 0, 0]}>
          <Physics
            gravity={[0, -2.8, 0]}
            //  debug
          >
            {box()}
            {/* <RigidBody type='fixed'>
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
          </RigidBody> */}
            {/* <RigidBody type='fixed'>
            <mesh>
              <boxGeometry args={[1, 10, 1]} />
              <shaderMaterial ref={buildref} attach='material' {...data} />
            </mesh>
          </RigidBody> */}
            <RigidBody type='fixed'>
              <mesh
                rotation-x={-Math.PI * 0.5}
                position-y={-5.1}
                scale={1000}
                receiveShadow
              >
                <planeGeometry />
                <meshStandardMaterial color='white' />
              </mesh>
            </RigidBody>
          </Physics>
        </group>
      </Center>
    </>
  )
}
