import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef, useState, useEffect } from 'react'
import Building from '../../components/Building/building'
import FloorPlan from '../../components/FloorPlan/floorplan'
import * as THREE from 'three'
import RoomType from '../../components/RoomType/roomtype'
import Repeat from '../../helper/util/repeatFunc'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as TWEEN from '@tweenjs/tween.js'

export default function Home() {
  // Building Animtion Constance //
  const [obj, setObj] = useState()
  var time = 0
  const [focus, setFocus] = useState()
  const compassRef = useRef()
  const cameraRef = useRef()
  const floorBtnRef = useRef()

  // Floor Select Constance //
  const [count, setCount] = useState(16)
  const [isUP, setIsUP] = useState(true)

  // Room Select Constance //
  const [room, setRoom] = useState(0)

  // Nav Select Constance //
  const [route, setRoute] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [isSelect, setIsSelect] = useState(0)

  // Room Select Constance //
  const selectRoom = (val) => {
    setRoom(val)
  }

  // Floor Select Constance //
  const addMesh = () => {
    time = time + 200
    if (count < 15) {
      setCount(count + 1)
      setIsUP(true)
    }
  }

  const removeMesh = () => {
    time = time + 200
    if (count > 8) {
      setCount(count - 1)
      setIsUP(false)
    }
  }

  const selectFloor = (val) => {
    time = time + 200
    setCount(val)
  }

  useEffect(() => {
    if (floorBtnRef.current) {
      floorBtnRef.current.style.transform = `translateY( ${
        (count - 8) * 5 - 20
      }rem)`
    }

    if (isSelect === 5) {
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

  // Nav Select Constance //
  let item = []

  const onClose = () => {
    time = 0
    setFocus(false)
    setRoute('')
    setIsActive(false)
    setCount(16)
  }

  const onChangePage = (val) => {
    if (val == 5) {
      setRoute('floor')
    } else if (val == 6) {
      setRoute('room')
    } else {
      setRoute('')
    }
    if (val == 5 || val == 6) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
    if (val == 5) {
      setFocus(true)
      setCount(8)
    } else {
      setFocus(false)
      setCount(16)
    }
    setIsSelect(val)
    time = 0
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

  // Building Animtion Section //
  function SceneCamera() {
    useFrame((state) => {
      time = time > 100 ? 101 : time + 1
      var dir = new THREE.Vector3()
      var sph = new THREE.Spherical()
      state.camera.getWorldDirection(dir)
      sph.setFromVector3(dir)

      console.log(obj)
      // timer()
      rotateCompass(sph)
      if (obj) {
        if (focus) {
          // state.camera.lookAt(new THREE.Vector3(obj.x, 0, obj.z))
        } else {
          // state.camera.lookAt(new THREE.Vector3(obj.x, 0, obj.z))
        }
        if (focus && time < 100) {
          // state.camera.position.lerp(
          //   new THREE.Vector3(obj.x, obj.y + 9, obj.z - 0.5),
          //   0.2
          // )
        } else if (!focus && time < 100) {
          // state.camera.position.lerp(new THREE.Vector3(-9, 0, 9), 0.1)
        }
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
          enableZoom={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.5}
        />
        <PerspectiveCamera
          makeDefault
          rotation={[0, Math.PI, 0]}
          fov={75}
          position={[-10, 3, 10]}
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

  return (
    <>
      <div className='content'>
        <div id='building' className={`building ${isActive ? 'have' : ''}`}>
          <Canvas
            shadows
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
            <Building
              count={count}
              focus={focus}
              focusObj={(ref) => setObj(ref)}
              setUp={(up) => setIsUP(up)}
              isUp={isUP}
            />
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
                    selectFloor(8)
                  }}
                >
                  8
                </button>
                <button
                  id={9}
                  className={`btnSelectFloor ${count === 9 ? 'select' : ''}`}
                  onClick={() => {
                    selectFloor(9)
                  }}
                >
                  9
                </button>
                <button
                  id={10}
                  className={`btnSelectFloor ${count === 10 ? 'select' : ''}`}
                  onClick={() => {
                    selectFloor(10)
                  }}
                >
                  10
                </button>
                <button
                  id={11}
                  className={`btnSelectFloor ${count === 11 ? 'select' : ''}`}
                  onClick={() => {
                    selectFloor(11)
                  }}
                >
                  11
                </button>
                <button
                  id={12}
                  className={`btnSelectFloor ${count === 12 ? 'select' : ''}`}
                  onClick={() => {
                    selectFloor(12)
                  }}
                >
                  12
                </button>
                <button
                  id={13}
                  className={`btnSelectFloor ${count === 13 ? 'select' : ''}`}
                  onClick={() => {
                    selectFloor(13)
                  }}
                >
                  13
                </button>
                <button
                  id={14}
                  className={`btnSelectFloor ${count === 14 ? 'select' : ''}`}
                  onClick={() => {
                    selectFloor(14)
                  }}
                >
                  14
                </button>
                <button
                  id={15}
                  className={`btnSelectFloor ${count === 15 ? 'select' : ''}`}
                  onClick={() => {
                    selectFloor(15)
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
                onChangePage(0)
              }}
            >
              HOME
            </a>
          </li>{' '}
          <li className={`${isSelect === 1 ? 'selected' : ''}`}>
            <a
              className='dbheaven'
              onClick={() => {
                onChangePage(1)
              }}
            >
              PROJECT DETAIL
            </a>
          </li>{' '}
          <li className={`${isSelect === 2 ? 'selected' : ''}`}>
            <a
              className='dbheaven'
              onClick={() => {
                onChangePage(2)
              }}
            >
              PROJECT CONCEPT
            </a>
          </li>{' '}
          <li className={`${isSelect === 3 ? 'selected' : ''}`}>
            <a
              className='dbheaven'
              onClick={() => {
                onChangePage(3)
              }}
            >
              LOCATION
            </a>
          </li>{' '}
          <li className={`${isSelect === 4 ? 'selected' : ''}`}>
            <a
              className='dbheaven'
              onClick={() => {
                onChangePage(4)
              }}
            >
              PROJECT HIGHLIGHT
            </a>
          </li>{' '}
          <li className={`${isSelect === 5 ? 'selected' : ''}`}>
            <a
              className='dbheaven'
              onClick={() => {
                onChangePage(5)
              }}
            >
              FLOOR PLAN
            </a>
          </li>{' '}
          <li className={`${isSelect === 6 ? 'selected' : ''}`}>
            <a
              className='dbheaven'
              onClick={() => {
                onChangePage(6)
              }}
            >
              ROOM TYPE
            </a>
          </li>{' '}
          <li className={`${isSelect === 7 ? 'selected' : ''}`}>
            <a
              className='dbheaven'
              onClick={() => {
                onChangePage(7)
              }}
            >
              GALLERY
            </a>
          </li>{' '}
          <li className={`${isSelect === 8 ? 'selected' : ''}`}>
            <a
              className='dbheaven'
              onClick={() => {
                onChangePage(8)
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
