import Measurement from '../../assets/image/roommeasurement.svg'
import Simulate from '../../assets/image/simulateLight.svg'
import Bedroom from '../../assets/image/bedroom.svg'
import Bathroom from '../../assets/image/bathroom.svg'
import Kitchen from '../../assets/image/kitchen.svg'
import Roomtype from '../../assets/image/roomtypeTest.png'
import { useState } from 'react'
export default function RoomType({ onClick }) {
  const [isSelect, setIsSelect] = useState(1)

  return (
    <>
      <div className='roomtype'>
        <div className='textheight dbheaven header1'>TYPE A - 1A</div>
        <div className='textheight dbheaven header2'>22.50 SQ.M.</div>
        <div className='floorImg'>
          <img src={Roomtype} alt='Floor Plan'></img>
          <div className='roomIconMenu'>
            <img
              className='roomIconImg'
              src={Measurement}
              alt='Room Measurement'
            />
            <div>room measurement</div>
          </div>
          <div className='roomIconMenu second'>
            <img className='roomIconImg' src={Simulate} alt='Room Comparison' />
            <div>room comparison</div>
          </div>
          <div className='roomType'>
            <div className='roomTypeDetail'>
              <img className='roomIconImg' src={Bedroom} alt='Bedroom' />1
              bedroom
            </div>
            <div className='roomTypeDetail'>
              <img className='roomIconImg' src={Bathroom} alt='Bathroom' />1
              bathroom
            </div>
            <div className='roomTypeDetail'>
              <img className='roomIconImg' src={Kitchen} alt='Kitchen' />1
              kitchen
            </div>
          </div>
        </div>
        <div className='floorBack' onClick={onClick}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='11'
            height='17'
            viewBox='0 0 11 17'
            fill='none'
          >
            <path
              d='M3.95893 8.50338L9.94449 2.51756C10.1093 2.35314 10.2 2.1333 10.2 1.89889C10.2 1.66436 10.1093 1.44465 9.94449 1.27997L9.42 0.75574C9.25545 0.590797 9.03548 0.5 8.80108 0.5C8.56667 0.5 8.34696 0.590797 8.18228 0.75574L1.05552 7.88237C0.890183 8.04758 0.799646 8.26832 0.800296 8.50299C0.799646 8.7387 0.890053 8.95919 1.05552 9.12452L8.17565 16.2443C8.34033 16.4092 8.56004 16.5 8.79457 16.5C9.02898 16.5 9.24869 16.4092 9.4135 16.2443L9.93786 15.72C10.2791 15.3788 10.2791 14.8234 9.93786 14.4823L3.95893 8.50338Z'
              fill='#595959'
            />
          </svg>
          Back
        </div>
      </div>
      <div className='roomTypeList'>
        <div
          className={`roomTypeListDetail ${isSelect == 1 ? 'select' : ''}`}
          onClick={() => {
            setIsSelect(1)
          }}
        >
          <div className='roomTypeDetailNumber'>1</div>
          <div>
            <div className='roomTypeDetailName'>Studio</div>
            <div className='roomTypeDetailSize'>23 SQ.M</div>
          </div>
        </div>
        <div
          className={`roomTypeListDetail ${isSelect == 2 ? 'select' : ''}`}
          onClick={() => {
            setIsSelect(2)
          }}
        >
          <div className='roomTypeDetailNumber'>2</div>
          <div>
            <div className='roomTypeDetailName'>1 Bedroom</div>
            <div className='roomTypeDetailSize'>26 SQ.M</div>
          </div>
        </div>
        <div
          className={`roomTypeListDetail ${isSelect == 3 ? 'select' : ''}`}
          onClick={() => {
            setIsSelect(3)
          }}
        >
          <div className='roomTypeDetailNumber'>3</div>
          <div>
            <div className='roomTypeDetailName'>1 Bedroom Plus</div>
            <div className='roomTypeDetailSize'>35 SQ.M</div>
          </div>
        </div>
        <div
          className={`roomTypeListDetail ${isSelect == 4 ? 'select' : ''}`}
          onClick={() => {
            setIsSelect(4)
          }}
        >
          <div className='roomTypeDetailNumber'>4</div>
          <div>
            <div className='roomTypeDetailName'>1 Bedroom Exclusive</div>
            <div className='roomTypeDetailSize'>42.5 SQ.M</div>
          </div>
        </div>
        <div
          className={`roomTypeListDetail ${isSelect == 5 ? 'select' : ''}`}
          onClick={() => {
            setIsSelect(5)
          }}
        >
          <div className='roomTypeDetailNumber'>5</div>
          <div>
            <div className='roomTypeDetailName'>2 Bedroom</div>
            <div className='roomTypeDetailSize'>50 SQ.M</div>
          </div>
        </div>
      </div>
    </>
  )
}
