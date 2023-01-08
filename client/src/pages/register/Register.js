import React, {useState} from 'react'
import axios from '../../config/axios'
import RegisterForm from '../../components/register/RegisterForm'
import RegisterResponse from '../../components/register/RegisterResponse'
import { API } from '../../config/api'

const Register = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [values, setValues] = useState({})
  const [msg, setMsg] = useState('')
  const [success, setIsSuccess] = useState(false);
  const [avatar, setAvatar] = useState(null)

  const uploadAvatar = async (avatar) => {
    const formData = new FormData();
    formData.append("file", avatar);

    const response = await axios.post('/api/avatarUpload', formData);
    console.log('Success:', response?.data);
  }

  async function submitForm(isValid, values, avatar){
    if (isValid){
      setValues(values)
      setAvatar(avatar)
      try{
        const response = await axios.post(API.user, JSON.stringify(values),
        {
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json'},
        })
        if (response?.status === 200)
        {
          setMsg(process.env.REACT_APP_REGISTER_SUCCESS)
          setIsSuccess(true)
        }
      } catch (err)
      {
          if(!err?.response) setMsg(process.env.REACT_APP_SERVER_CONN_ERROR)
          else if(err.response?.status === 400) setMsg(process.env.REACT_APP_USER_LOGIN_DATA_REQUIRED)
          else if(err.response?.status === 409) setMsg(process.env.REACT_APP_REGISTER_ALREADY_EXISTS)
          else setMsg(process.env.REACT_APP_REGISTER_GENERAL_ERROR)
      }
      setIsSubmitted(true);
      setValues(values);
      uploadAvatar(avatar);
    }
    else{
      setIsSubmitted(false);
      setValues({});
      setAvatar(null);
    }  
  }
  return (
    <div>
        {!isSubmitted ? <RegisterForm submitForm={submitForm} /> : <RegisterResponse msg={msg} success={success} />}
    </div>
  )
}

export default Register;
