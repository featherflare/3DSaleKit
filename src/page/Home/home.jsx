import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef, useState, useEffect } from 'react'
import Building from '../../components/Building/building'
import FloorPlan from '../../components/FloorPlan/floorplan'
import * as THREE from 'three'
import RoomType from '../../components/RoomType/roomtype'
import Repeat from '../../helper/util/repeatFunc'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import NavBar from '../../components/Navbar/navbar'
import ScrollFloorBar from '../../components/ScrollFloor/scrollFloorBar'

export default function Home() {
  // Building Animtion Constance //
  const [obj, setObj] = useState()
  var time = 0
  const [isFocus, setIsFocus] = useState()
  const compassRef = useRef()
  const cameraRef = useRef()
  const orbRef = useRef()
  const [click, setClick] = useState(0)
  const [isZoom, setIsZoom] = useState(1)
  const [cameraPosition, setCameraPosition] = useState([-20, 3, 20])

  // Floor Select Constance //
  const [count, setCount] = useState(8)
  const [floorSelect, setFloorSelect] = useState(16)

  // Room Select Constance //
  const [room, setRoom] = useState()

  // Nav Select Constance //
  const [route, setRoute] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [isSelect, setIsSelect] = useState(0)

  // Room Select Constance //
  const selectRoom = (val) => {
    setRoom(val)
  }

  // Nav Select Constance //
  let item = []

  const onClose = () => {
    time = 0
    setIsFocus()
    setRoute('')
    setIsActive(false)
    setFloorSelect(16)
    setCount(8)
    setIsSelect(0)
    setClick(0)
    setRoom()
  }

  const onChangePage = (val) => {
    if (val == 5) {
      setRoom()
      setRoute('floor')
    } else if (val == 6) {
      setRoute('room')
      setRoom(0)
    } else {
      setRoute('')
      setRoom()
    }
    if (val == 5 || val == 6) {
      setIsActive(true)
      setIsFocus(false)
      setIsZoom(1.5)
    } else {
      setIsActive(false)
      setIsZoom(1.0)
    }
    if (val == 5) {
      setFloorSelect(16)
      setCount(8)
    } else {
      setFloorSelect(16)
      setIsFocus()
      setCount(8)
    }
    setIsSelect(val)
    setClick(0)
    time = 0
  }

  // Function to animate the camera position
  const animateCamera = () => {
    if (cameraRef.current) {
      cameraRef.current.position.set(
        cameraPosition[0],
        cameraPosition[1],
        cameraPosition[2]
      )
    }
  }

  useEffect(() => {
    animateCamera()
  }, [cameraPosition])

  const OnGoToFloorPlanOrRoomType = () => {
    if (route == 'floor') {
      item.push(<FloorPlan key='1' onClick={onClose} count={count} />)
      item.length = 1
    } else if (route == 'room') {
      item.push(
        <RoomType
          key='room'
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
      time = time > 100 ? 101 : time + 1
      var dir = new THREE.Vector3()
      var sph = new THREE.Spherical()
      state.camera.getWorldDirection(dir)
      sph.setFromVector3(dir)

      rotateCompass(sph)
      // console.log(click)

      if (isFocus && time < 100 && click <= 1) {
        state.camera.position.lerp(
          new THREE.Vector3(-5 / isZoom, 4 / isZoom, 5 / isZoom),
          0.2
        )
      } else if (isFocus && time < 100 && click > 1) {
        state.camera.position.lerp(
          new THREE.Vector3(-5 / isZoom, 4 / isZoom, 5 / isZoom),
          1
        )
      } else if ((!isFocus || isFocus == null) && time < 40) {
        if (room == 1) {
          state.camera.position.lerp(
            { x: -14 / isZoom, y: 3 / isZoom, z: -4 / isZoom },
            0.06
          )
          state.camera.lookAt(0, 0, 0)
        } else if (room == 3) {
          state.camera.position.lerp(
            { x: 9 / isZoom, y: 3 / isZoom, z: 9 / isZoom },
            0.06
          )
          state.camera.lookAt(0, 0, 0)
        } else if (room == 2 || room == 4) {
          state.camera.position.lerp(
            { x: -9 / isZoom, y: 3 / isZoom, z: 10 / isZoom },
            0.06
          )
          state.camera.lookAt(0, 0, 0)
        } else if (room == 0) {
          state.camera.position.lerp(
            { x: -10 / isZoom, y: 3 / isZoom, z: 10 / isZoom },
            0.06
          )
          state.camera.lookAt(0, 0, 0)
        } else if (room == null && click <= 0) {
          state.camera.position.lerp(
            { x: -10 / isZoom, y: 3 / isZoom, z: 10 / isZoom },
            0.06
          )
          state.camera.lookAt(0, 0, 0)
        } else if (room == null && click > 0) {
          state.camera.position.lerp(
            { x: -10 / isZoom, y: 3 / isZoom, z: 10 / isZoom },
            1
          )
          state.camera.lookAt(0, 0, 0)
        }
      }

      cameraRef.current.position.copy(state.camera.position)
      state.camera.updateProjectionMatrix()
      return null
    }, [])

    return (
      <>
        <OrbitControls
          // makeDefault
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.5}
          enablePan={false}
          enableZoom={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.64}
          minZoom={0.1}
          maxZoom={1}
          minDistance={4}
          maxDistance={15}
          ref={orbRef}
        />
        <PerspectiveCamera
          makeDefault
          fov={75}
          near={1}
          far={1000}
          ref={cameraRef}
          position={[-11.5, 3, 11.5]}
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
              logarithmicDepthBuffer: true,
            }}
            onDragEnd={() => {
              setCameraPosition([
                cameraRef.current.position.x,
                cameraRef.current.position.y,
                cameraRef.current.position.z,
              ])
            }}
          >
            <SceneCamera />
            <Building
              count={count}
              focus={isFocus}
              setfocus={(f) => setIsFocus(f)}
              setcount={(count) => {
                setCount(count + 7)
                setFloorSelect(count + 7)
              }}
              route={route}
              click={() => setClick(click + 1)}
              room={room}
              setroute={(route) => {
                setRoute(route)
              }}
              setroom={(room) => setRoom(room)}
              floorselect={floorSelect}
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
        <ScrollFloorBar
          count={count}
          route={route}
          isFocus={isFocus}
          time={time}
          setclick={(e) => setClick(e)}
          setCount={(e) => setCount(e)}
          setFloorSelect={(e) => setFloorSelect(e)}
          floorSelect={floorSelect}
          click={click}
        />
        <>
          <OnGoToFloorPlanOrRoomType />
        </>
      </div>
      <NavBar changePage={(page) => onChangePage(page)} isSelect={isSelect} />
    </>
  )
}
