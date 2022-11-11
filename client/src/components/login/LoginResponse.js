import React from 'react'

const LoginResponse = ({msg}) => {
  const url = "/login"
  return (
    <div className="form-container">
      {msg ? <h1>{msg}</h1> : <h1>{process.env.REACT_APP_LOGIN_GENERAL_ERROR}</h1>}
      <div><a href={url}>Powrót do logowania</a></div>
    </div>
  )
}

export default LoginResponse;