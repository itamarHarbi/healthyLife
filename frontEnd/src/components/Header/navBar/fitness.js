import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Fitness() {
    return (
        <NavDropdown className='' title="כושר" id="navbarScrollingDropdown">
            <NavDropdown.Item href="#cosher" className=''>
                מתקני ומגרשי ספורט ע''פ מיקום
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#homeFit" className=''>
                תרגילים מהבית
            </NavDropdown.Item>
        </NavDropdown>
    )
}