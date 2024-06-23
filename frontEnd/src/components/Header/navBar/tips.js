import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Tips() {
    return (
        <NavDropdown className='' title="טיפים" id="navbarScrollingDropdown">
            <NavDropdown.Item href="#toAvoid" className=''>
                מוצרים שכדאי להמנע
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#bestDiet" className=''>
                דיאטה מנצחת
            </NavDropdown.Item>

            <NavDropdown.Item href="#action4" className=''>
                another...
            </NavDropdown.Item>
        </NavDropdown>
    )
}
