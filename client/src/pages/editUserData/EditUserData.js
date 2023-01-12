import React, {useState} from 'react'
import axios from '../../config/axios'
import EditUserDataForm from './EditUserDataForm'
import { API } from '../../config/api'
import EditUserDataResponse from './EditUserDataResponse'
import {useNavigate, useLocation} from 'react-router-dom'

const EditUserData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const username = localStorage.getItem('username')
  const token = localStorage.getItem('accessToken')

  const uploadAvatar = async (avatar) => {
    const formData = new FormData();
    formData.append("file", avatar);

    const response = await axios.post('/api/avatarUpload', formData);
  }

  async function submitForm(isValid, values, avatar){
    if (isValid){
      try{
        const response = await axios.patch(API.user + '/' + username, JSON.stringify(values),
        {
          headers: {Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'},
          withCredentials: true
        })
        if(response?.status === 200){
          setTimeout(navigate('/profile', {state: { from: location}, replace: true}), 100)
          navigate(0)
          setError('Dane zmieniono poprawnie!')
        }
      }catch (err)
        {
            if(!err?.response) setError('Błąd połączenia')
            else if(err.response?.status === 400) setError('Hasło jest wymagane!')
            else if(err.response?.status === 401 || err.response?.status === 403) setError('Błąd autoryzacji')
            else setError('Nieznany błąd')
        }
        setIsSubmitted(true);
        uploadAvatar(avatar);
    }else{
      setIsSubmitted(false);
    }  
  }
  return (
    <div>
        {!isSubmitted ? <EditUserDataForm submitForm={submitForm} /> : <EditUserDataResponse msg={error} />}
    </div>
  )
}

export default EditUserData;
