export default function LoginValidator(values){
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

    return errors;
}