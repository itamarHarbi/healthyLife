import React, { useEffect, useState } from 'react'
import MenuBanner from './menuBanner'
import { apiGet } from '../../services/apiServices';

export default function HomePage() {
    const [apidata, setApiData] = useState({})
    const [banners, setBanners] = useState([])
    const [pClass, setPClass] = useState("d-none")
    const render = async (q) => {
        try {

            const res = q ?
                await apiGet(`menus/banners?cursor=${q}`)
                :
                await apiGet("menus/banners")
            const data = res.data
            delete res.data
            setApiData(res);
            setBanners([...banners, ...data])
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const renderMore = async () => {
        const cursor = apidata.nextCursor
        cursor
            ?
            render(apidata.nextCursor)
            :
            setPClass("d-block")
        // console.log(apidata);
        // const data = await
        // console.log(data);s
    }

    useEffect(() => {
        render()

    }, [])

    return (
        <div className='container-fluid'>
            <div className='container bg-transparent p-5'>
                {
                    banners.map(i => {
                        return <MenuBanner data={i} />
                    })
                }

                <div className='text-center'>
                    <p className={pClass+" text-danger"} >לא נמצאו תוצאות נוספות</p>
                    <button  onClick={renderMore}>עוד תוצאות</button>
                </div>

            </div>

        </div>
    )
}
