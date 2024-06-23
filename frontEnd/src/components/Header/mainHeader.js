import { React, useContext, useEffect } from 'react'
import '../../style/header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Calculators from './navBar/calculators';
import Tips from './navBar/tips';
import Fitness from './navBar/fitness';
import Login from './loginF/login';
import SignedUser from './navBar/signedUser';
import { IsSignedInContext } from '../../contexts';
import { ValidateUser } from '../../services/authentication';
import { ApiUrl, apiMethod } from '../../services/apiServices';



export default function MainHeader() {
  const { isSignedIn, setIsSignedIn } = useContext(IsSignedInContext)


  const validateUser = async () => {
    // const { isSignedIn, setIsSignedIn } = useContext(IsSignedInContext)
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


  // useEffect(() => { validateUser() }, [])


  return (
    <>
      <Navbar bg="light" expand="lg" className='mainHeader bg-white    px-3 py-1' sticky='top'>
        <Container className='justify-content-between align-items-center'>
          <Navbar.Brand href="/" className='order-1 order-lg-0'><img className='logo' alt='site-logo' src='https://drive.google.com/thumbnail?id=1AI5bITecmGAdtnXfOFL8dwDtMpQtknxd&sz=w100' /> </Navbar.Brand>
          <Nav className='order-lg-3  '>
            {isSignedIn
              ?
              <SignedUser />
              :
              <Login />

            }
          </Nav>
          {/* <Navbar.Toggle className='order-2' aria-controls="navbarScroll" />


          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>

            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-lg`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>

            </Offcanvas.Body>
          </Navbar.Offcanvas> */}





          {/* <Navbar.Collapse className='order-3 order-lg-2 ' id="navbarScroll">
            <Nav className="my-2 my-lg-0  p-3 "   >
              <Calculators />
              <Tips />
              <Fitness />
            </Nav>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>

    </>
  )
}