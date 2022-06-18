import React from 'react'
//import FormHandler from './FormHandler'
//import FormValidator from '../../validators/FormValidator'
import '../registerForm/Form.css'

const FormSignup = () => {
  
  //const {updateHandler, values, submitHandler, errors, isChecked, checkHandler} = FormHandler(submitForm, FormValidator);

  return (
    <div className="form-container">
        <form className="form">
            <h1>Zaloguj się</h1>
            <div className="form-container-inputs">
                <label htmlFor="username" className="form-label"></label>
                <input id="username" type="text" name="username" className="form-input" placeholder="Login"/>
            </div>

            <div className="form-container-inputs">
                <label htmlFor="email" className="form-label"></label>
                <input id="email" type="email" name="email" className="form-input" placeholder="E-mail" />
                
            </div>

            <div className="form-container-inputs">
                <label htmlFor="password" className="form-label"></label>
                <input id="password" type="password" name="password" className="form-input" placeholder="Hasło"/>
            </div>

            <button className="form-button" type="submit">Zaloguj się</button>
        </form>
    </div>
  );
}

export default FormSignup