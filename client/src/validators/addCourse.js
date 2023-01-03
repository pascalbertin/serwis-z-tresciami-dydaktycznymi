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

    if(!values.subject){
        errors.subject = "Wybierz kategorię"
    }

    if(!values.level){
        errors.level = "Wybierz stopień trudności"
    }

    return errors;
}