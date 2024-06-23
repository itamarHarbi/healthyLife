import React, { useContext, useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import "../../style/signUpStyle.css"
import Joi, { allow } from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { ApiUrl, KEY_TOKEN, apiMethod } from '../../services/apiServices';
import { useNavigate } from 'react-router-dom';
import { IsSignedInContext } from '../../contexts';
import { GetUserId, SetUserId } from '../../services/authentication';
import InfoOverlay from '../overlays/infoOverlay';

export default function SignUpMain() {
    const { isSignedIn, setIsSignedIn } = useContext(IsSignedInContext)
    const navigate = useNavigate()
    const errorMessages = {
        "string.empty": "*שדה חובה",
        "string.min": "*ערך חייב להכיל לפחות 2 תווים",
        "string.max": "*ערך יכול להכיל עד 20 תווים",
        "string.email": "*כתובת אימייל לא תקינה",
    }

    const schema = Joi.object({
        userName: Joi.string().min(2).max(20).alphanum().required().messages(errorMessages),
        displayName: Joi.string().min(2).max(20).required().messages(errorMessages),
        // lastName: Joi.string().min(2).max(20).required().messages(errorMessages),
        email: Joi.string().max(50).required().email({ tlds: { allow: false } }).messages(errorMessages),
        password: Joi.string().min(8).max(50).required().messages({ ...errorMessages, "string.min": "*סיסמא חייבת להכיל לפחות 8 תווים" }),
    }).required()

    const { register,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema)
    });

    const onSubmit = handleSubmit(async (data) => {

        try {
            const res = await apiMethod(
                `${ApiUrl}/users/signUp`,
                "POST",
                data
            )

            console.log(res);
            localStorage.setItem(KEY_TOKEN, res.data);
            setIsSignedIn(true)
            navigate("/")
        }

        catch (err) {
            console.log(err);
            const errorType = err.response?.data.err?.keyPattern || {}

            // console.log(errorKey);
            // console.log(Object.values(errorType)[0]);
            if (Object.values(errorType)[0] == 1) {
                const errorKey = Object.keys(errorType)[0];
                console.log("asdas");
                errorKey == 'email' ?
                    setError("email", { type: 'custom', message: `*כתובת מייל כבר בשימוש` })
                    :
                    setError(errorKey, { type: 'custom', message: `*שם משתמש תפוס` })
            }
        }


    })


    useEffect(() => {
        if (isSignedIn) navigate("/")
    })

    return (
        <div className='container-fluid bg-light'>
            <div className='signupWrap'>
                <div className='container shadow  rounded py-4 p-lg-4'>
                    <div className='signupDiv'>

                        <h1 className='text-center'>הרשמה:</h1>
                        <form onSubmit={onSubmit} noValidate>
                            <div className='inputsWraper p-3 d-flex justify-content-around flex-wrap'>

                                <div className='inputWrap col-lg-5 col-11 mb-2 position-relative'>
                                    <label className='col-auto d-block' htmlFor="displayName" >שם:</label>
                                    <input className='input col-12 ' {...register("displayName")} type='text'></input>
                                    <InfoOverlay msg={"השם בו תופיעו באתר"} _id={"userName-pop-over"} />
                                    <p className='text-danger'>{errors.firstName?.message}</p>

                                </div>


                                <div className='inputWrap col-lg-5 col-11 mb-2 position-relative'>
                                    <label className='col-12 d-block' htmlFor="userName" >שם משתמש:</label>
                                    <input className='input col-12' {...register("userName")} type='text'></input>
                                    <InfoOverlay msg={"שם משתמש ייחודי מורכב מ-ABC וספרות בלבד"} _id={"userName-pop-over"} />
                                    <p className='text-danger'>{errors.userName?.message}</p>
                                </div>


                                <div className='inputWrap col-lg-5 col-11 mb-2  mb-2 position-relative'>
                                    <label className='col-auto d-block' htmlFor="email" >כתובת מייל:</label>
                                    <input className='input col-12' {...register("email")} type='email' ></input>
                                    <p className='text-danger'>{errors.email?.message}</p>

                                </div>

                                <div className='inputWrap col-lg-5 col-11 mb-2  mx-lg-0 mb-2 position-relative'>
                                    <label className='col-auto d-block' htmlFor="password" >סיסמא:</label>
                                    <input className='input col-12' {...register("password")} type='text' ></input>
                                    <p className='text-danger'>{errors.password?.message}</p>

                                </div>

                            </div>

                            <div className='text-center '><input type='submit' value={"הרשמה"} /></div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
