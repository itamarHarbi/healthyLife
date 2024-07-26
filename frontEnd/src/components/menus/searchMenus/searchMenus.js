import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiGet } from '../../../services/apiServices';
import SearchBox from '../../searchBox/searchBox';

export default function SearchMenus() {
    const searchRef = useRef()
    const navigate = useNavigate();
    const onSelect = (code) => {
        navigate(`/menus/post?id=${code}`)
        console.log("clicked")
    }

    const searching = async (str) => {
        const newStr = str.trim().replaceAll(" ", "+")
        if (newStr.length > 2) {

            try {
                const data = await apiGet(
                    `menus/search?q=${newStr}`
                )
                console.log(data);
                if (data.length < 1) return []

                const results = await data.map(res => {
                    return {
                        content: <div onClick={() => { onSelect(res._id) }}>  {res.name}</div>,
                        value: res.name
                    }
                })
                return results

            } catch (error) {
                return []
            }
        }

        return []
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const q = searchRef.current.input.value
        console.log(q);
        navigate(`/search?q=${q}`)
        // onSelect()
    }

    console.log(searchRef.current);

    return (
        <form onSubmit={onSubmit}>
            <SearchBox
                ref={searchRef}
                asyncData={searching}
                placeholder='חיפוש מתכון...'
            />
        </form>
    )
}
