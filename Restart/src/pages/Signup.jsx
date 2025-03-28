import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Signup() {

    const [signupInfo, setSignInfo] = useState({
        name:'',
        email:'',
        password:''
    })

    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name, value } = e.target;
        const copySignInfo = {...signupInfo}
        copySignInfo[name] = value;
        setSignInfo(copySignInfo)
        }


        const handleSignup = async (e)=>{
            e.preventDefault();
            const {name , email,password} = signupInfo;
            if(!name || !email || !password){
                return handleError('All fields are required!')
            }
            try {
                const url = 'http://localhost:2003/auth/signup'
                const response = await fetch(url,{
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(signupInfo)

                })
                const result = await response.json()
                const {success,message, error} =result
                console.log(result);
                if(success){
                    handleSuccess(message);
                    setTimeout(() => {
                            navigate('/login')
                    }, 1000);
                }
                else if (error){
                    const details = error?.details[0].message;
                    handleError(details)
                }
                else if(!success){
                    handleError(message)
                }
            } catch (error) {
                handleError(error)
            }
        }

  return (
    <div className='flex flex-col  text-xl pt-33 items-center justify-center bg-'>
    <div className='flex flex-col  bg-white  rounded-3xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.35)] p-13  space'>
        <h1 className='text-3xl font-bold py-2'>Sign Up</h1>
        <form className='flex flex-col' onSubmit={handleSignup}>

            <div>
                <label htmlFor="name" className='py-[10px]'>Name</label>
                <input
                onChange={handleChange}
                type="text"
                name='name'
                autoFocus
                placeholder='Enter your name'
                className='flex focus:outline-none p-2 border-b-2'
                value={signupInfo.name}
                />
            </div>

            <div>
                <label htmlFor="email" className='pt-10'>E-mail</label>
                <input 
                onChange={handleChange}
                type="email"
                name='email'
                placeholder='Enter your email'
                className='flex focus:outline-none p-2 text-xl border-b-2'
                value={signupInfo.email}
                />
            </div>

            

            <div>
                <label htmlFor="password">Password</label>
                <input 
                onChange={handleChange}
                type="password"
                name='password'
                placeholder='Enter your password'
                className='flex focus:outline-none border-b-2 p-2'
                value={signupInfo.password}
                />
            </div>

            <button className='text-white text-2xl  rounded-full px-13 my-4 p-2 hover:bg-purple-800 bg-purple-700'>
                Signup
            </button>
            <span className='flex'>
                Already have an account? 
                <Link to= '/login' className=' underline text-purple-800  ' >Login</Link>
            </span>
        </form>

    </div>
    <ToastContainer/>
    </div>
  )
}

export default Signup