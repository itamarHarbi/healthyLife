import React, { useEffect, useState } from 'react'
import { apiGet } from '../services/apiServices'

export default function UseBanners({ _page }) {
    // const banners = _banners
    const [apiData, setApiData] = useState({})
    // const [banners, setBanners] = useState(_banners)
    // console.log("INBAn", _banners);
    // console.log("InPage",_page);
    const fetchData = async () => {
        try {

            const res =
                await apiGet(`menus/banners?page=${_page}`)
            // :
            // await apiGet("menus/banners")
            const data = res.data
            delete res.data
            setApiData({ index: res, banners: [ ...data] });
            // setBanners([...banners, ...data])
            // console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()

    }, [])
    return (
        apiData
    )
}

