export default function MoneyPayoutValidator(values){
    let errors = {}
    const re = /^[0-9\b]+$/;

    if(!values.moneyAmount.trim()){
        errors.moneyAmount = "Pole nie może być puste";
    } else if(!/\d+$/.test(values.moneyAmount)){
        errors.moneyAmount = "Pole może zawierać tylko liczby";
    } else if(parseFloat(values.moneyAmount) < 10.00){
        errors.moneyAmount = "Za małą kwota! Wypłać więcej niż 10zł";
    }


    return errors;
}