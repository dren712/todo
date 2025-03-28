import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({setIsAuthed}) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')) {
            setIsAuthed(true);

            if(location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup'){
                navigate('/home', {replace: false});
            }
        }
    },
[location, navigate, setIsAuthed])
  return (
    null
  )
}

export default RefreshHandler