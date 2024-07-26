import { click } from '@testing-library/user-event/dist/click'
import React, { useState } from 'react'
import "./style/searchInput.css"
import { set } from 'react-hook-form'

export default function SearchInput({ onChange }) {
    const [focused, setFocused] = useState(false)

    const checkFocus = (e) => {
        console.log(e);
        setFocused(true)
    }
    const loger = () => {
        setTimeout(
            () => { console.log("dddddddd") }
            , 200)
    }
    const ds = <div>
        dsasd
    </div>

    return (
        <div tabIndex={1} className='search-box' >
            <input onFocus={checkFocus} onBlur={() => { setFocused(false) }} />
            {
                focused &&
                <div onClick={loger}
                >fsdfdfsdF</div>
            }

            {/* {focused &&
                <div onClick={() => { setFocused(false) }} className='input-is-focused position-absolute top-0 start-0 bg-danger h-100 w-100 '></div>
            } */}
        </div>
    )
}
