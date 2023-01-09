import React, {useState} from 'react'
import axios from '../../config/axios'
import { API } from '../../config/api'
import ResetPasswordForm from '../../components/resetPassword/ResetPasswordForm'
import ResetPasswordResponse from '../../components/resetPassword/ResetPasswordResponse'
import {useNavigate, useLocation} from 'react-router-dom'

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [values, setValues] = useState({})
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [success, setIsSuccess] = useState(false);


  async function submitForm(isValid, values){
    if (isValid){
      setValues(values)
      try{
        const response = await axios.patch(API.user, JSON.stringify(values),
        {
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json'},
        })
      if (response?.status === 200){
          setTimeout(navigate('/profile', {state: { from: location}, replace: true}), 1000)
          navigate(0)
          setError('Poprawnie zresetowano hasło!')
      }
    } catch (err){
        if(!err?.response) setError('Błąd połączenia')
        else if(err.response?.status === 400) setError('Email jest wymagany!')
        else if(err.response?.status === 401) setError('Błąd autoryzacji')
        else setError('Błąd logowania')
  }
  setIsSubmitted(true);
  setValues(values);
  }else{
      setIsSubmitted(false);
      setValues({});
    }  
  }
  return (
    <div>
        {!isSubmitted ? <ResetPasswordForm submitForm={submitForm} /> : <ResetPasswordResponse/>}
    </div>
  )
}

export default ResetPassword;
