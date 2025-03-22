import React from 'react'
import './LandingPage.css'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='relative font-sans bg-black'>
    <main className="showcase h-[100vh] bg-cover bg-center">
      <div className='absolute inset-0 bg-black bg-opacity-80'></div>
        <header className="header relative z-20 w-[60%] ml-[40%] flex justify-between p-5">
        <span className="text-6xl font-semibold text-center uppercase leading-[100%] relative mix-blend-difference  text-userHover">FlixHub</span>
            <Link to={'/login'} id="sign-up-btn" className='btn-sign bg-red-800 border-none outline-none p-2 font-bold text-white rounded-[30px] cursor-pointer hover:opacity-80 font-serif h-10 group-hover:bg-[#07a6f1]  px-7 py-2 transition-all duration-1000 hover:shadow-[0_0_5px_#07a6f1,0_0_25px_#07a6f1,0_0_50px_#07a6f1,0_0_100px_#07a6f1] hover:border-0 '>SIGN IN</Link>
        </header>
       
        <div className="main-contnet relative z-20 flex flex-col justify-center items-center h-[70vh]">
            <h1 className='text-white text-5xl font-serif'>See what's next</h1>
            <p className='text-white text-[2.6rem]  items-center font-serif pb-10'>Watch anywhere. Cancel anytime</p>
            <button className='bg-red-800  outline-none border-none flex items-center justify-center cursor-pointer px-10 rounded-[30px]  pb-0'>
               <a href="/sign-up"> <button className='uppercase text-[2rem] text-white font-fantasy group-hover:bg-[#07a6f1]  px-4 py-2 transition-all duration-1000'>watch free for 30 days</button></a>
              
            </button>
        </div>
       
    </main>
    </div>
  )
}

export default LandingPage