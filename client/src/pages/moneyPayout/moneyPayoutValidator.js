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

    function isDouble(price) {
        let regex = /^\d+(.\d{2})?$/;
        console.log(regex.test(price))
        return regex.test(price);
      }

      function isDoubleComa(price) {
        console.log(price);
        let regex = /^.*[,].*$/;
        console.log(regex.test(price))
        return regex.test(price);
      }

    if( isDouble(parseFloat(values.moneyAmount)) == false ) {
        errors.moneyAmount = "Błędna cena"
    }
    else if( isDoubleComa(values.moneyAmount) == true ) {
        errors.moneyAmount = "Użyj kropki zmiast przecinka"
    }    


    return errors;
}