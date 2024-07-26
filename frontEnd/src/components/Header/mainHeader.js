import { React, useContext, useEffect } from 'react'
import '../../style/header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from './loginF/login';
import SignedUser from './navBar/signedUser';
import { IsSignedInContext } from '../../contexts';
import { ApiUrl, apiMethod } from '../../services/apiServices';
import SearchMenus from '../menus/searchMenus/searchMenus';



export default function MainHeader() {
  const { isSignedIn, setIsSignedIn } = useContext(IsSignedInContext)


  const validateUser = async () => {
    try {
      const token = localStorage.getItem("Healthy-Token")
      if (token && token !== "undefined") {
        const valid = await apiMethod(
          `${ApiUrl}/users/auth`,
          "GET",
          {}
        )
        console.log(valid);
        if (!isSignedIn) setIsSignedIn(true)
        console.log("pass");
        return true
      }
      localStorage.removeItem("Healthy-Token")
      setIsSignedIn(false)
    }
    catch (err) {
      setIsSignedIn(false)
      console.log(err);
    }
  }


  return (
    <>
      <Navbar bg="light" expand="lg" className='mainHeader bg-white    px-3 py-1' sticky='top'>
        <Container className='justify-content-between align-items-center'>
          <Navbar.Brand href="/" className='order-3 order-lg-0'><img className='logo' alt='site-logo' src='https://drive.google.com/thumbnail?id=1AI5bITecmGAdtnXfOFL8dwDtMpQtknxd&sz=w100' /> </Navbar.Brand>
           <Nav className='order-2'>
           <SearchMenus/>
           </Nav>
          <Nav className='order-lg-3 order-1  '>
            {isSignedIn
              ?
              <SignedUser />
              :
              <Login />

            }
          </Nav>
        
        </Container>
      </Navbar>

    </>
  )
}