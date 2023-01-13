import React, { useState} from 'react'
import axios from '../../config/axios'
import RegisterForm from '../../components/register/RegisterForm'
import RegisterResponse from '../../components/register/RegisterResponse'
import { API } from '../../config/api'
import ErrorHandler from '../../components/errorhandler/ErrorHandler'

const Register = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [success, setIsSuccess] = useState(false);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false)
  const accessToken = localStorage.getItem('accessToken')
  const username = localStorage.getItem('username')

  const uploadAvatar = async (avatar) => {
    const formData = new FormData();
    formData.append("file", avatar);

    try{
      await axios.post('/api/avatarUpload', formData);
      setIsAvatarLoaded(true)
    }
    catch(err){
      if(!err?.response) setError(process.env.REACT_APP_SERVER_CONN_ERROR)
      else setError(process.env.REACT_APP_FILE_ERROR)
      setIsAvatarLoaded(true)
    }
  }

  async function submitForm(isValid, values, avatar){
    if (isValid){
      try{
        const response = await axios.post(API.user, JSON.stringify(values),
        {
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json'},
        })
        if (response?.status === 200 || response?.status === 304)
        {
          setError(process.env.REACT_APP_REGISTER_SUCCESS)
          setIsSuccess(true)
        }
      } catch (err)
      {
          if(!err?.response) setError(process.env.REACT_APP_SERVER_CONN_ERROR)
          else if(err.response?.status === 400) setError(process.env.REACT_APP_USER_LOGIN_DATA_REQUIRED)
          else if(err.response?.status === 409) setError(process.env.REACT_APP_REGISTER_ALREADY_EXISTS)
          else setError(process.env.REACT_APP_REGISTER_GENERAL_ERROR)
      }
      setIsSubmitted(true);
      if(avatar != null) {
        uploadAvatar(avatar)
      }
      else setIsAvatarLoaded(true)
    }
    else{
      setIsSubmitted(false);
    }  
  }
  return (
    <div>
      {username == null && accessToken == null ? !isSubmitted ? <RegisterForm submitForm={submitForm} /> : <RegisterResponse msg={error} success={success} isAvatarLoaded={isAvatarLoaded} /> : <ErrorHandler msg={"Jesteś już zarejestrowany"} />}
    </div>
  )
}

export default Register;