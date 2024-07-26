import React, { useEffect } from 'react'
import "./homePage.css"
import { useNavigate } from 'react-router-dom'
export default function HomePage() {
    const nav = useNavigate()



    return (
        <main className='homePageMain'>
            <div className='container-fluid bg-light  '>
                <div className='container bg-white p-0'>
                    <div className='welcomePoster d-flex align-items-center justify-content-center'>
                        <div className='text-center'>
                            <h1 className='mb-4'>Healthy Life</h1>
                            <h3 className='mb-4'>אוכלים בריא, חיים בריא</h3>
                            <div className='h5' >אתר ליצירת מתכונים עם ערכים תזונתיים לכל המוצרים</div>
                        </div>
                        <div className='buttonsContainer'>
                            <button onClick={()=>{nav("/menus/createMenu")}} className='btn btn-light'>צרו מתכון עכשיו!</button>
                        </div>
                    </div>
                        <div className='mt-5 d-block d-lg-flex justify-content-around text-center'>


                            <div className='box'>
                                <div className='i-wrap mx-auto'>
                                    <i className="bi bi-pencil-square"></i>
                                </div>
                                יוצרים מתכון
                            </div>
                            <div className='box'>
                                <div className='i-wrap mx-auto'>
                                    <i className="bi bi-calculator"></i>
                                </div>
                                מחשבים קלוריות
                            </div>
                            <div className='box'>
                                <div className='i-wrap mx-auto '>
                                    <i className="bi bi-heart-fill"></i>
                                </div>
                                חיים בריא 
                            </div>



                        </div>
                </div>

            </div>

        </main>
    )
}

