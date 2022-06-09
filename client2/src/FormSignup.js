import React from 'react'
import FormHandler from './FormHandler'
import FormValidator from './FormValidator'
import './Form.css'

const FormSignup = ({submitForm}) => {
  
  const {updateHandler, values, submitHandler, errors, isChecked, checkHandler} = FormHandler(submitForm, FormValidator);

  return (
    <div className="form-container">
        <form className="form" onSubmit={submitHandler}>
            <h1>Zarejestruj się i nauczaj w NAZWA FIRMY</h1>
            <div className="form-container-inputs">
                <label htmlFor="username" className="form-label"></label>
                <input id="username" type="text" name="username" className="form-input" placeholder="Nazwa użytkownika" value={values.username} onChange={updateHandler}/>
                {errors.username && <p>{errors.username}</p>}
            </div>

            <div className="form-container-inputs">
                <label htmlFor="email" className="form-label"></label>
                <input id="email" type="email" name="email" className="form-input" placeholder="E-mail" value={values.email} onChange={updateHandler} />
                {errors.email && <p>{errors.email}</p>}
            </div>

            <div className="form-container-inputs">
                <label htmlFor="password" className="form-label"></label>
                <input id="password" type="password" name="password" className="form-input" placeholder="Hasło" value={values.password} onChange={updateHandler} />
                {errors.password && <p>{errors.password}</p>}
            </div>

            <div className="form-container-inputs">
                <label htmlFor="passwordRepeat" className="form-label"></label>
                <input id="passwordRepeat" type="password" name="passwordRepeat" className="form-input" placeholder="Powtórz hasło" value={values.passwordRepeat} onChange={updateHandler} />
                {errors.passwordRepeat && <p>{errors.passwordRepeat}</p>}
            </div>

            <div className="form-checkbox">
                <input id="rules" type="checkbox" name="rules" className="form-checkbox-input" value={isChecked} onChange={checkHandler} />
                <label htmlFor="rules" className="form-checkbox-label"><span>Rejestrując się akceptujesz Regulamin oraz Warunki korzystania z serwisu</span></label>
                {errors.rules && <p>{errors.rules}</p>}
            </div>

            <button className="form-button" type="submit">Zarejestruj się</button>
            <p className="form-already-login">Masz już konto? <a href='#'>Zaloguj się</a></p>
        </form>
    </div>
  );
}

export default FormSignup