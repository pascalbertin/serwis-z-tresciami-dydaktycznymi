import React, { useState } from 'react';
import EditCourseForm from '../../components/editCourse/editCourseForm'
import EditCourseResponse from '../../components/editCourse/editCourseResponse'
import axios from '../../config/axios'

const EditCourse = () => {
  const idParam = window.location.search;
  const id = idParam.substring(4);

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [values, setValues] = useState({})

  async function submitForm(isValid, values){
    if (isValid){
      setIsSubmitted(true);
      setValues(values);
      const response = await axios.patch('/api/course/manageCourseById',
      {id: id, ...values},
      {
        headers: { 
             'Content-Type': 'application/json'},
        });
     
    }else{
      setIsSubmitted(false);
      setValues({});
    }
      
  }
  return (
    <div>
        {!isSubmitted ? <EditCourseForm submitForm={submitForm} /> : <EditCourseResponse values={values} />}
    </div>
  )
}

export default EditCourse;