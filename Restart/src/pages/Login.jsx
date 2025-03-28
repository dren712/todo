import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email:'',
        password:''
    })

    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name, value } = e.target;
        const copyLoginInfo = {...loginInfo}
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo)
        
        }


        const handleLogin = async (e)=>{
            e.preventDefault();
            const { email,password} = loginInfo;
            if( !email || !password){
                return handleError('All fields are required!')
            }
            try {
                const url = 'http://localhost:2003/auth/login'
                const response = await fetch(url,{
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(loginInfo)

                })
                const result = await response.json()
                const {message,success,jwtToken, name ,error} =result
                if(success){
                    console.log(message);
                    handleSuccess(message);
                    localStorage.setItem('token', jwtToken);
                    localStorage.setItem('loggedInUser', name);

                    setTimeout(() => {
                            navigate('/home')
                    }, 1000);
                }
                else if (error){
                    const details = error?.details[0].message;
                    handleError(details)
                }
                else if(!success){
                    handleError(message)
                }
                console.log(result);
            } catch (error) {
                handleError(error)
            }
        }
        

  return (
    <div className='flex flex-col  text-xl pt-33 items-center justify-center '>
    <div className='flex flex-col  bg-white  rounded-3xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.35)] p-13 '>
        <h1 className='text-3xl font-bold py-2'>Log in</h1>
        <form className='flex flex-col' onSubmit={handleLogin}>

            <div>
                <label htmlFor="email" className='pt-10'>E-mail</label>
                <input 
                onChange={handleChange}
                type="email"
                name='email'
                placeholder='Enter your email'
                className='flex focus:outline-none p-2 text-xl border-b-2'
                value={loginInfo.email}
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
                value={loginInfo.password}
                />
            </div>

            <button className='text-white text-2xl  rounded-full px-13 my-4 p-2 hover:bg-purple-800 bg-purple-700'>
                Login
            </button>
            <span className='flex'>
                Don't have an account? 
                <Link to= '/signup' className=' underline text-purple-800' >Signup</Link>
            </span>
        </form>
    </div>
    <ToastContainer/>
    </div>
  )
}

export default Login