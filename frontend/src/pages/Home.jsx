import React from 'react'

import Navbar from '../layouts/navbar';
import { useSelector } from 'react-redux';



const Home = () => {
    const user = useSelector((state)=>state.auth.user);
  return (
    <>
      <Navbar/>
    <div className='tw:text-center'>
    <h2>Welcome to Home</h2>
    {user ? (
      <div>
        <p>Logged in as: {user.email}</p>
        
      </div>
    ) : (
      <p>You are not logged in.</p>
    )}

  </div>
  
    </>
  )
}

export default Home