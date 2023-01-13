import Loading from "../../components/loading/Loading";
import ErrorHandler from "../../components/errorhandler/ErrorHandler";

const EditUserDataResponse = ({msg, isAvatarLoaded}) => {
    return (
      isAvatarLoaded ?
      <ErrorHandler hrefMsg={'Powrót do profilu'} hrefUrl={'/profile'} msg={msg} /> : <Loading msg="Ładowanie plików. Nie opuszczaj strony"/>
    )
  }
  
  export default EditUserDataResponse;