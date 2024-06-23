import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from "react-router-dom";
// import OffcanvasExample from './components/navBarFolder/navbar';
import CreateMenu from './components/menus/createMenu/createMenu';
import MainHeader from './components/Header/mainHeader'
import MenuPage from './components/menus/menuPage/menuPage';
import { AuthToken, ValidateUser } from './services/authentication';
import ErrorComp from './components/error/error';
import SignUpMain from './components/newSignUp/SignUpMain';
import { IsSignedInContext } from './contexts';
import HomePage from './components/homePage/homePage';
import { Outlet, use } from "react-router-dom";
import ProfilePage from './components/profilePage/profilePage';
export default function AppRoutes() {

    const { isSignedIn, setIsSignedIn } = useContext(IsSignedInContext)



    return (<>
        <BrowserRouter >
            <Routes>
                <Route path='*' element={<MainHeader />} />
            </Routes>
            <Routes>
                <Route path='/signUp' element={<SignUpMain />} />
                {isSignedIn && <Route path='/menus/createMenu' element={<CreateMenu />} />}
                <Route path='/menus/post' element={<MenuPage />} />
                <Route path='/' element={<HomePage />} />
                <Route path='/:userName' element={<ProfilePage />} />
                <Route path='*' element={<ErrorComp />} />

            </Routes>
        </BrowserRouter>
    </>
    )
}
