import { useState, useEffect } from 'react';
import FormValidator from './FormValidator'

const FormHandler = callback => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        passwordRepeat: ''
    })
    const [isChecked, setIsChecked] = useState(false);
    const [isPositive, setIsPositive] = useState(false);

    const checkHandler = () => {
        setIsChecked(current => !current);
    };

    const [errors, setErrors] = useState({})

    const updateHandler = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = event => {
        event.preventDefault();

        setErrors(FormValidator(values, isChecked))
        setIsPositive(true)
    }

    useEffect(() => {
        if(Object.keys(errors).length === 0 && isPositive) {
            callback(true, values)
        }
    })

    return {updateHandler, values, submitHandler, errors, isChecked, checkHandler}
}

export default FormHandler;

