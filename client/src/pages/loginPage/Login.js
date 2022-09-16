import React, {useState} from 'react'
import LoginForm from '../../components/login/LoginForm'
import LoginResponse from '../../components/login/LoginResponse'
import axios from 'axios'

const Login = () => {
  // const { auth, setAuth } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [values, setValues] = useState({})

  async function submitForm(isValid, values){
    if (isValid){
      setValues(values)
      try{
        const response = await axios.post("http://localhost:3001/user/login", JSON.stringify(values),
        {
          headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json'},
        })
        if (response?.status === 200)
        {
          console.log(response.data)
          setSuccess(true)
          setError('Zalogowano poprawnie!')
        }
        const accessToken = response?.data?.accessToken
        const roles = response?.data?.roles
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('roles', roles)
        localStorage.setItem('username', values.username)
        // setAuth(response?.data?.roles)
        //  console.log(JSON.stringify(auth))
      } catch (err)
      {
          if(!err?.response){
            setError('Błąd połączenia')
          }
          else if(err.response?.status === 400)
          {
            setError('Login, email i hasło są wymagane!')
          }
          else if(err.response?.status === 401)
          {
            setError('Błąd autoryzacji')
          }
          else{
            setError('Błąd logowania')
          }
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
