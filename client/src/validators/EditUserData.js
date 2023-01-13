export default function EditUserDataValidator(values){
    let errors = {};

    if(values.bank_account.length !== 26 && values.bank_account.length !== 0){
        errors.bank_account = "Numer konta musi mieć 26 znaków"
    }

    if(!values.password){
        errors.password = "Pole nie może być puste"
    }else
     if (values.password.length < 8){
        errors.password = "Słabe hasło"
    }

    if(!values.passwordRepeat){
        errors.passwordRepeat = "Pole nie może być puste"
    }
    else if (values.passwordRepeat !== values.password) {
        errors.passwordRepeat = 'Hasła nie zgadzają się';
    }

    return errors;
}