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

    const videoHandler = event => {
        const generateUuid = crypto.randomUUID();
        let tempVideo = event.target.files[0];

        const blob = tempVideo.slice(0, tempVideo.size, "video/mkv");
        const newFile = new File([blob], `${generateUuid}_VIDEO_post.mkv`, { type: "video/mkv" });
        setVideo(newFile)
        console.log(newFile)
    }

    const thumbnailHandler = event => {
        const generateUuid = crypto.randomUUID();
        let tempThumbnail = event.target.files[0];

        const blob = tempThumbnail.slice(0, tempThumbnail.size, "image/jpeg");
        const newFile = new File([blob], `${generateUuid}_post.jpeg`, { type: "image/jpeg" });
        setThumbnail(newFile)
        console.log(newFile)
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

