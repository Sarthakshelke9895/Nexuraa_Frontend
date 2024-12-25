import React from 'react'
import './Title.css'

const Title = ({subtitle,title}) => {
  return (
    <div className='title'>
         <h2>{subtitle}</h2>
      <p>{title}</p>
     
    </div>
  )
}

export default Title
