import React from 'react'

import View from './View';

const Manager_view = () => {
  return (
    <>
        <View />
        <button className='btn btn-primary mt-5' type='submit'>
            <a href="./report"  style={{textDecoration: 'none', color:'white'}}>Report</a>
      </button>
    </>
  )
}

export default Manager_view