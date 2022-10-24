import React from 'react'
import LoginHandler from './LoginHandler'
import LoginValidator from '../../validators/Login'
import '../../styles/Form.css'

const LoginForm = ({submitForm}) => {
  
  const {updateHandler, values, submitHandler, errors} = LoginHandler(submitForm, LoginValidator);

  return (
        <div className="form-container">
            <form className="form" method="post" onSubmit={submitHandler}>
                <h1>Zaloguj się</h1>
                <div className="form-container-inputs">
                    <label htmlFor="username" className="form-label"></label>
                    <input id="username" type="text" name="username" className="form-input" placeholder="Login" value={values.username} onChange={updateHandler}/>
                    {errors.username && <p>{errors.username}</p>}
                </div>

                <div className="form-container-inputs">
                    <label htmlFor="email" className="form-label"></label>
                    <input id="email" type="text" name="email" className="form-input" placeholder="E-mail" value={values.email} onChange={updateHandler}/>
                    {errors.email && <p>{errors.email}</p>}
                </div>

                <div className="form-container-inputs">
                    <label htmlFor="password" className="form-label"></label>
                    <input id="password" type="password" name="password" className="form-input" placeholder="Hasło" value={values.password} onChange={updateHandler}/>
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <button className="form-button" type="submit">Zaloguj się</button>
            </form>
        </div>
  );
}

export default LoginForm;