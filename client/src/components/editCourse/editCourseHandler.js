import { useState, useEffect } from 'react';
import EditCourseValidator from '../../validators/editCourseValidator'

const EditCourseHandler = callback => {
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
    const [isPositive, setIsPositive] = useState(false);

    const [errors, setErrors] = useState({})

    const updateHandler = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = event => {
        event.preventDefault();

        setErrors(EditCourseValidator(values))
        setIsPositive(true)
    }

    useEffect(() => {
        if(Object.keys(errors).length === 0 && isPositive) {
            callback(true, values)
        }
    })

    return {updateHandler, values, submitHandler, errors}
}

export default EditCourseHandler;

