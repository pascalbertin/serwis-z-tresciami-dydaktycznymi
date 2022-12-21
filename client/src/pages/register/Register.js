import React, {useState} from 'react'
import axios from '../../config/axios'
import RegisterForm from '../../components/register/RegisterForm'
import RegisterResponse from '../../components/register/RegisterResponse'

const Register = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [values, setValues] = useState({})
  const [msg, setMsg] = useState('')
  const [success, setIsSuccess] = useState(false);

  async function submitForm(isValid, values){
    if (isValid){
      setValues(values)
      try{
        const response = await axios.post("/register", JSON.stringify(values),
        {
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json'},
        })
        if (response?.status === 201)
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
    }
    else{
      setIsSubmitted(false);
      setValues({});
    }  
  }
  return (
    <div>
        {!isSubmitted ? <RegisterForm submitForm={submitForm} /> : <RegisterResponse msg={msg} success={success} />}
    </div>
  )
}

export default Register;
