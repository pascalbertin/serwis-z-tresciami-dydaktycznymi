import Loading from "../loading/Loading";
import ErrorHandler from '../../components/errorhandler/ErrorHandler';

const EditCourseResponse = ({isThumbnailLoaded, isVideoLoaded, error}) => {
  return (
    isThumbnailLoaded && isVideoLoaded ?
      <ErrorHandler msg={error} /> : <Loading msg="Ładowanie plików. Nie opuszczaj strony"/>
  )
}

export default EditCourseResponse;