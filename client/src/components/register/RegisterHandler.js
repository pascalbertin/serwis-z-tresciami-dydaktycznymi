import { useState, useEffect } from 'react';
import RegisterValidator from '../../validators/Register'

const RegisterHandler = callback => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
        avatar: ''
    })
    const [isChecked, setIsChecked] = useState(false);
    const [isPositive, setIsPositive] = useState(false);
    const [avatar, setAvatar] = useState(null);

    const checkHandler = () => {
        setIsChecked(current => !current);
    };

    const getFileExtension = (fileName) => {
        const splitVideoName = fileName.name.split('.')
        return splitVideoName[splitVideoName.length-1]
    }

    const [errors, setErrors] = useState({})

    const updateHandler = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const avatarHandler = event => {
        const generateUuid = crypto.randomUUID();
        const tempAvatar = event.target.files[0];
        
        const extension = getFileExtension(tempAvatar)

        const blob = tempAvatar.slice(0, tempAvatar.size, "image/" + extension);
        const newFile = new File([blob], `${generateUuid}_AVATAR.${extension}`, { type: "image/" + extension });
        setAvatar(newFile)
        setValues({...values, avatar: 'https://storage.googleapis.com/tutorsalpha-user-avatar/' + newFile.name})
    }

    const submitHandler = event => {
        event.preventDefault();

        setErrors(RegisterValidator(values, isChecked))
        setIsPositive(true)
    }

    useEffect(() => {
        if(Object.keys(errors).length === 0 && isPositive) {
            callback(true, values, avatar)
            setIsPositive(false)
        }
    })

    return {updateHandler, avatarHandler, values, submitHandler, errors, isChecked, checkHandler, avatar}
}

export default RegisterHandler;

