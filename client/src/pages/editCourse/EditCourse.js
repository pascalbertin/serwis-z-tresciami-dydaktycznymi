import React, { useState } from 'react';
import EditCourseForm from '../../components/editCourse/editCourseForm'
import EditCourseResponse from '../../components/editCourse/editCourseResponse'
import axios from '../../config/axios'
import { API } from '../../config/api'

const EditCourse = () => {
  const idParam = window.location.search;
  const id = idParam.substring(7);

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [values, setValues] = useState({})

  async function submitForm(isValid, values){
    if (isValid){
      setIsSubmitted(true);
      setValues(values);
      const response = await axios.patch(API.course + '/' + id, {...values},
      {
        headers: { 
             'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
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