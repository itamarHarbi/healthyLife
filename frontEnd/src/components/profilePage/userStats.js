import React, { useContext } from 'react'
import "./stats.css"
import { ProfilePageContext } from '../../contexts'
export default function UserStats() {
  const { data } = useContext(ProfilePageContext)

    return (
        <div className='stats  p-3 d-flex align-items-end'>
        {/* <button className='border-0 bg-transparent text-center mx-2'><span className='fs-2'>67</span> <br/> עוקבים</button> */}
        {/* <button className='border-0 bg-transparent text-center mx-2'><span className='fs-2'>23</span>  <div>במעקב</div> </button> */}
        <button className='border-0 bg-transparent text-center mx-2'><span className='fs-2'>{data.numberOfMenus}</span>  <div>מתכונים</div> </button>
        </div>
    )
}
