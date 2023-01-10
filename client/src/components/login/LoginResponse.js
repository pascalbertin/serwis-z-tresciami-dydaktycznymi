import Loading from '../loading/Loading'
import ErrorHandler from '../errorhandler/ErrorHandler'

const LoginResponse = ({msg}) => {
  return (
    msg ? <div><ErrorHandler msg={msg} hrefUrl='/login' hrefMsg='Powrót do logowania' /></div> : <Loading />
  )
}

export default LoginResponse;