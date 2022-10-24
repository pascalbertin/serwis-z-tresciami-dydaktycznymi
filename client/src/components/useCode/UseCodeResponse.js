import React from 'react'

const UseCodeResponse = ({msg}) => {
  const idParam = window.location.search;
  const id = idParam.substring(4);

  const url = "/course?id="+id

  return (
    <div className="form-container">
      {msg ? <h1>{msg}</h1> : <h1>Wystąpił nieznany błąd. Spróbuj ponownie później.</h1>}
      <br />
      <div><a href={url}>Powróć do kursu</a></div>
    </div>
  )
}

export default UseCodeResponse;