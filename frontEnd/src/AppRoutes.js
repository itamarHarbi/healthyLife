import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, createRoutesFromElements, useNavigate } from "react-router-dom";
import CreateMenu from './components/menus/createMenu/createMenu';
import MainHeader from './components/Header/mainHeader'
import MenuPage from './components/menus/menuPage/menuPage';
import ErrorComp from './components/error/error';
import SignUpMain from './components/newSignUp/SignUpMain';
import { IsSignedInContext } from './contexts';
import ProfilePage from './components/profilePage/profilePage';
import SearchPage from './components/searchPage/searchPage';
import Parent from './components/test/parent';
import HomePage from './components/homePageFolder/homePage'
import Footer from './components/footer/footer';
export default function AppRoutes() {
    // const navigate = useNavigate()

    const { isSignedIn, setIsSignedIn } = useContext(IsSignedInContext)


    return (<>
        <BrowserRouter >
            <Routes>
                <Route path='*' element={<MainHeader />} />
            </Routes>
            <Routes>
                <Route path='/signUp' element={<SignUpMain />} />


                <Route path='/menus/createMenu' element={isSignedIn ? <CreateMenu /> : <SignUpMain />} />
                {/* <Route path='/menus/createMenu' element={<CreateMenu />} /> */}


                {/* {
                    isSignedIn ?
                        <Route path='/menus/createMenu' element={<CreateMenu />} />
                        :
                        <Route path='/menus/createMenu' element={<SignUpMain />} />
                } */}
                <Route path='/menus/post' element={<MenuPage />} />
                <Route path='/search' element={<SearchPage />} />
                {/* <Route path='/test' element={<Footer/>} /> */}
                <Route path='/' element={<HomePage />} />
                <Route path='/:userName' element={<ProfilePage />} />
                <Route path='*' element={<ErrorComp />} />
            </Routes>
            <Routes>
                <Route path='*' element={<Footer />} />
            </Routes>
        </BrowserRouter>
    </>
    )
}
