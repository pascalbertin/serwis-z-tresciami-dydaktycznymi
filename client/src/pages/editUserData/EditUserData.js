import React, {useState} from 'react'
import axios from '../../config/axios'
import EditUserDataForm from './EditUserDataForm'
import { API } from '../../config/api'
import EditUserDataResponse from './EditUserDataResponse'
import ErrorHandler from '../../components/errorhandler/ErrorHandler'

const EditUserData = () => {
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false)
  const username = localStorage.getItem('username')
  const token = localStorage.getItem('accessToken')

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
        const response = await axios.patch(API.user + '/' + username, JSON.stringify(values),
        {
          headers: {Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'},
          withCredentials: true
        })
        if(response?.status === 200){
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
        if(avatar !== null) uploadAvatar(avatar);
        else setIsAvatarLoaded(true)
    }else{
      setIsSubmitted(false);
    }  
  }
  return (
    <div>
        {username !== null && token !== null ? !isSubmitted ? <EditUserDataForm submitForm={submitForm} /> : <EditUserDataResponse isAvatarLoaded={isAvatarLoaded} msg={error} /> : <ErrorHandler msg={process.env.REACT_APP_FORBIDDEN}/>}
    </div>
  )
}

export default EditUserData;
