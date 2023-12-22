import { Center, Sky, useGLTF, useHelper } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import React, { useEffect, useRef, useState } from 'react'
import Floorplan2 from '../../assets/glb/fix_floor2.glb'
import Floorplan from '../../assets/glb/fix_floor_scale.glb'
import Cut1 from '../../assets/glb/cut_1-7.glb'
import Cut2 from '../../assets/glb/cut8-9.glb'
import Cut3 from '../../assets/glb/cut_10.glb'
import Cut5 from '../../assets/glb/cut_13.glb'
import Cut7 from '../../assets/glb/cut_rooftop.glb'
import * as THREE from 'three'
import {
  EffectComposer,
  Outline,
  Select,
  Selection,
} from '@react-three/postprocessing'
import { folder, useControls } from 'leva'

export default function Building({
  count,
  focus,
  setfocus,
  setcount,
  route,
  click,
  room,
  setroute,
  setroom,
  floorselect,
}) {
  const ref = useRef()
  const cameraRef = useRef()
  const [gravity, setGravity] = useState(1)
  const building = [
    { node: useGLTF(Cut1).scene.children[0].children[0].children },
    { node: useGLTF(Cut2).scene.children[0].children[0].children },
    { node: useGLTF(Cut2).scene.children[0].children[0].children },
    { node: useGLTF(Cut3).scene.children[0].children[0].children },
    { node: useGLTF(Cut3).scene.children[0].children[0].children },
    { node: useGLTF(Cut3).scene.children[0].children[0].children },
    { node: useGLTF(Cut5).scene.children[0].children[0].children },
    { node: useGLTF(Cut5).scene.children[0].children[0].children },
    { node: useGLTF(Cut7).scene.children[0].children[0].children },
  ]

  // const building2 = useGLTF(Cut2).scene.children[0].children[0]
  // console.log(building2)

  const floorplan2 = useGLTF(Floorplan2).nodes['Scene'].children[0].children
  const floorplan = useGLTF(Floorplan).nodes['Scene'].children[0].children

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
    // console.log('asd')
    let item = [<RigidBody key='border' type='fixed'></RigidBody>]
    for (var j = 0; j < (focus ? count - 7 : floorselect - 7); j++) {
      building[j].node.map((item, i) => {
        item.castShadow = true
        console.log(item)
      })
      if (j === 0) {
        item.push(
          <RigidBody
            type='fixed'
            key={j}
            gravityScale={1}
            position-y={-5.215 + j}
            position-z={0.67}
          >
            <group key={j}>
              {building[j].node.map((item, i) => (
                <mesh
                  key={i}
                  castShadow
                  receiveShadow
                  ref={addToRefs}
                  scale={1}
                  geometry={item.children[0].geometry}
                  material={item.children[0].material}
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
      }
    }

    return <>{item}</>
  }

  function highlight() {
    let item = []
    floorplan.map((item, i) => {
      item.children[0].castShadow = true
    })

    for (var j = 0; j < 9; j++) {
      if (j === 0) {
      } else if (j === 9) {
      } else {
        item.push(
          <group
            key={j}
            rotation={[0, Math.PI, 0]}
            position={[0.0, -2.53 + j / 3.6, 0.7]}
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
            if (route == 'floor' && count - 7 === j) {
              setcount(j)
            } else if (route == 'room') {
              setcount(j)
            }
            if (route == 'floor' && count - 7 === j) {
              setfocus(true)
            } else {
              setfocus(true)
            }
            if (route == 'floor' && count - 7 === j) {
              click()
            } else if (route == 'room') {
              click()
            }
            if (route == 'room') setroom(roomType[i].type)
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
        </mesh>
      </Select>
    )
  }

  function floor() {
    let item = []
    const [hovered, hover] = useState(null)
    const [selected, select] = useState(null)
    floorplan2.map((item, i) => {
      item.children[0].castShadow = true
      item.children[0].position.y = -2.0 + (floorselect - 7) / 3.4
      // console.log(item)
    })
    if (floorselect <= 15)
      item.push(
        <group key={2} rotation={[0, Math.PI, 0]}>
          {floorplan2.map((item, i) => (
            <>
              <mesh
                key={i}
                castShadow
                ref={addToRefs}
                scale={new THREE.Vector3(0.24, 0.23, 0.23)}
                position={[-0, -2.0 + (floorselect - 7) / 3.5, -0.225]}
                geometry={item.children[0].geometry}
                onPointerOver={() => {
                  // console.log(i, item.children[0])
                  hover(i)
                }}
                onPointerOut={() => hover(null)}
                onClick={() => {
                  // console.log(i)
                  setroute('room')
                  select(i)
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
                      ? selected === i
                        ? '#2a3e5b'
                        : '#6d84a3'
                      : '#f8eebb'
                  }
                />
              </mesh>
            </>
          ))}
        </group>
      )

    return <>{item}</>
  }

  var acc = 0
  useFrame((state) => {
    acc = acc + 0.25
    if (gravity > 0) setGravity(gravity - acc)
    // console.log(
    //   state.scene.children[2].children[0].children[0].children[4].children[
    //     state.scene.children[2].children[0].children[0].children[4].children
    //       .length - 5
    //   ].children[0].children
    // )
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
        state.scene.children[2].children[0].children[0].children[4].children[
          state.scene.children[2].children[0].children[0].children[4].children
            .length - 3
        ].position.y = -2.58 + (floorselect - 8) / 3.4 + gravity
        state.scene.children[2].children[0].children[0].children[4].children[
          state.scene.children[2].children[0].children[0].children[4].children
            .length - 3
        ].children[0].children.forEach((box) => {
          box.material.transparent = true
          if (box.material.opacity < 1) {
            box.material.opacity += box.material.opacity + 0.25
          } else {
            box.material.transparent = false
          }
        })
        state.scene.children[2].children[0].children[0].children[4].children[
          state.scene.children[2].children[0].children[0].children[4].children
            .length - 2
        ].children.forEach((item, i) => {
          setTimeout(() => {
            item.position.y = -2.53 + (floorselect - 7) / 3.4 + gravity * 1.5
          }, [i * 10])
        })
        state.scene.children[2].children[0].children[0].children[4].children[
          state.scene.children[2].children[0].children[0].children[4].children
            .length - 2
        ].children.forEach((box) => {
          box.material.transparent = true
          if (box.material.opacity < 1) {
            box.material.opacity += box.material.opacity + 0.25
          } else {
            box.material.transparent = false
          }
        })
      } else {
        state.scene.children[2].children[0].children[0].children[4].children[
          state.scene.children[2].children[0].children[0].children[4].children
            .length - 2
        ].children.forEach((item, i) => {
          setTimeout(() => {
            item.position.y = -2.53 + (floorselect - 7) / 3.4 + gravity * 1.5
          }, [i * 10])
        })
        state.scene.children[2].children[0].children[0].children[4].children[
          state.scene.children[2].children[0].children[0].children[4].children
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
  })

  useEffect(() => {
    acc = 0
    setGravity(1)
  }, [])

  // const {
  //   vec1,
  //   intensity1,
  //   color1,
  //   vec2,
  //   intensity2,
  //   color2,
  //   intensity3,
  //   color3,
  //   vec4,
  //   look,
  //   intensity4,
  //   color4,
  //   distance,
  //   angle,
  //   penumbra,
  //   decay,
  // } = useControls({
  //   directionalLight1: folder({
  //     vec1: { value: [2, 4, 2.5], label: 'vec' },
  //     intensity1: { value: 4.5, label: 'intensity' },
  //     color1: { value: '#fffbf8', label: 'color' },
  //   }),
  //   directionalLight2: folder({
  //     vec2: { value: [1.5, 4, -2.5], label: 'vec' },
  //     intensity2: { value: 1.5, label: 'intensity' },
  //     color2: { value: '#fffbf8', label: 'color' },
  //   }),
  //   ambientLight: folder({
  //     intensity3: { value: 1, label: 'intensity' },
  //     color3: { value: '#fffbf8', label: 'color' },
  //   }),
  //   spotLight: folder({
  //     vec4: { value: [-0.3, -8, -5], label: 'vec' },
  //     look: { value: [-0.3, -10, 0], label: 'lookAt' },
  //     intensity4: { value: 1, label: 'intensity' },
  //     color4: { value: '#fffbf8', label: 'color' },
  //     distance: { value: 0, label: 'distance' },
  //     angle: {
  //       value: 0.57,
  //       label: 'angle',
  //       min: -Math.PI / 2,
  //       max: Math.PI / 2,
  //     },
  //     penumbra: { value: 0, label: 'penumbra', min: 0, max: 1 },
  //     decay: { value: 0, label: 'decay' },
  //   }),
  // })

  const spotLight = useRef()
  // useHelper(spotLight, THREE.SpotLightHelper, 'red')

  return (
    <>
      <Center>
        {/* <CameraControls
          makeDefault
          enabled
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.64}
          minZoom={0.1}
          maxZoom={1}
          minDistance={4}
          maxDistance={15}
          ref={cameraRef}
        /> */}
        <color args={['white']} attach='background' />
        <group key='light'>
          <directionalLight
            position={[2, 4, 2.5]}
            intensity={4.5}
            castShadow
            color={'#fffbf8'}
          />
          <spotLight
            ref={spotLight}
            position={[-0.3, -8.0, -5.0]}
            color={'#fffbf8'}
            intensity={2.0}
            distance={0}
            angle={0.57}
            penumbra={0}
            decay={0}
            lookAt={[0, -10, 0]}
            castShadow
          />
        </group>
        <Sky
          sunPosition={[-2, 4, -2.5]}
          mieDirectionalG={0.5}
          mieCoefficient={0.01}
        />
        <ambientLight intensity={2.0} color={'#fffbf8'} />
        <Selection>
          <EffectComposer autoClear={false}>
            <Outline visibleEdgeColor='black' edgeStrength={20} width={1000} />
          </EffectComposer>
          <group ref={ref} position={[0, 0, -0.5]}>
            <Physics gravity={[0, -2.8, 0]}>
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
