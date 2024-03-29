import React, {useState} from 'react'
import LoginForm from '../../components/login/LoginForm'
import LoginResponse from '../../components/login/LoginResponse'
import axios from '../../config/axios'
import {useNavigate, useLocation} from 'react-router-dom'
import { API } from '../../config/api'
import ErrorHandler from '../../components/errorhandler/ErrorHandler'

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const accessToken = localStorage.getItem('accessToken')
  const username = localStorage.getItem('username')

  async function submitForm(isValid, values){
    if (isValid){
      try{
        const response = await axios.post(API.auth + '/login', JSON.stringify(values),
        {
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
          withCredentials: true
        })
        localStorage.setItem('accessToken', response?.data?.accessToken)
        localStorage.setItem('username', values.username)
        localStorage.setItem('roles', response?.data?.roles)
        setTimeout(navigate('/profile', {state: { from: location}, replace: true}), 100)
        navigate(0)
        if(response.status === 200 || response.status === 304) setError(process.env.REACT_APP_LOGIN_SUCCESS)
        }

      catch (err){
        if(!err?.response) setError(process.env.REACT_APP_SERVER_CONN_ERROR)
        else if(err.response?.status === 400) setError(process.env.REACT_APP_REGISTER_DATA_REQUIRED)
        else if(err.response?.status === 401) setError(process.env.REACT_APP_UNAUTHORIZED)
        else if(err.response?.status === 204) setError(process.env.REACT_APP_EMAIL_NOT_VERIFIED)
        else setError(process.env.REACT_APP_LOGIN_GENERAL_ERROR)
      }

      setIsSubmitted(true);
    }
    else{
      setIsSubmitted(false);
    }  
  }
  return (
    <div>
      {username == null && accessToken == null ? isSubmitted ? <LoginResponse msg={error}/> : <LoginForm submitForm={submitForm} /> : <ErrorHandler msg={"Jesteś już zalogowany"}/>}
    </div>
  )
}

export default Login;
