import React from 'react'
import "./profileImage.css"
export default function ProfileImage({ children, className, _onClick, alt, img }) {
    return (
        <div aria-label={alt} onClick={_onClick} className={`userImageWrap mx-auto  position-relative rounded-circle  ${className}`}>
            <img className=' rounded-circle overflow-hidden' src={img } />
            {children}
        </div>
    )
}
