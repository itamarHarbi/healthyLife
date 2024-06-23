import React, { useContext, useEffect, useState } from 'react'
import ProfileImage from './profileImage'
import { ProfilePageContext } from '../../contexts'
import { ApiUrl, apiGet, apiMethod } from '../../services/apiServices'
import PageLoading from '../overlays/pageLoading'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function ChangeProfilePic({ close, className }) {
    const [allPics, setAllPics] = useState(null)
    const [error, setError] = useState(null)

    const { data, setData } = useContext(ProfilePageContext) 

    const getAllPic = async (t) => { // t for number of tries
        try {
            const res = await apiGet("images");
            setAllPics(res)
        } catch (error) {

        }

    }

    const changeImage = async (url) => {
        
        const current = data.profileImage
        console.log("1",current);
        data.profileImage = url
        try {
            const res = await apiMethod(
                ApiUrl + "/users/changeImg",
                "POST",
                {
                    img: url
                }
            )
            console.log(res);
        } catch (error) {
            const user= data;
            data.profileImage = current
            close.setUpdate(!close.update)
            toast.error("משהו השתבש, נא נסו מאוחר יותר")
            console.log(error);
        }

    }


    useEffect(() => {
        getAllPic()
    }, [])



    return (
        <>
            <div onClick={close.showHide} className={`editBackDrop ${className} `}>

                <div className='mx-auto my-auto bg-light '>
                    <div className='imgContainer d-flex flex-wrap position-relative '>
                        {error ? <p>dsdsd</p> :

                            (allPics ?
                                allPics.map(i => {
                                    if (data.profileImage === i)
                                        return <ProfileImage _onClick={() => { changeImage(i) }} className={"col-3 p-2 active "} img={i} />

                                    return <ProfileImage _onClick={() => { changeImage(i) }} className={"col-3 p-2 "} img={i} />

                                })
                                :
                                <PageLoading />
                            )
                        }

                    </div>

                </div>
            </div>
            <ToastContainer draggable={true} />
        </>
    )
}
