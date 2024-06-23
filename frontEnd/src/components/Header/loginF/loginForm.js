import { React, useContext, useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { useForm } from "react-hook-form";
import { ApiUrl, apiMethod, KEY_TOKEN } from '../../../services/apiServices';
import './login.css'
import { ActiveContext } from './context'
import { Button } from 'react-bootstrap';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { IsSignedInContext } from '../../../contexts';



export default function LoginForm({scroll}) {

    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const { isSignedIn, setIsSignedIn } = useContext(IsSignedInContext)

    const onSubmit = async (_data) => {
        const url = ApiUrl + "/users/signIn";
        try {
            const response = await apiMethod(url, "POST", _data);
            // console.log(data);
            console.log(response.data);
            localStorage.setItem(KEY_TOKEN, response.data);
            scroll(false)
            setIsSignedIn(true)
        } catch (error) {
            console.log(error);
            toast.error("מייל או סיסמא אינם נכונים");
            setValue("password", "");
        }
    };


    const { use, changeView } = useContext(ActiveContext)

    return (
        <div className={'login_big_window  '} onClick={(e) => {
            if (e.currentTarget != e.target) return;
            changeView(false)
        }}>
            <div className='login_small_window p-2 bg-light rounded-3 p-3 d-flex'>
                {/* <h1>{{sas}}</h1> */}
                <CloseButton onClick={() => {
                    changeView(false)
                }} />
                <form onSubmit={handleSubmit(onSubmit)} className="col-md-6 mx-auto my-auto " >

                    <label>אימייל:</label>
                    <input {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} className="form-control " type="email" />
                    {errors.email && <div className="text-danger">*שדה חובה</div>}

                    <label>סיסמא:</label>
                    <input {...register("password", { required: true })} className="form-control " type="password" />
                    {errors.password && <div className="text-danger">*שדה חובה</div>}

                    <div className='text-center'>
                        <Button type='submit' className=' submit_btn mt-3 m-auto'>כניסה</Button>
                    </div>
                    <div className="mt-3">
                    <p className="mb-0  text-center">
                        עדיין לא רשומים?{" "}
                        <a href={"/signUp"} className="text-primary fw-bold">
                            הירשמו עכשיו
                        </a>
                    </p>
                </div>
                </form>
           
            </div>
            <ToastContainer />
        </div>
    )
}
