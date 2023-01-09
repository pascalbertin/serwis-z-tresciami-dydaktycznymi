const ResetPasswordResponse = ({msg, success}) => {
    const url = "/profile"
  
    return (
      <div className="form-container">
      {/* {msg ? <h1>{msg}</h1> : <h1>{process.env.REACT_APP_REGISTER_GENERAL_ERROR}</h1>} */}
      {success ? <div>JEDNORAZOWE HASŁO ZOSTAŁO WYSŁANE NA PODANY ADRES E-MAIL</div> : <div></div>}
      </div>
    )
  }
  
  export default ResetPasswordResponse;