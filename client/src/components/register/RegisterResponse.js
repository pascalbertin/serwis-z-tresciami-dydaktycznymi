import Loading from '../loading/Loading'
import ErrorHandler from '../errorhandler/ErrorHandler'

const RegisterResponse = ({msg, success, isAvatarLoaded}) => {
  return (
    isAvatarLoaded ? (success ? <div><ErrorHandler msg={msg} hrefUrl='/register' hrefMsg='Powrót do rejestracji' /></div> : <div><ErrorHandler msg={msg} hrefUrl='/login' hrefMsg='Zaloguj się' /></div>) : <Loading msg={"Ładowanie plików. Nie opuszczaj strony"}/>
  )
}

export default RegisterResponse;