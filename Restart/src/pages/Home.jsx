import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Box from '../components/Box'
import Text from '../components/Text'
import { Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleSuccess } from '../utils'

export default function Home() {


  const [loggedInUser, setLoggedInUser]= useState('')
  const navigate = useNavigate()
  
  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, []
)


 const handleLogout = (e)=>{
  localStorage.removeItem('loggedInUser')
  localStorage.removeItem('token')
  handleSuccess("User Logged Out")
  setTimeout(() => {
  navigate('/login')
  }, 1000);
}
  return (
    <div>
     <Navbar handleLogout={handleLogout} />
    <div>
      <h1 className='p-2 my-4 bg-white rounded-2xl w-1/3 text-3xl'>Welcome, {loggedInUser}</h1>
    </div>
    <Box/>
    <Text/>
    <ToastContainer/>
    </div>
)
}


