export default function EditUserDataValidator(values){
    let errors = {};

    // if(values.bank_account.length != 26){
    //     errors.bank_account = "Numer konta jest błędny"
    // }
    // else if(values.bankAccount.length > 26){
    //     errors.bankAccount = "Numer konta jest za długi"
    // }

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

    // if(!values.avatar){
    //     errors.thumbnail = "Awatar jest wymagana"
    // }

    return errors;
}