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
  const [values, setValues] = useState({})
  const [avatar, setAvatar] = useState(null)
  const username = localStorage.getItem('username')
  const token = localStorage.getItem('accessToken')

  const uploadAvatar = async (avatar) => {
    const formData = new FormData();
    formData.append("file", avatar);

    const response = await axios.post('/api/avatarUpload', formData);
    console.log('Success:', response?.data);
  }

  async function submitForm(isValid, values, avatar){
    if (isValid){
      setValues(values);
      setAvatar(avatar);
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
            else if(err.response?.status === 401) setError('Błąd autoryzacji')
            else setError('Błąd logowania')
        }
        setIsSubmitted(true);
        setValues(values);
        uploadAvatar(avatar);
    }else{
      setIsSubmitted(false);
      setValues({});
      setAvatar(null);
    }  
  }
  return (
    <div>
        {!isSubmitted ? <EditUserDataForm submitForm={submitForm} /> : <EditUserDataResponse values={values} />}
    </div>
  )
}

export default EditUserData;
