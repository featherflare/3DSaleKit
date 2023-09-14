import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useState, useEffect } from 'react'
import Building from '../../components/Building/building'
import FloorPlan from '../../components/FloorPlan/floorplan'
import * as THREE from 'three'
import RoomType from '../../components/RoomType/roomtype'
import Repeat from '../../helper/util/repeatFunc'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

export default function Home() {
  const aspect = window.innerWidth / window.innerHeight
  const [count, setCount] = useState(14)
  const [route, setRoute] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [focus, setFocus] = useState(false)
  const [rotate, setRotate] = useState()
  const compassRef = useRef()

  const cameraRef = useRef()

  const addMesh = () => {
    // console.log(count)
    setCount(count + 1)
  }

  const removeMesh = () => {
    // console.log(count)
    setCount(count - 1)
  }

  let item = []
  const onClose = () => {
    // console.log(item)
    setFocus(false)
    setRoute('')
    setIsActive(false)

    cameraRef.current.position.lerp(new THREE.Vector3(1, 10, 0), 0.1)
  }

  const OnGoToFloorPlanOrRoomType = () => {
    // console.log(item)
    if (route == 'floor') {
      item.push(<FloorPlan key='1' onClick={onClose} />)
      item.length = 1
    } else if (route == 'room') {
      item.push(<RoomType key='2' onClick={onClose} />)
      item.length = 1
    } else {
      item.push(<div key='3' />)
      item.length = 1
    }

    return (
      <div id='section' className={`section ${isActive ? 'have' : ''}`}>
        {item}
      </div>
    )
  }

  function SceneCamera() {
    useFrame((state) => {
      var dir = new THREE.Vector3()
      var sph = new THREE.Spherical()
      state.camera.getWorldDirection(dir)
      sph.setFromVector3(dir)

      // console.log(state.camera.getWorldDirection(dir))

      rotateCompass(sph)
      if (focus) {
        console.log(state)
        state.camera.position.lerp(new THREE.Vector3(1, 10, 0), 0.1)
        // state.camera.lookAt(ref.current.position)
      }
    }, [])

    return (
      <>
        <OrbitControls
          makeDefault
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.5}
          enablePan={false}
          enableZoom={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
        <PerspectiveCamera
          makeDefault
          rotation={[0, Math.PI, 0]}
          fov={75}
          position={[10, 0, 10]}
          near={1}
          far={1000}
          ref={cameraRef}
        />
      </>
    )
  }

  const rotateCompass = (rotation) => {
    if (compassRef.current) {
      compassRef.current.style.transform = `rotateY(${
        (rotation.theta * -360) / Math.PI - 180
      }deg)`
    }
  }

  return (
    <>
      <div className='content'>
        <div id='building' className={`building ${isActive ? 'have' : ''}`}>
          <Canvas
            flat
            linear
            resize={{ debounce: 0 }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              outputEncoding: THREE.sRGBEncoding,
            }}
          >
            <SceneCamera />
            <Building count={count} focus={focus} />
          </Canvas>
          <div className='compass'>
            <div className='scene'>
              <div className='banner' ref={compassRef}>
                <Repeat numTimes={37}>
                  {(i) => (
                    <div key={i} id={i} className={`panel panel-${i}`}></div>
                  )}
                </Repeat>
              </div>
            </div>
          </div>
        </div>
        {route == 'floor' ? (
          <div className='interface'>
            <div className='interfaceBtn'>
              <div onClick={addMesh}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='19'
                  height='11'
                  viewBox='0 0 19 11'
                  fill='none'
                >
                  <path d='M0.5 10.5L9.5 1.5L18.5 10.5' stroke='black' />
                </svg>
              </div>
              <div>FLOOR</div>
              <div onClick={removeMesh}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='19'
                  height='11'
                  viewBox='0 0 19 11'
                  fill='none'
                >
                  <path d='M0.5 0.5L9.5 9.5L18.5 0.5' stroke='black' />
                </svg>
              </div>
            </div>
            <div className='scrollbox'>
              <div className='interfaceFloor'>
                <button
                  className={`btnSelectFloor ${count === 8 ? 'select' : ''}`}
                  onClick={() => {
                    setCount(8)
                  }}
                >
                  8
                </button>
                <button
                  className={`btnSelectFloor ${count === 9 ? 'select' : ''}`}
                  onClick={() => {
                    setCount(9)
                  }}
                >
                  9
                </button>
                <button
                  className={`btnSelectFloor ${count === 10 ? 'select' : ''}`}
                  onClick={() => {
                    setCount(10)
                  }}
                >
                  10
                </button>
                <button
                  className={`btnSelectFloor ${count === 11 ? 'select' : ''}`}
                  onClick={() => {
                    setCount(11)
                  }}
                >
                  11
                </button>
                <button
                  className={`btnSelectFloor ${count === 12 ? 'select' : ''}`}
                  onClick={() => {
                    setCount(12)
                  }}
                >
                  12
                </button>
                <button
                  className={`btnSelectFloor ${count === 13 ? 'select' : ''}`}
                  onClick={() => {
                    setCount(13)
                  }}
                >
                  13
                </button>
                <button
                  className={`btnSelectFloor ${count === 14 ? 'select' : ''}`}
                  onClick={() => {
                    setCount(14)
                  }}
                >
                  14
                </button>
                <button
                  className={`btnSelectFloor ${count === 15 ? 'select' : ''}`}
                  onClick={() => {
                    setCount(15)
                  }}
                >
                  15
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <>
          <OnGoToFloorPlanOrRoomType />
        </>
      </div>
      <nav className='bottom-bar'>
        <ul>
          <li>
            <a
              onClick={() => {
                setRoute('')
                setIsActive(false)
                setFocus(false)
                cameraRef.current.position.lerp(
                  new THREE.Vector3(1, 10, 0),
                  0.1
                )
              }}
            >
              HOME
            </a>
          </li>
          <li>
            <a>PROJECT DETAIL</a>
          </li>
          <li>
            <a>PROJECT CONCEPT</a>
          </li>
          <li>
            <a>LOCATION</a>
          </li>
          <li>
            <a>PROJECT HIGHLIGHT</a>
          </li>
          <li>
            <a
              onClick={() => {
                setRoute('floor')
                setIsActive(true)
                setFocus(true)
              }}
            >
              FLOOR PLAN
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setIsActive(true)
                setRoute('room')
              }}
            >
              ROOM TYPE
            </a>
          </li>
          <li>
            <a>GALLERY</a>
          </li>
          <li>
            <a>PANOROMA</a>
          </li>
        </ul>
      </nav>
    </>
  )
}
