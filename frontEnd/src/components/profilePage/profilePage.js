import React, { useEffect, useMemo, useState } from 'react'
import { ProfilePageContext } from '../../contexts'
import ProfileImageWrap from './profileImageWrap'
import { apiGet, apiMethod } from '../../services/apiServices'
import { useParams} from 'react-router-dom'
import ErrorComp from '../error/error'
import PageLoading from '../overlays/pageLoading'
import UserStats from './userStats'
import "./profilePageStyle.css"
import BannersContainer from '../searchComps/bannersContainer'


export default function ProfilePage() {
    const { userName } = useParams()
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)


    const getData = async () => {
        try {
            const res = await apiGet(`users/${userName}`)
            console.log(res);
            setData(res)

        } catch (error) {
            console.log(error);
            setError(true)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    if (error) return <ErrorComp />
    if (!data) return <PageLoading />

    return (
        <>
            <ProfilePageContext.Provider value={{ data, setData }}>
                {/* <div className='container-fluid'> */}
                <div className='container'>
                    <main id='profilePage' className=''>
                        <section className='mb-5'>
                            <div className='infoWrap flex-wrap d-lg-flex mt-5 px-lg-4 justify-content-lg-around  '>
                                <div className='  col-12 justify-content-center d-flex col-lg-auto'>
                                    <div className='text-center text-lg-start d-lg-flex '>

                                    <ProfileImageWrap />
                                    <div className='h-auto d-flex flex-column justify-content-center '>
                                        <div className='h1 mb-0'>{data.displayName}</div>
                                        <div dir='ltr' className='h4 '>@<span>{data.userName}</span></div>
                                    </div>

                                    </div>
                                </div>
                                <div className='col-12 justify-content-center d-flex col-lg-auto'>
                                    <UserStats />
                                </div>
                            </div>
                        </section>
                        <section>
                            <BannersContainer userName={data.userName} auther={data.auther} />
                        </section>
                    </main>
                </div>
                {/* </div> */}
            </ProfilePageContext.Provider>
        </>
    )
}
