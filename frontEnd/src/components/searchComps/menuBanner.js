import React from 'react'
import "./menuBannerStyle.css"
import SelectedItem from '../menus/createMenu/selectedItem'
import { useNavigate } from 'react-router-dom'
import Editmenu from './editmenu'

export default function MenuBanner(props) {
    const navigate = useNavigate()
    const data = props.data
    const user = props.data.userData
    return (
        <div className='menuBanner border border-black col-lg-8 mx-auto rounded mt-2 shadow'>
            { props.auther &&
                <Editmenu _id={data._id}/>
            }
            <div className='banner-head d-flex justify-content-between pt-4  p-2' >
                <div className='banHeadRight d-flex align-items-center '>
                    <div className='profilePicWrap me-1 '>
                        <img src={user.profileImage}></img>
                    </div>
                    <span>
                        <a href={`/${user.userName}`}>
                            <h4 className='d-inline p-0 m-0 align-self-center'>{user.displayName}</h4>
                            <div dir='ltr' className='userNameCon text-start'>@{user.userName}</div>
                        </a>
                    </span>

                </div>
                <div className='createDateWrap d-flex align-items-end'>
                    <p className='p-0 m-0'>{new Date(data.date_created).toLocaleString("he-GB", { day: 'numeric', month: 'numeric', year: 'numeric' })}</p>
                </div>
            </div>

            <div className='descripWrap p-2'>
                <h3 className='text-center mb-3'>{data.name}</h3>
                <p className=''>
                    {data.menuDescription}
                </p>
            </div>
            <div>
                {
                    props.data && <ul>{
                        props.data.products.map((item, i) => {
                            return <SelectedItem key={i} obj={item} noX={true} bullet={true} />
                        })}
                    </ul>
                }
                <div className='text-end p-2'>
                    <a className='link' onClick={() => { navigate("/menus/post?id=" + data._id) }}>המשך קריאה...</a>
                </div>
            </div>
        </div>

    )
}
