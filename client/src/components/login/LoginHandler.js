import { useState, useEffect } from 'react';
import LoginValidator from '../../validators/LoginValidator'

const LoginHandler = callback => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
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

        setErrors(LoginValidator(values))
        setIsPositive(true)
    }

    useEffect(() => {
        if(Object.keys(errors).length === 0 && isPositive) {
            callback(true, values)
        }
    })

    return {updateHandler, values, submitHandler, errors}
}

export default LoginHandler;

