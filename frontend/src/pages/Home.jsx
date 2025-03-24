import React from 'react'

import { useSelector } from 'react-redux';
import Navbar from '../layouts/Navbar';
import Products from '../features/products/components/Products';



const Home = () => {
    const user = useSelector((state)=>state.auth.user);
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
<Products/>
    </>
  )
}

export default Home