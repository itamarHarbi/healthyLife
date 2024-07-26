import React, {  useMemo } from 'react'
import { useState } from 'react';
import { apiGet } from '../../services/apiServices';
import MenuBanner from './menuBanner';

export default function BannersContainer(props) {
    const [banners, setBanners] = useState([])
    const [page, setPage] = useState(1)
    const [returnedPage, setReturnedPage] = useState(0)

    const [errorClass,setErrorClass] = useState("d-none")



    const fetchData = async () => {
        try {
            const res = await apiGet(`menus/banners?page=${page}`,props.userName||"")
            const data = res.data
            console.log(data);
            delete res.data
            return { index: res, banners: [...banners, ...data] }

        } catch (error) {
            throw (error)
        }
    }


    const data = useMemo(
        () => fetchData().then(
            (resolve) => {
                // console.log(resolve);
                setReturnedPage(resolve.index.page)
                resolve.banners !== banners &&
                    setBanners(resolve.banners)
            },
            (reject) => { setErrorClass("d-block") }
        )
        , [page])


    // const data = UseBanners({ _page: page })


    const nextPage = () => {
        setPage((returnedPage) + 1)
    }
    return (
        <div>
            {
                banners.map((i, key) => {
                    return <MenuBanner key={key} data={i} auther={props.auther} />
                })
            }
            <div>
                <p className={`text-danger text-center mt-2 ${errorClass}`} > לא נמצאו תוצאות נוספות</p>
            </div>

            {banners.length > 0 &&
                <div className='text-center mt-3'>
                    <button className='btn btn-dark' onClick={nextPage}>עוד תוצאות</button>
                </div>}
        </div>
    )
}
