import React, {useState} from 'react'
import axios from '../../config/axios'
import EditUserDataForm from './EditUserDataForm'
import { API } from '../../config/api'
import EditUserDataResponse from './EditUserDataResponse'

const EditUserData = () => {
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
      // try{
        const response = await axios.patch(API.user + '/' + username, JSON.stringify(values),
        {
          headers: {Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'},
          withCredentials: true
        });
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
