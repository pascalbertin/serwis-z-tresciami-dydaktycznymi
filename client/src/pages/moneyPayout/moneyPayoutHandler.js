import { useState, useEffect } from 'react';
import MoneyPayoutValidator from './moneyPayoutValidator';

const MoneyPayoutHandler = callback => {
    const [values, setValues] = useState({
        moneyAmount: ''
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

        setErrors(MoneyPayoutValidator(values))
        setIsPositive(true)
    }
    useEffect(() => {
        if(Object.keys(errors).length === 0 && isPositive) {
            callback(true, values)
            setIsPositive(false)
        }
    })
    return {updateHandler, values, submitHandler, errors}
}

export default MoneyPayoutHandler;