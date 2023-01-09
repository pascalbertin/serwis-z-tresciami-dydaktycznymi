import React, {useState} from 'react'
import axios from '../../config/axios'
import { API } from '../../config/api'
import ResetPasswordForm from '../../components/resetPassword/ResetPasswordForm'
import ResetPasswordResponse from '../../components/resetPassword/ResetPasswordResponse'

const ResetPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [values, setValues] = useState({})
  const [msg, setMsg] = useState('')
  const [success, setIsSuccess] = useState(false);


  async function submitForm(isValid, values){
    if (isValid){
      setValues(values)
        const response = await axios.patch(API.user, JSON.stringify(values),
        {
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json'},
        })
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
        {!isSubmitted ? <ResetPasswordForm submitForm={submitForm} /> : <ResetPasswordResponse msg={msg} success={success} />}
    </div>
  )
}

export default ResetPassword;
