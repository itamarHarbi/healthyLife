import { React, useContext, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import LoginForm from './loginForm';
import { ActiveContext } from './context'
import { AuthToken } from '../../../services/authentication';
import { IsSignedInContext } from '../../../contexts';

export default function Login() {
    const { isSignedIn, setIsSignedIn } = useContext(IsSignedInContext)

    // AuthToken()
    // const ta = async () => {
    //     await AuthToken()
    //     console.log(isSignedIn);
    // }

    const [use, set] = useState(false)
    const [bodyScroll, setBodyScroll] = useState(false)
    const changeView = (req) => {
        set(req)
        req
            ?
            document.body.style.overflow = "hidden"
            :
            document.body.style.overflow = "unset"
    }
    // ta()

    // console.log("Main:", _use);

    return (
        <ActiveContext.Provider value={{ changeView, use }}>

            <Nav.Link className='ms-auto' onClick={() => { changeView(true) }}>
                Login/SignUp
            </Nav.Link>
            {use ?
                <div><LoginForm scroll={changeView} /> </div>
                : null}

        </ActiveContext.Provider>
    )
}