import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../../config/axios'
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
            setMsg('Wylogowano pomyślnie!')
    
            const response = await axios.get('/logout')
            console.log(response.status)
            navigate('/', {state: { from: location}, replace: true})
            navigate(0)
        }
        else{
            setMsg('Nie jesteś zalogowany!')
        }
    }

    useEffect(() => {
        handleLogout()
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
