import { Canvas } from '@react-three/fiber'
import React, { useState } from 'react'
import Building from '../../components/Building/building'
import FloorPlan from '../../components/FloorPlan/floorplan'
import * as THREE from 'three'
import RoomType from '../../components/RoomType/roomtype'
import Repeat from '../../helper/util/repeatFunc'

export default function Home() {
  const aspect = window.innerWidth / window.innerHeight
  const [count, setCount] = useState(32)
  const [route, setRoute] = useState('')
  const [isActive, setIsActive] = useState(false)

  const addMesh = () => {
    console.log(count)
    setCount(count + 1)
  }

  const removeMesh = () => {
    console.log(count)
    setCount(count - 1)
  }

  let item = []
  const onClose = () => {
    console.log(item)
    setIsActive(false)
  }

  const OnGoToFloorPlanOrRoomType = () => {
    console.log(item)
    if (route == 'floor') {
      item.push(<FloorPlan onClick={onClose} />)
      item.length = 1
    } else if (route == 'room') {
      item.push(<RoomType onClick={onClose} />)
      item.length = 1
    } else {
      item.push(<div />)
      item.length = 1
    }

    return (
      <div id='section' className={`section ${isActive ? 'have' : ''}`}>
        {item}
      </div>
    )
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
            camera={{
              fov: 60,
              near: 0.1,
              far: 100,
              position: [3, 4, 3],
              rotation: [0, 45, 0],
            }}
          >
            <Building count={count} />
          </Canvas>
        </div>
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
