import React, { useEffect, useState } from 'react'
import { apiGet } from '../../services/apiServices'
import MenuBanner from '../searchComps/menuBanner';
import { useLocation } from 'react-router-dom';

export default function BannersRender() {
    const [banners, setBanners] = useState([])
    const [loading, setloading] = useState(true)
    const [length, setLength] = useState(0)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get('q') || ""

    const fetchData = async (last) => {
        try {
            let url = "menus/search/byQ"
            if (searchParams.size > 0) url += "?"
            if (q) url += `q=${q}`
            if (last) url += `&last=${last}`
            if (!loading) { setloading(true) }
            const data = await apiGet(url)
            setloading(false)
            setBanners([...banners, ...data.data])
            return data.length
        } catch (error) {
            console.log(error);
            return 0
        }

    }
    const initialRender = async () => {
        const l = await fetchData()
        setLength(l)
    }
    const loadMore = () => {
        if (banners.length < length) {
            const last = banners[(banners.length - 1)]._id
            fetchData(last)
        }
    }

    useEffect(() => {
        initialRender()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [q])
    console.log(q);


    return (
        <>

            {banners.length > 0 &&

                <div>
                    {
                        banners.map((i, key) => {
                            return <MenuBanner key={key} data={i} />
                        })
                    }
                </div>
            }
            {
                (banners.length === 0 && !loading) &&
                <div>
                    לא נמצאו תוצאות ל:{q}
                </div>
            }
            {
                (banners.length < length) &&
                <div className='d-flex mt-4'>
                    <button className=' mx-auto btn btn-light border border-dark' onClick={loadMore}>
                        {
                            !loading ?
                                <span>תוצאות נוספות</span>
                                :
                                <span><i className="fa fa-spinner" aria-hidden="true"></i></span>
                        }
                    </button>

                </div >
            }
            {
                (banners.length > 0 && banners.length >= length) &&
                <div className='text-center text-danger'>
                    סוף התוצאות
                </div>

            }
        </>
    )
}
