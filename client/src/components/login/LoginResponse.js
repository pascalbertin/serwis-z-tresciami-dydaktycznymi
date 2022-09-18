import React from 'react'

const LoginResponse = ({msg}) => {
  const url = "/login"
  return (
    <div className="form-container">
      {msg ? <h1>{msg}</h1> : <h1>Błąd logowania</h1>}
      <div><a href={url}>Powróć do logowania</a></div>
    </div>
  )
}

export default LoginResponse;