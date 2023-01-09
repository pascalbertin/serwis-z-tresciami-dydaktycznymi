const ResetPasswordResponse = () => {
    const url = "/profile"
  
    return (
      <div>
      <div className="form-container">
        <div>JEDNORAZOWE HASŁO ZOSTAŁO WYSŁANE NA PODANY ADRES E-MAIL</div>
      </div>
        <div className="row">
          <p className="form-forgot-password"> <a href='/login'>Zaloguj się</a></p>
        </div>
      </div>
    )
  }
  
  export default ResetPasswordResponse;