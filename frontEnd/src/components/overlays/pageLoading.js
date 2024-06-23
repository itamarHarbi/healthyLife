import React from 'react'
import "./pageLoadingStyle.css"

export default function PageLoading() {
    return (
        <div className='position-absolute   loadingPage'>

            <div  className='d-flex flex-column align-items-center  fs-2'>
                <div className="spinner-border" role="status"/>
                <div>בטעינה...</div>
            </div>
        </div>
    )
}
