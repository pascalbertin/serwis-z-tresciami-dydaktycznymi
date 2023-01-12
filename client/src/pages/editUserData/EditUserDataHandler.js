import { useState, useEffect } from 'react';
import EditUserDataValidator from '../../validators/EditUserData'

const EditUserDataHandler = callback => {
    const [values, setValues] = useState({
        password: "",
        avatar: "",
        bank_account: ""
        // passwordRepeat: ''
    })
    const [isPositive, setIsPositive] = useState(false)
    const [avatar, setAvatar] = useState(null)
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

        setErrors(EditUserDataValidator(values))
        setIsPositive(true)
    }

    useEffect(() => {
        if(Object.keys(errors).length === 0 && isPositive) {
            callback(true, values, avatar)
            setIsPositive(false)
        }
    })

    return {updateHandler, values, submitHandler, errors, avatarHandler, avatar }
}

export default EditUserDataHandler;