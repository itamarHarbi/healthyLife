import React from 'react'

export default function ErrorComp() {
  const url = window.location.origin
  return (
    <div className='container d-flex justify-content-center vh-100  ' >
     <div className='d-flex align-self-center flex-column'>
      <h1 className='text-center fs-1'>אופס...</h1>
      <p className='fs-3'>
        אנחנו לא בטוחים איך הגעת לפה
        <br/>
        <a href={url}>לחצו כאן</a> לחזרה לדף הבית
      </p>

     </div>

    </div>
  )
}
