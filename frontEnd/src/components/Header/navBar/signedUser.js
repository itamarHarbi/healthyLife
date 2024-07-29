import React, { useContext, useEffect, useState } from 'react'
import '../../../style/signIn.css'
import { apiGet } from '../../../services/apiServices';
import { IsSignedInContext } from '../../../contexts';

export default function SignedUser() {
  const {  setIsSignedIn } = useContext(IsSignedInContext)
  const [userData, setUserData] = useState(null)
  function menuToggle() {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.toggle("active");
  }

  const logOut = async (e) => {
    e.preventDefault()
    try {
      localStorage.removeItem("Healthy-Token")
      setIsSignedIn(false)
    }
    catch (err) {
      console.log(err);
    }
  }

  const getUserData = async () => {
    try {
      const data = await apiGet("users/userData")
      // console.log(data);
      setUserData(data)
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getUserData()
  }, [])


  return (
    <div className="action signedDiv">
      <div className="profile shadow bg-transparent" onClick={menuToggle}>
        <img src={userData?.profileImage} alt='profile_image' />
      </div>
      <div className="menu  shadow">
        <div  id='headerUserDropDown'>
          <div className='userInfo text-center p-4'>
            <h3 className='p-0 '>{userData?.displayName} </h3>
            <p dir='ltr'>@{userData?.userName}</p>

          </div>
          <ul>
            <li>
              <i className="fa fa-user pe-1" aria-hidden="true"></i><a href={`/${userData?.userName}`}>הפרופיל שלי</a>
            </li>
            <li>
              <i className="fa fa-lg fa-pencil-square-o pe-1" aria-hidden="true"></i> <a href="/menus/createmenu">יצירת מתכון</a>
            </li>
            <li >
              <i className="fa fa-sign-out pe-1" aria-hidden="true" ></i><a href='/#' onClick={logOut}>התנתקות</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
