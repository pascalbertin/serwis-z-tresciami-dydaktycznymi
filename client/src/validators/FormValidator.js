export default function FormValidator(values, check){
    let errors = {};

    if(!values.username.trim()){
        errors.username = "Pole nie może być puste"
    }

    if(!values.email.trim()){
        errors.email = "Pole nie może być puste"
    }
    else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email = "Nieprawidłowy adres e-mail"
    }

    if(!values.password){
        errors.password = "Pole nie może być puste"
    }
    else if (values.password.length < 8){
        errors.password = "Słabe hasło"
    }

    if(!values.passwordRepeat){
        errors.passwordRepeat = "Pole nie może być puste"
    }
    else if (values.passwordRepeat !== values.password) {
        errors.passwordRepeat = 'Hasła nie zgadzają się';
    }

    if(!check){
        errors.rules = "Pole musi być zaznaczone"
    }

    return errors;
}