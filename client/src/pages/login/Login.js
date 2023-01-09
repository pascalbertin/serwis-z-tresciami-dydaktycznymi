import React, {useState} from 'react'
import LoginForm from '../../components/login/LoginForm'
import LoginResponse from '../../components/login/LoginResponse'
import axios from '../../config/axios'
import {useNavigate, useLocation} from 'react-router-dom'
import { API } from '../../config/api'

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [values, setValues] = useState({})

  async function submitForm(isValid, values){
    if (isValid){
      setValues(values)
      try{
        const response = await axios.post(API.auth + '/login', JSON.stringify(values),
        {
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
          withCredentials: true
        })
        if (response?.status === 200)
        {
          localStorage.setItem('accessToken', response?.data?.accessToken)
          localStorage.setItem('username', values.username)
          localStorage.setItem('roles', response?.data?.roles)
          setTimeout(navigate('/profile', {state: { from: location}, replace: true}), 100)
          navigate(0)
          setError('Zalogowano poprawnie!')
        }

      } catch (err)
      {
          if(!err?.response) setError('Błąd połączenia')
          else if(err.response?.status === 400) setError('Login, email i hasło są wymagane!')
          else if(err.response?.status === 401) setError('Błąd autoryzacji')
          else setError('Błąd logowania')
      }
      setIsSubmitted(true);
      setValues(values);
    }
    else{
      setIsSubmitted(false);
      setValues({});
    }  
  }
  return (
    <div>
      {isSubmitted ? <LoginResponse msg={error}/> : <LoginForm submitForm={submitForm} />}
    </div>
  )
}

export default Login;
