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
import Floorplan from '../../assets/glb/floor_plan.glb'
import Final2 from '../../assets/glb/final2.glb'
import * as THREE from 'three'

export default function Building({ count, focus, focusObj, isUp, setUp }) {
  const ref = useRef()
  const buildref = useRef()
  const [gravity, setGravity] = useState(1)
  const building = [
    { node: useGLTF(FinalCut1).nodes['cut1-7obj'].children[0].children },
    { node: useGLTF(FinalCut2).nodes['cut_8-15obj'].children[0].children },
    { node: useGLTF(FinalCut2).nodes['cut_8-15obj'].children[0].children },
    { node: useGLTF(FinalCut3).nodes['cut_10obj'].children[0].children },
    { node: useGLTF(FinalCut3).nodes['cut_10obj'].children[0].children },
    { node: useGLTF(FinalCut3).nodes['cut_10obj'].children[0].children },
    { node: useGLTF(FinalCut3).nodes['cut_10obj'].children[0].children },
    { node: useGLTF(FinalCut3).nodes['cut_10obj'].children[0].children },
    // { node: useGLTF(FinalCut4).nodes['cut_11-12obj'].children[0].children },
    // { node: useGLTF(FinalCut4).nodes['cut_11-12obj'].children[0].children },
    // { node: useGLTF(FinalCut5).nodes['cut_13obj'].children[0].children },
    // {
    //   node: useGLTF(FinalCut6).nodes['cut14-15obj'].children[0].children,
    // },
    { node: useGLTF(FinalCut7).nodes['cut_rooftopobj'].children[0].children },
    // { node: useGLTF(Final2).nodes['demo_demo01obj'].children[0].children },
  ]

  const floorplan =
    useGLTF(Floorplan).nodes['floor%20planobj'].children[0].children
  const building2 = [
    //   { node: useGLTF(FinalCut1) },
    //   { node: useGLTF(FinalCut2) },
    //   { node: useGLTF(FinalCut3) },
    { node: useGLTF(FinalCut4) },
    //   { node: useGLTF(FinalCut5) },
    // { node: useGLTF(FinalCut6) },
    // { node: useGLTF(FinalCut7) },
  ]
  // console.log(floorplan)

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
        {/* <CuboidCollider args={[0.01, 7, 1.4]} position={[2.211, -3, 0.5]} />
        <CuboidCollider args={[0.01, 7, 1.4]} position={[-2.311, -3, 0.5]} />
        <CuboidCollider args={[2.2, 7, 0.01]} position={[0.0, -3, 1.911]} />
        <CuboidCollider args={[2.2, 7, 0.01]} position={[0.0, -3, -0.911]} /> */}
      </RigidBody>,
    ]
    for (var j = 0; j < count - 7; j++) {
      building[j].node.map((item, i) => {
        item.castShadow = true
      })
      if (j === 0) {
        item.push(
          <RigidBody
            type='fixed'
            key={j}
            gravityScale={1}
            position-y={-5.065 + j}
          >
            <group key={j}>
              {building[j].node.map((item, i) => (
                <mesh
                  key={i}
                  castShadow
                  ref={addToRefs}
                  scale={1}
                  geometry={item.geometry}
                  material={item.material}
                ></mesh>
              ))}
            </group>
          </RigidBody>
        )
      } else {
        item.push(
          <RigidBody
            type='fixed'
            key={j}
            gravityScale={1}
            position-y={-2.58 + j / 3.4}
          >
            <group key={j}>
              {building[j].node.map((item, i) => (
                <mesh
                  key={i}
                  castShadow
                  ref={addToRefs}
                  scale={1}
                  geometry={item.geometry}
                  material={item.material}
                ></mesh>
              ))}
            </group>
          </RigidBody>
        )
      }
    }
    // item.push(
    //   <RigidBody
    //     type='fixed'
    //     key={j + 2}
    //     gravityScale={1}
    //     position={[0,-2.58 + j / 3.4]}
    //     rotation={[0, Math.PI, 0]}
    //   >
    //     <group key={j + 2}>
    //       {floorplan.map((item, i) => (
    //         <mesh
    //           key={i}
    //           castShadow
    //           ref={addToRefs}
    //           scale={0.23}
    //           geometry={item.geometry}
    //           material={item.material}
    //         ></mesh>
    //       ))}
    //     </group>
    //   </RigidBody>
    // )
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

  function floor() {
    let item = []
    floorplan.map((item, i) => {
      item.castShadow = true
    })
    item.push(
      <group
        key={2}
        rotation={[0, Math.PI, 0]}
        position={[0.075, -2.58 + (count - 7) / 3.4, 0.225]}
      >
        {floorplan.map((item, i) => (
          <mesh
            key={i}
            castShadow
            ref={addToRefs}
            scale={0.23}
            geometry={item.geometry}
            material={item.material}
          ></mesh>
        ))}
      </group>
    )

    return <>{item}</>
  }

  var acc = 0
  useFrame((state) => {
    acc = acc + Math.pow(0.2, 2)

    if (gravity > 0) setGravity(gravity - acc)
    if (count <= 15) {
      if (count - 7 > 1) {
        state.scene.children[2].children[0].children[0].children[2].children[
          state.scene.children[2].children[0].children[0].children[2].children
            .length - 3
        ].position.y = -2.58 + (count - 8) / 3.4 + gravity
        state.scene.children[2].children[0].children[0].children[2].children[
          state.scene.children[2].children[0].children[0].children[2].children
            .length - 3
        ].children[0].children.forEach((box) => {
          box.material.transparent = true
          console.log(box.material)
          if (box.material.opacity < 1) {
            box.material.opacity += box.material.opacity + Math.pow(0.25, 2)
          } else {
            box.material.transparent = false
          }
        })
        state.scene.children[2].children[0].children[0].children[2].children[
          state.scene.children[2].children[0].children[0].children[2].children
            .length - 2
        ].position.y = -2.58 + (count - 7) / 3.4 + gravity * 1.5
        state.scene.children[2].children[0].children[0].children[2].children[
          state.scene.children[2].children[0].children[0].children[2].children
            .length - 2
        ].children[0].children.forEach((box) => {
          box.material.transparent = true
          if (box.material.opacity < 1) {
            box.material.opacity += 0.1
          } else {
            box.material.transparent = false
          }
        })
      } else {
        state.scene.children[2].children[0].children[0].children[2].children[
          state.scene.children[2].children[0].children[0].children[2].children
            .length - 2
        ].position.y = -2.58 + (count - 7) / 3.4 + gravity * 1.5
        state.scene.children[2].children[0].children[0].children[2].children[
          state.scene.children[2].children[0].children[0].children[2].children
            .length - 2
        ].children[0].children.forEach((box) => {
          box.material.transparent = true
          if (box.material.opacity < 1) {
            box.material.opacity += 0.1
          } else {
            box.material.transparent = false
          }
        })
      }
    }
    // if (focus) {
    //   ref.current.position.set(0, -(32 / 10) - 0.6, 4)
    // state.camera.lookAt(ref.current.position)
    // }
    // buildref.current.uniforms.uHeight.value = count
  })

  useEffect(() => {
    // console.log(ref.current)
    // focusObj(ref.current.position)
    acc = 0
    setGravity(1)
  }, [count])

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
            {floor()}
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
