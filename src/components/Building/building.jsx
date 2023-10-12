import {
  AccumulativeShadows,
  BakeShadows,
  Center,
  ContactShadows,
  Html,
  OrbitControls,
  RandomizedLight,
  Sky,
  SoftShadows,
  Stage,
  shaderMaterial,
  useGLTF,
} from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import React, { useEffect, useMemo, useRef, useState } from 'react'
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
import Floorplan2 from '../../assets/glb/fix_floor2.glb'
import Final2 from '../../assets/glb/final2.glb'
import * as THREE from 'three'
import {
  EffectComposer,
  Outline,
  Select,
  Selection,
} from '@react-three/postprocessing'

export default function Building({
  count,
  focus,
  setfocus,
  focusObj,
  setcount,
  route,
  click,
  room,
  setroute,
  setroom,
  floorselect,
}) {
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

  const floorplan2 =
    useGLTF(Floorplan).nodes['floor%20planobj'].children[0].children
  const floorplan = useGLTF(Floorplan2).nodes['Scene'].children[0].children
  const building2 = [
    //   { node: useGLTF(FinalCut1) },
    //   { node: useGLTF(FinalCut2) },
    //   { node: useGLTF(FinalCut3) },
    { node: useGLTF(FinalCut4) },
    //   { node: useGLTF(FinalCut5) },
    // { node: useGLTF(FinalCut6) },
    // { node: useGLTF(FinalCut7) },
  ]
  // console.log(floorplan, floorplan2)

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

  const roomType = [
    { type: 0, name: 'A26', size: '23 sq.m.' },
    { type: 2, name: 'C08', size: '35 sq.m.' },
    { type: 1, name: 'B20', size: '29 sq.m.' },
    { type: 1, name: 'B29', size: '29 sq.m.' },
    { type: 1, name: 'B18', size: '29 sq.m.' },
    { type: 1, name: 'B25', size: '26 sq.m.' },
    { type: 1, name: 'B05', size: '27 sq.m.' },
    { type: 1, name: 'B15', size: '29 sq.m.' },
    { type: 1, name: 'B06', size: '27 sq.m.' },
    { type: 1, name: 'B30', size: '29 sq.m.' },
    { type: 1, name: 'B02', size: '27 sq.m.' },
    { type: 0, name: 'A31', size: '23 sq.m.' },
    { type: 1, name: 'B03', size: '27 sq.m.' },
    { type: 1, name: 'B13', size: '26 sq.m.' },
    { type: 1, name: 'B12', size: '27 sq.m.' },
    { type: 1, name: 'B19', size: '29 sq.m.' },
    { type: 1, name: 'B23', size: '26 sq.m.' },
    { type: 2, name: 'C21', size: '35 sq.m.' },
    { type: 2, name: 'C28', size: '35 sq.m.' },
    { type: 1, name: 'B11', size: '26 sq.m.' },
    { type: 0, name: 'A01', size: '23 sq.m.' },
    { type: 1, name: 'B04', size: '26 sq.m.' },
    { type: 2, name: 'C27', size: '35 sq.m.' },
    { type: 1, name: 'B24', size: '29 sq.m.' },
    { type: 4, name: 'E10', size: '50 sq.m.' },
    { type: 1, name: 'B17', size: '29 sq.m.' },
    { type: 4, name: 'E09', size: '50 sq.m.' },
    { type: 1, name: 'B07', size: '27 sq.m.' },
    { type: 1, name: 'B14', size: '26 sq.m.' },
    { type: 3, name: 'D22', size: '42.5 sq.m.' },
    { type: 1, name: 'B16', size: '29 sq.m.' },
  ]

  function box() {
    let item = [
      <RigidBody key='border' type='fixed'>
        {/* <CuboidCollider args={[0.01, 7, 1.4]} position={[2.211, -3, 0.5]} />
        <CuboidCollider args={[0.01, 7, 1.4]} position={[-2.311, -3, 0.5]} />
        <CuboidCollider args={[2.2, 7, 0.01]} position={[0.0, -3, 1.911]} />
        <CuboidCollider args={[2.2, 7, 0.01]} position={[0.0, -3, -0.911]} /> */}
      </RigidBody>,
    ]
    for (var j = 0; j < (focus ? count - 7 : floorselect - 7); j++) {
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
                  receiveShadow
                  ref={addToRefs}
                  scale={1}
                  geometry={item.geometry}
                  material={item.material}
                ></mesh>
              ))}
            </group>
          </RigidBody>
        )
      } else if (j === 8) {
        item.push(
          <RigidBody
            type='fixed'
            key={j}
            gravityScale={1}
            position-y={-2.5 + j / 3.4}
          >
            <group key={j}>
              {building[j].node.map((item, i) => (
                <mesh
                  key={i}
                  receiveShadow
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
                  receiveShadow
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

  // function highlight() {
  //   let item = []
  //   floorplan.map((item, i) => {
  //     item.children[0].castShadow = true
  //     // console.log(item)
  //   })

  //   for (var j = 0; j < count - 7; j++) {
  //     if (j === 0) {
  //     } else if (j === 8) {
  //     } else {
  //       item.push(<OutlineItem j={j} />)
  //     }
  //   }

  //   return <>{item}</>
  // }

  // function OutlineItem({ j }) {
  //   const ref = useRef()
  //   const [hovered, hover] = useState(null)
  //   return (
  //     <Select enabled={hovered}>
  //       <RigidBody
  //         type='fixed'
  //         key={j}
  //         gravityScale={1}
  //         position={[-0.075, -2.53 + j / 3.4, 0]}
  //       >
  //         <group key={j}>
  //           {building[j].node.map((item, i) => (
  //             <mesh
  //               key={i}
  //               ref={ref}
  //               castShadow
  //               scale={new THREE.Vector3(1.05, 1, 1.1)}
  //               geometry={item.geometry}
  //               onPointerOver={() => hover(true)}
  //               onPointerOut={() => hover(false)}
  //               onClick={() => setcount(j)}
  //             >
  //               <shaderMaterial
  //                 transparent
  //                 vertexShader={vertexShader}
  //                 fragmentShader={fragmentShader}
  //               />
  //             </mesh>
  //           ))}
  //         </group>
  //       </RigidBody>
  //     </Select>
  //   )
  // }

  function highlight() {
    let item = []
    floorplan.map((item, i) => {
      item.children[0].castShadow = true
      // console.log(item)
    })

    for (var j = 0; j < 9; j++) {
      if (j === 0) {
      } else if (j === 9) {
      } else {
        item.push(
          <group
            key={j}
            rotation={[0, Math.PI, 0]}
            position={[-0.275, -2.53 + j / 3.6, 0.35]}
          >
            {floorplan.map((item, i) => (
              <OutlineItem i={i} j={j} key={i} item={item} />
            ))}
          </group>
        )
      }
    }

    return <>{item}</>
  }

  function OutlineItem({ i, j, item }) {
    const ref = useRef()
    const [hovered, hover] = useState(null)
    return (
      <Select enabled={hovered}>
        <mesh
          castShadow
          ref={ref}
          scale={new THREE.Vector3(0.28, 0.23, 0.28)}
          geometry={item.children[0].geometry}
          onPointerOver={() => {
            if (route === 'floor') {
              if (count - 7 === j) hover(true)
            } else {
              hover(true)
            }
          }}
          onPointerOut={() => hover(false)}
          onClick={() => {
            setcount(j)
            setfocus(true)
            click()
            if (route == 'route') setroom(roomType[i].type)
          }}
        >
          <meshStandardMaterial
            transparent
            color={hovered ? 'lightblue' : 'yellow'}
            opacity={
              route === 'floor'
                ? count - 7 === j
                  ? 0.2
                  : 0
                : roomType[i].type === room
                ? 0.2
                : 0
            }
          />
          {/* <shaderMaterial
            transparent
            uniforms={{
              color: { value: new THREE.Color('white') },
              size: { value: new THREE.Vector3(1, 1, 1) },
              thickness: { value: 0.01 },
              smoothness: { value: 0.2 },
            }}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
          /> */}
        </mesh>
      </Select>
    )
  }

  function floor() {
    let item = []
    const [hovered, hover] = useState(null)
    floorplan.map((item, i) => {
      item.children[0].castShadow = true
      item.children[0].position.y = -2.0 + (floorselect - 7) / 3.4
      // console.log(item)
    })
    if (floorselect <= 15)
      item.push(
        <group key={2} rotation={[0, Math.PI, 0]}>
          {floorplan.map((item, i) => (
            <>
              <mesh
                key={i}
                castShadow
                ref={addToRefs}
                scale={new THREE.Vector3(0.24, 0.23, 0.23)}
                position={[-0, -2.0 + (floorselect - 7) / 3.4, -0.225]}
                geometry={item.children[0].geometry}
                onPointerOver={() => {
                  console.log(i, item.children[0])
                  hover(i)
                }}
                onPointerOut={() => hover(null)}
                onClick={() => {
                  setroute('room')
                  setroom(roomType[i].type)
                  click()
                }}
              >
                <meshStandardMaterial
                  color={
                    hovered === i
                      ? 'lightblue'
                      : route === 'floor'
                      ? '#f8eebb'
                      : roomType[i].type === room
                      ? '#a3f0a7'
                      : '#f8eebb'
                  }
                />
                {/* <Html
                  distanceFactor={10}
                  position={item.children[0].geometry.boundingSphere.center}
                  style={{
                    background: '#00000055',
                    padding: '10px',
                    marginLeft: '-30px',
                    marginTop: '10px',
                    borderRadius: '4px',
                    opacity: `${hovered === i ? 1 : 0}`,
                    color: '#fff',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                  }}
                >
                  <div>{'Floor' + count + '-' + roomType[i].name}</div>
                  <div>{roomType[i].size}</div>
                </Html> */}
              </mesh>
            </>
          ))}
        </group>
      )

    return <>{item}</>
  }

  var acc = 0
  useFrame((state) => {
    acc = acc + Math.pow(0.3, 2)
    if (gravity > 0) setGravity(gravity - acc)
    // console.log(state.scene.children[2].children[0].children[0].children[5])
    state.scene.children[2].children[0].children[0].children.forEach(
      (el, i) => {
        if (i > 2) {
          el.castShadow = true
        }
        if (el.children) {
          el.children.forEach((item) => {
            item.castShadow = true
          })
        }
      }
    )
    if (floorselect <= 15) {
      if (floorselect > 8) {
        state.scene.children[2].children[0].children[0].children[5].children[
          state.scene.children[2].children[0].children[0].children[5].children
            .length - 3
        ].position.y = -2.58 + (floorselect - 8) / 3.4 + gravity
        state.scene.children[2].children[0].children[0].children[5].children[
          state.scene.children[2].children[0].children[0].children[5].children
            .length - 3
        ].children[0].children.forEach((box) => {
          box.material.transparent = true
          // console.log(box.material)
          if (box.material.opacity < 1) {
            box.material.opacity += box.material.opacity + Math.pow(0.25, 2)
          } else {
            box.material.transparent = false
          }
        })
        state.scene.children[2].children[0].children[0].children[5].children[
          state.scene.children[2].children[0].children[0].children[5].children
            .length - 2
        ].children.forEach((item, i) => {
          setTimeout(() => {
            item.position.y = -2.53 + (floorselect - 7) / 3.4 + gravity * 1.5
          }, [i * 10])
        })
        state.scene.children[2].children[0].children[0].children[5].children[
          state.scene.children[2].children[0].children[0].children[5].children
            .length - 2
        ].children.forEach((box) => {
          box.material.transparent = true
          if (box.material.opacity < 1) {
            box.material.opacity += 0.1
          } else {
            box.material.transparent = false
          }
        })
      } else {
        state.scene.children[2].children[0].children[0].children[5].children[
          state.scene.children[2].children[0].children[0].children[5].children
            .length - 2
        ].children.forEach((item, i) => {
          setTimeout(() => {
            item.position.y = -2.41 + (floorselect - 7) / 3.4 + gravity * 1.5
          }, [i * 10])
        })
        state.scene.children[2].children[0].children[0].children[5].children[
          state.scene.children[2].children[0].children[0].children[5].children
            .length - 2
        ].children.forEach((box) => {
          box.material.transparent = true
          if (box.material.opacity < 1) {
            box.material.opacity += 0.1
          } else {
            box.material.transparent = false
          }
        })
      }
    }
    // if (focus && floorselect < 16) {
    //   ref.current.position.set(0, -(32 / 10) - 0.6, 4)
    //   state.camera.lookAt(ref.current.position)
    // }
    // buildref.current.uniforms.uHeight.value = count
  })

  useEffect(() => {
    // console.log(ref.current)
    if (floorselect < 16) focusObj(ref.current.position)
    acc = 0
    setGravity(1)
  }, [floorselect])

  return (
    <>
      <Center>
        <color args={['white']} attach='background' />
        <directionalLight
          position={[2, 4, 2.5]}
          intensity={2.5}
          castShadow
          color='#fffbf8'
        />
        <directionalLight
          position={[1.5, 4, -2.5]}
          intensity={2.5}
          castShadow
          color='#fffbf8'
        />
        <ambientLight intensity={0.5} color='#fffbf8' />
        <Sky
          sunPosition={[-2, 4, -2.5]}
          mieDirectionalG={0.5}
          mieCoefficient={0.01}
        />
        <Selection>
          <EffectComposer autoClear={false}>
            <Outline visibleEdgeColor='black' edgeStrength={20} width={1000} />
          </EffectComposer>
          <group ref={ref} position={[0, 0, 0]}>
            <Physics
              gravity={[0, -2.8, 0]}
              //  debug
            >
              {route === '' || focus ? null : highlight()}
              {box()}
              {floor()}
              <RigidBody type='fixed'>
                <mesh
                  rotation-x={-Math.PI * 0.5}
                  position-y={-5.1}
                  scale={1000}
                  receiveShadow
                >
                  <planeGeometry args={[2, 2, 10, 10]} />
                  <shaderMaterial />
                  <meshStandardMaterial color='white' />
                </mesh>
              </RigidBody>
            </Physics>
          </group>
        </Selection>
      </Center>
    </>
  )
}
