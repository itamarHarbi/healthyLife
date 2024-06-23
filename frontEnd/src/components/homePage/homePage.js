import React, { useEffect, useState } from 'react'
import MenuBanner from './menuBanner'
import { apiGet } from '../../services/apiServices';
import UseBanners from '../../hooks/useBanners';
import BannersContainer from './bannersContainer';

export default function HomePage() {
    // const [banners, setBanners] = useState([])



    const [pClass, setPClass] = useState("d-none")


    // const renderMore = async () => {
    //     const cursor = apidata.nextCursor
    //     cursor
    //         ?
    //         render(apidata.nextCursor)
    //         :
    //         setPClass("d-block")
    //     // console.log(apidata);
    //     // const data = await
    //     // console.log(data);s
    // }



    return (
        <div className='container-fluid'>
            <div className='container bg-transparent p-5'>
             <BannersContainer/>
            </div>

        </div>
    )
}
//    {/* {
//                     banners.map(i => {
//                         return <MenuBanner data={i} />
//                     })
//                 } */}

//                 <div className='text-center'>
//                     <p className={pClass + " text-danger"} >לא נמצאו תוצאות נוספות</p>
//                     {/* <button onClick={renderMore}>עוד תוצאות</button> */}
//                 </div>
