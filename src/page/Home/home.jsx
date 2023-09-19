import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useState, useEffect } from 'react'
import Building from '../../components/Building/building'
import FloorPlan from '../../components/FloorPlan/floorplan'
import * as THREE from 'three'
import RoomType from '../../components/RoomType/roomtype'
import Repeat from '../../helper/util/repeatFunc'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

export default function Home() {
  const [count, setCount] = useState(14)

  const addMesh = () => {
    // console.log(count)
    if (count < 15) setCount(count + 1)
  }

  const removeMesh = () => {
    // console.log(count)
    if (count > 8) setCount(count - 1)
  }

  const [room, setRoom] = useState(1)

  const selectRoom = (val) => {
    setCount(val)
  }

  const [route, setRoute] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [isSelect, setIsSelect] = useState(0)
  const [focus, setFocus] = useState(false)

  const compassRef = useRef()
  const cameraRef = useRef()
  const floorBtnRef = useRef()

  var time = 0

  let item = []
  const onClose = () => {
    // console.log(item)
    time = 0
    setFocus(false)
    setRoute('')
    setIsActive(false)
    setCount(14)

    cameraRef.current.position.lerp(new THREE.Vector3(10, 0, 10), 0.1)
  }

  const OnGoToFloorPlanOrRoomType = () => {
    // console.log(item)
    if (route == 'floor') {
      item.push(
        <FloorPlan
          key='1'
          onClick={onClose}
          room={room}
          selectRoom={selectRoom}
        />
      )
      item.length = 1
    } else if (route == 'room') {
      item.push(
        <RoomType
          key='2'
          onClick={onClose}
          room={room}
          selectRoom={selectRoom}
        />
      )
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
      time++
      var dir = new THREE.Vector3()
      var sph = new THREE.Spherical()
      state.camera.getWorldDirection(dir)
      sph.setFromVector3(dir)

      rotateCompass(sph)

      if (focus && time < 100) {
        state.camera.position.lerp(new THREE.Vector3(1, 10, 0), 0.1)
      } else if (!focus && time < 100) {
        state.camera.position.lerp(new THREE.Vector3(10, 0, 10), 0.1)
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
          maxPolarAngle={Math.PI / 1.5}
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
        ((rotation.theta * -360) / Math.PI - 180) / 2
      }deg)`
    }
  }

  useEffect(() => {
    if (floorBtnRef.current) {
      floorBtnRef.current.style.transform = `translateY( ${
        (count - 8) * 4 - 16
      }rem)`
    }

    if (isActive) {
      if (count + 1 <= 15) {
        document.getElementById(count + 1).classList.remove('unselect-1')
        document.getElementById(count + 1).classList.remove('unselect-2')
        document.getElementById(count + 1).classList.remove('unselect-3')
        document.getElementById(count + 1).classList.add('unselect-1')
      }
      if (count + 2 <= 15) {
        document.getElementById(count + 2).classList.remove('unselect-1')
        document.getElementById(count + 2).classList.remove('unselect-2')
        document.getElementById(count + 2).classList.remove('unselect-3')
        document.getElementById(count + 2).classList.add('unselect-2')
      }
      if (count + 3 <= 15) {
        document.getElementById(count + 3).classList.remove('unselect-1')
        document.getElementById(count + 3).classList.remove('unselect-2')
        document.getElementById(count + 3).classList.remove('unselect-3')
        document.getElementById(count + 3).classList.add('unselect-3')
      }

      if (count - 1 >= 8) {
        document.getElementById(count - 1).classList.remove('unselect-1')
        document.getElementById(count - 1).classList.remove('unselect-2')
        document.getElementById(count - 1).classList.remove('unselect-3')
        document.getElementById(count - 1).classList.add('unselect-1')
      }
      if (count - 2 >= 8) {
        document.getElementById(count - 2).classList.remove('unselect-1')
        document.getElementById(count - 2).classList.remove('unselect-2')
        document.getElementById(count - 2).classList.remove('unselect-3')
        document.getElementById(count - 2).classList.add('unselect-2')
      }
      if (count - 3 >= 8) {
        document.getElementById(count - 3).classList.remove('unselect-1')
        document.getElementById(count - 3).classList.remove('unselect-2')
        document.getElementById(count - 3).classList.remove('unselect-3')
        document.getElementById(count - 3).classList.add('unselect-3')
      }
    }
  }, [count])

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
                <Repeat numTimes={57}>
                  {(i) => <div key={i} className={`panel panel-${i}`}></div>}
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
              <div className='interfaceFloor' ref={floorBtnRef}>
                <button
                  id={8}
                  className={`btnSelectFloor ${count === 8 ? 'select' : ''}`}
                  onClick={() => {
                    setCount(8)
                  }}
                >
                  8
                </button>
                <button
                  id={9}
                  className={`btnSelectFloor ${count === 9 ? 'select' : ''}`}
                  onClick={() => {
                    setCount(9)
                  }}
                >
                  9
                </button>
                <button
                  id={10}
                  className={`btnSelectFloor ${count === 10 ? 'select' : ''}`}
                  onClick={() => {
                    setCount(10)
                  }}
                >
                  10
                </button>
                <button
                  id={11}
                  className={`btnSelectFloor ${count === 11 ? 'select' : ''}`}
                  onClick={() => {
                    setCount(11)
                  }}
                >
                  11
                </button>
                <button
                  id={12}
                  className={`btnSelectFloor ${count === 12 ? 'select' : ''}`}
                  onClick={() => {
                    setCount(12)
                  }}
                >
                  12
                </button>
                <button
                  id={13}
                  className={`btnSelectFloor ${count === 13 ? 'select' : ''}`}
                  onClick={() => {
                    setCount(13)
                  }}
                >
                  13
                </button>
                <button
                  id={14}
                  className={`btnSelectFloor ${count === 14 ? 'select' : ''}`}
                  onClick={() => {
                    setCount(14)
                  }}
                >
                  14
                </button>
                <button
                  id={15}
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
          <li className={`${isSelect === 0 ? 'selected' : ''}`}>
            <a
              className='dbheaven'
              onClick={() => {
                time = 0
                setRoute('')
                setIsActive(false)
                setIsSelect(0)
                setCount(14)
                setFocus(false)
                cameraRef.current.position.lerp(
                  new THREE.Vector3(10, 0, 10),
                  0.1
                )
              }}
            >
              HOME
            </a>
          </li>{' '}
          <li className={`${isSelect === 1 ? 'selected' : ''}`}>
            <a
              className='dbheaven'
              onClick={() => {
                setIsSelect(1)
              }}
            >
              PROJECT DETAIL
            </a>
          </li>{' '}
          <li className={`${isSelect === 2 ? 'selected' : ''}`}>
            <a
              className='dbheaven'
              onClick={() => {
                setIsSelect(2)
              }}
            >
              PROJECT CONCEPT
            </a>
          </li>{' '}
          <li className={`${isSelect === 3 ? 'selected' : ''}`}>
            <a
              className='dbheaven'
              onClick={() => {
                setIsSelect(3)
              }}
            >
              LOCATION
            </a>
          </li>{' '}
          <li className={`${isSelect === 4 ? 'selected' : ''}`}>
            <a
              className='dbheaven'
              onClick={() => {
                setIsSelect(4)
              }}
            >
              PROJECT HIGHLIGHT
            </a>
          </li>{' '}
          <li className={`${isSelect === 5 ? 'selected' : ''}`}>
            <a
              className='dbheaven'
              onClick={() => {
                setIsSelect(5)
                time = 0
                setRoute('floor')
                setCount(8)
                setIsActive(true)
                setFocus(true)
              }}
            >
              FLOOR PLAN
            </a>
          </li>{' '}
          <li className={`${isSelect === 6 ? 'selected' : ''}`}>
            <a
              className='dbheaven'
              onClick={() => {
                setIsSelect(6)
                setIsActive(true)
                setRoute('room')
              }}
            >
              ROOM TYPE
            </a>
          </li>{' '}
          <li className={`${isSelect === 7 ? 'selected' : ''}`}>
            <a
              className='dbheaven'
              onClick={() => {
                setIsSelect(7)
              }}
            >
              GALLERY
            </a>
          </li>{' '}
          <li className={`${isSelect === 8 ? 'selected' : ''}`}>
            <a
              className='dbheaven'
              onClick={() => {
                setIsSelect(8)
              }}
            >
              PANOROMA
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}
