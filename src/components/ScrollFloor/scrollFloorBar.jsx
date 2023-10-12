import { useEffect, useRef } from 'react'

export default function ScrollFloorBar({
  count,
  route,
  isFocus,
  time,
  setClick,
  setCount,
  setFloorSelect,
  floorSelect,
  click,
}) {
  const floorBtnRef = useRef()

  // Floor Select Constance //
  const addMesh = () => {
    time = time + 200
    if (count < 15) {
      setClick(click + 1)
      // setFocus(true)
      setCount(count + 1)
      if (isFocus) setFloorSelect(floorSelect - 1)
    }
  }

  const removeMesh = () => {
    time = time + 200
    if (count > 8) {
      setClick(click + 1)
      // setFocus(true)
      setCount(count - 1)
      if (isFocus) setFloorSelect(floorSelect - 1)
    }
  }

  const selectFloor = (val) => {
    setClick(click + 1)
    if (isFocus) setFloorSelect(val)
    // setFocus(true)
    time = time + 200
    setCount(val)
  }

  const setFloorbtn = () => {
    if (route != '' || isFocus == true) {
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
  }

  useEffect(() => {
    if (floorBtnRef.current) {
      floorBtnRef.current.style.transform = `translateY( ${
        (count - 8) * 5 - 20
      }rem)`
    }
    setFloorbtn()
  }, [count, route])

  return (
    <div
      className='interface'
      style={{ opacity: `${route == 'floor' || isFocus == true ? 1 : 0}` }}
    >
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
  )
}
