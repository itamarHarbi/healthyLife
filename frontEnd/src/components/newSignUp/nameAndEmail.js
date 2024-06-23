import React from 'react'
import { useFormContext } from 'react-hook-form'

export default function NameAndEmail() {
    const { register } = useFormContext();
    return (
        <div className='inputsWraper mx-auto my-auto p-3 border rounded border-black '>
            <div className='inputWrap'>
                <label className='' htmlFor="Email" >כתובת מייל:</label>
                <input className='input' {...register("Email").required} required={true} type='email'></input>
            </div>

            <div className='inputWrap'>
                <label className='' htmlFor="Password" >סיסמא:</label>
                <input className='input' {...register("Password").required} required={true} type='password' ></input>
            </div>

        </div>
    )
}
