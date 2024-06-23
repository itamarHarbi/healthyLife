import React from 'react'
import LoadWrap from './loadWrap'
import LoadIn from './loadIn'
import { apiGet } from '../../services/apiServices'

export default function Loading() {
    const loader = "wait a minute"
    const getData = async () => {
        
        try {
            const data = fetch("https://catfact.ninja/factssa")
            return data

        } catch (error) {
            throw (error)
        }

    }

    return (
        <>
            <div className='container'>
                <LoadWrap
                    element={<LoadIn />}
                    loader="loader"
                    getter={getData}
                    errorElement = {"shit"}
                />


            </div>
        </>
    )
}
