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
    const [files, setFiles] = useState({
        video: File,
        thumbnail: File
    })
    const [isPositive, setIsPositive] = useState(false);

    const [errors, setErrors] = useState({})

    const updateHandler = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const fileHandler = event => {
        setFiles({
            ...files,
            [event.target.name]: event.target.files[0],
        })
    }

    const submitHandler = event => {
        event.preventDefault();

        setErrors(AddCourseValidator(values))
        setIsPositive(true)
    }

    useEffect(() => {
        if(Object.keys(errors).length === 0 && isPositive) {
            callback(true, values, files)
        }
    })

    return {updateHandler, fileHandler, values, submitHandler, errors, files}
}

export default AddCourseHandler;

