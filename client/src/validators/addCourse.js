export default function AddCourseValidator(values){
    let errors = {};

    if(!values.title.trim()){
        errors.title = "Pole nie może być puste"
    }

    if(!values.description.trim()){
        errors.description = "Pole nie może być puste"
    }
    
    if(!values.price.trim()){
        errors.price = "Pole nie może być puste"
    } 
    if (parseInt(values.price) > 250) {
        errors.price = "Cena nie może być większa niż 250zł"
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

    if( isDouble(parseFloat(values.price)) == false ) {
        errors.price = "Błędna cena"
    }

    else if( isDoubleComa(values.price) == true ) {
        errors.price = "Użyj kropki zmiast przecinka"
    }    

    if(!values.subject){
        errors.subject = "Wybierz kategorię"
    }

    if(!values.level){
        errors.level = "Wybierz stopień trudności"
    }
    
    if(!values.video){
        errors.video = "Plik wideo jest wymagany"
    }

    if(!values.thumbnail){
        errors.thumbnail = "Miniaturka jest wymagana"
    }

    return errors;
}