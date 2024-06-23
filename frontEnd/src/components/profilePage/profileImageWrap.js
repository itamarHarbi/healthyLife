import React, { useContext, useEffect, useState } from 'react'
import ProfileImage from './profileImage'
import ChangeProfilePic from './changeProfilePic'
import { ProfilePageContext } from '../../contexts'

export default function ProfileImageWrap() {
 const [update,setUpdate] = useState(true);
  const [show, setShow] = useState("d-none")
  const showHide = () => {
    show == "d-none" ?
      setShow("d-flex")
      :
      setShow("d-none")

  }
  const { data } = useContext(ProfilePageContext)

  useEffect(() => 
    { 

    }, [data])

  show=="d-flex" ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset"
  return (
    <>
      {
        data.auther ?
          <ProfileImage alt={"EditProfilePicture"} _onClick={showHide} img={data.profileImage} className={"profileImage auther"} />
          :
          <ProfileImage alt={"profileImage"} img={data.profileImage} className={"profileImage noAuther "} />
      }
      {show && <ChangeProfilePic close={{showHide,update,setUpdate}} className={show} />}
    </>
  )
}
