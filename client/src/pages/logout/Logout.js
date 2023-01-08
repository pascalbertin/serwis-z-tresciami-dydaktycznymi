import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../../config/axios'
import { API } from '../../config/api'
import { useNavigate, useLocation } from "react-router-dom"

const Logout = () => {
    const isLoggedIn = localStorage.getItem('accessToken')
    const [msg, setMsg] = useState('')
    const navigate = useNavigate();
    const location = useLocation();

    async function handleLogout(){
        if(isLoggedIn){
            localStorage.removeItem('accessToken')
            localStorage.removeItem('roles')
            localStorage.removeItem('username')
            setMsg(process.env.REACT_APP_LOGOUT_SUCCESS)
    
            const response = await axios.get(API.user + '/logout')
            console.log(response.status)
            navigate('/', {state: { from: location}, replace: true})
            navigate(0)
        }
        else{
            setMsg(process.env.REACT_APP_USER_NOT_LOGGED_IN)
        }
    }

    useEffect(() => {
        handleLogout();
        window.setTimeout(function(){
            window.location.href = "/";
        }, 100);
    }, [])


  return (
    <div>
        <div className="form-container">
            <h1>{msg}</h1>
        </div>
    </div>
  )
}

export default Logout
