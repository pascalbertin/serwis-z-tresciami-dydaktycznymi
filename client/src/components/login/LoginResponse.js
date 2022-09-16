import React from 'react'

const LoginResponse = ({msg}) => {
  return (
    <div className="form-container">
      {msg ? <h1>{msg}</h1> : <h1>Błąd logowania</h1>}
    </div>
  )
}

export default LoginResponse;