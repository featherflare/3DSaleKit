export default function NavBar({ changePage, isSelect }) {
  return (
    <nav className='bottom-bar'>
      <ul>
        <li className={`${isSelect === 0 ? 'selected' : ''}`}>
          <a
            className='dbheaven'
            onClick={() => {
              changePage(0)
            }}
          >
            HOME
          </a>
        </li>{' '}
        <li className={`${isSelect === 1 ? 'selected' : ''}`}>
          <a
            className='dbheaven'
            onClick={() => {
              changePage(1)
            }}
          >
            PROJECT DETAIL
          </a>
        </li>{' '}
        <li className={`${isSelect === 2 ? 'selected' : ''}`}>
          <a
            className='dbheaven'
            onClick={() => {
              changePage(2)
            }}
          >
            PROJECT CONCEPT
          </a>
        </li>{' '}
        <li className={`${isSelect === 3 ? 'selected' : ''}`}>
          <a
            className='dbheaven'
            onClick={() => {
              changePage(3)
            }}
          >
            LOCATION
          </a>
        </li>{' '}
        <li className={`${isSelect === 4 ? 'selected' : ''}`}>
          <a
            className='dbheaven'
            onClick={() => {
              changePage(4)
            }}
          >
            PROJECT HIGHLIGHT
          </a>
        </li>{' '}
        <li className={`${isSelect === 5 ? 'selected' : ''}`}>
          <a
            className='dbheaven'
            onClick={() => {
              changePage(5)
            }}
          >
            FLOOR PLAN
          </a>
        </li>{' '}
        <li className={`${isSelect === 6 ? 'selected' : ''}`}>
          <a
            className='dbheaven'
            onClick={() => {
              changePage(6)
            }}
          >
            ROOM TYPE
          </a>
        </li>{' '}
        <li className={`${isSelect === 7 ? 'selected' : ''}`}>
          <a
            className='dbheaven'
            onClick={() => {
              changePage(7)
            }}
          >
            GALLERY
          </a>
        </li>{' '}
        <li className={`${isSelect === 8 ? 'selected' : ''}`}>
          <a
            className='dbheaven'
            onClick={() => {
              changePage(8)
            }}
          >
            PANOROMA
          </a>
        </li>
      </ul>
    </nav>
  )
}
