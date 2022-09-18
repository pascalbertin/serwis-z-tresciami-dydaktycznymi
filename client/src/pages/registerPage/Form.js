import React, {useState} from 'react'
import axios from '../../config/axios'
import FormSignup from '../../components/registerForm/FormSignup'
import FormPositive from '../../components/registerForm/FormPositive'

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [values, setValues] = useState({})
  const [error, setError] = useState('')
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
          setError('Zarejestrowano nowe konto!')
          setIsSuccess(true)
        }
      } catch (err)
      {
          if(!err?.response){
            setError('Błąd połączenia')
          }
          else if(err.response?.status === 400)
          {
            setError('Login, email i hasło są wymagane!')
          }
          else if(err.response?.status === 409)
          {
            setError('Użytkownik o takich danych już istnieje!')
          }
          else{
            setError('Błąd rejestracji')
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
        {!isSubmitted ? <FormSignup submitForm={submitForm} /> : <FormPositive msg={error} success={success} />}
    </div>
  )
}

export default Form;
