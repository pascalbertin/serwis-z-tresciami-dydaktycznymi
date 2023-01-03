import React from 'react'

const UseCodeResponse = ({msg}) => {
  const idParam = window.location.search;
  const id = idParam.substring(7);

  const url = "/course?id="+id

  return (
    <div className="form-container">
      {msg ? <h1>{msg}</h1> : <h1>{process.env.REACT_APP_SERVER_CONN_ERROR}</h1>}
      <br />
      <div><a href={url}>Powróć do kursu</a></div>
    </div>
  )
}

export default UseCodeResponse;