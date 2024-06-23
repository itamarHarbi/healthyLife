import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Calculators() {
  return (
    <NavDropdown className='' title="מחשבונים" id="navbarScrollingDropdown">
    <NavDropdown.Item href="#action3" className='text-start'>
      מחשבון קלוריות
      </NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item href="#action4" className='text-start'>
      מחשבון גובה/משקל
    </NavDropdown.Item>
  </NavDropdown>
  )
}
