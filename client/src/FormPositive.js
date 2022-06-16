import React from 'react'
import Form from './Form'
import FormHandler from './FormHandler'
import FormSignup from './FormSignup'



const FormPositive = ({values}) => {
console.log(values)
  return (
    <div className="form-container">
      <h1>
        {/* {values.username}</h1>
        <h1>{values.email}</h1>
        <h1>{values.password}</h1>
        <h1>{values.passwordRepeat} */
        }
        Zarejestrowano Pomyslnie
      </h1>
    </div>
  )
}

export default FormPositive