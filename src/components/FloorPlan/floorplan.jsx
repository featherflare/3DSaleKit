import Panorama from '../../assets/image/panoramaView.svg'
import Simulate from '../../assets/image/simulateLight.svg'
import Floorplan from '../../assets/image/floorplan.png'
export default function FloorPlan({ onClick }) {
  return (
    <>
      <div className='floorplan' id='floor'>
        <div className='textheight dbheaven header1'>RESIDENTIAL AREA</div>
        <div className='textheight dbheaven header2'>7TH FLOOR</div>
        <div className='floorImg'>
          <img src={Floorplan} alt='Floor Plan'></img>
          <div className='floorIconMenu'>
            <img className='floorIconImg' src={Panorama} alt='Panorama View' />
            <div>panorama view</div>
          </div>
          <div className='floorIconMenu second'>
            <img className='floorIconImg' src={Simulate} alt='Simulate Light' />
            <div>simulate light</div>
          </div>
          <div className='floorType'>
            <div t-color='#eec79a'>A : 1 Bedroom 22.50 - 24.50 sq.m.</div>
            <div t-color='#D5CAB5'>C : 1 Bedroom 34.50 - 35.50 sq.m.</div>
            <div t-color='#EDEEE9'>B1 : 1 Bedroom 26.50 - 27.50 sq.m.</div>
            <div t-color='#A1927C'>D : 1 Bedroom 42.50 sq.m.</div>
            <div t-color='#C2C2C2'>B2 : 1 Bedroom 26.00 - 27.00 sq.m.</div>
            <div t-color='#E2BA62'>E : 1 Bedroom 49.00 - 50.00 sq.m.</div>
            <div t-color='#959595'>B3 : 1 Bedroom 28.50 - 30.50 sq.m.</div>
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
    </>
  )
}
