import React, { useState } from 'react';
import AddCourseForm from '../../components/addCourse/addCourseForm'
import AddCoursePositive from '../../components/addCourse/addCoursePositive'

const AddCourse = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [values, setValues] = useState({})

  function submitForm(isValid, values){
    if (isValid){
      setIsSubmitted(true);
      setValues(values);
      fetch("https://serwis-z-tresciami.herokuapp.com/api/course/addCourse", {method: "POST",headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, body: JSON.stringify(values)})
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
     
    }else{
      setIsSubmitted(false);
      setValues({});
    }
      
  }
  return (
    <div>
        {!isSubmitted ? <AddCourseForm submitForm={submitForm} /> : <AddCoursePositive values={values} />}
    </div>
  )
}

export default AddCourse;
