import React from 'react'
import Form from '../../pages/registerPage/Form'
import FormHandler from './FormHandler'
import FormSignup from './FormSignup'

const FormPositive = ({msg, success}) => {
  const url = "/register"
  const login = "/login"

  return (
    <div className="form-container">
    {msg ? <h1>{msg}</h1> : <h1>Błąd rejestracji</h1>}
    {success ? <div><a href={login}>Zaloguj się</a></div> : <div><a href={url}>Powróć do rejestracji</a></div>}
    </div>
  )
}

export default FormPositive