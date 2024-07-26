import { React,useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import LoginForm from './loginForm';
import { ActiveContext } from './context'

export default function Login() {

    const [use, set] = useState(false)
    const changeView = (req) => {
        set(req)
        req
            ?
            document.body.style.overflow = "hidden"
            :
            document.body.style.overflow = "unset"
    }

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