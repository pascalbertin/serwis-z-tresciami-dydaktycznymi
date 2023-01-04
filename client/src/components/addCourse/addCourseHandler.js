import { useState, useEffect } from 'react';
import AddCourseValidator from '../../validators/addCourse'

const AddCourseHandler = callback => {
    const [values, setValues] = useState({
        title: '',
        description: '',
        price: '',
        author: localStorage.getItem('username'),
        subject: '',
        level: '',
        video: '',
        thumbnail: ''
    })
    const [video, setVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [isPositive, setIsPositive] = useState(false);

    const [errors, setErrors] = useState({})

    const updateHandler = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const getFileExtension = (fileName) => {
        const splitVideoName = fileName.name.split('.')
        return splitVideoName[splitVideoName.length-1]
    }

    const videoHandler = event => {
        const generateUuid = crypto.randomUUID();
        const tempVideo = event.target.files[0];
        
        const extension = getFileExtension(tempVideo)

        const blob = tempVideo.slice(0, tempVideo.size, "video/" + extension);
        const newFile = new File([blob], `${generateUuid}_VIDEO.${extension}`, { type: "video/" + extension });
        setVideo(newFile)
        setValues({...values, video: 'https://storage.googleapis.com/tutors-alpha-videos/' + newFile.name})
    }

    const thumbnailHandler = event => {
        const generateUuid = crypto.randomUUID();
        const tempThumbnail = event.target.files[0];
        
        const extension = getFileExtension(tempThumbnail)

        const blob = tempThumbnail.slice(0, tempThumbnail.size, "image/" + extension);
        const newFile = new File([blob], `${generateUuid}_THUMBNAIL.${extension}`, { type: "image/" + extension });
        setThumbnail(newFile)
        setValues({...values, thumbnail: 'https://storage.googleapis.com/tutors-alpha-thumbnails/' + newFile.name})
    }

    const submitHandler = event => {
        event.preventDefault();

        setErrors(AddCourseValidator(values))
        setIsPositive(true)
    }

    useEffect(() => {
        if(Object.keys(errors).length === 0 && isPositive) {
            callback(true, values, video, thumbnail)
        }
    })

    return {updateHandler, videoHandler, thumbnailHandler, values, submitHandler, errors, video, thumbnail}
}

export default AddCourseHandler;

