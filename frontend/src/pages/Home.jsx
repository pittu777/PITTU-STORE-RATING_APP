import React from 'react'

import { useSelector } from 'react-redux';
import Navbar from '../layouts/Navbar';
import StoreList from '../features/productStore/components/StoreList';




const Home = () => {
    const user = useSelector((state)=>state.auth.user);
    console.log(user);
  return (
    <>
      <Navbar/>
    <div className='tw:text-center'>
    <h2>Welcome to Home <span className='tw:animate-pulse'>👋</span></h2>
    {user ? (
      <div>
        <p>Logged in as: {user.email}</p>
        
      </div>
    ) : (
      <p>You are not logged in.</p>
    )}

  </div>
  {user && user.role==="USER" && <StoreList/>}

    </>
  )
}

export default Home