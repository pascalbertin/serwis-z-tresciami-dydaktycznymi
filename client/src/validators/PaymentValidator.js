export default function PaymentValidator(values){
    let errors = {};

    if(!values.email.trim()){
        errors.email = "Pole nie może być puste"
    }
    else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email = "Nieprawidłowy adres e-mail"
    }

    return errors;
}