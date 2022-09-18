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
      const response = await axios.patch('/api/course/manageCourseById',{
        headers: { 
             'Content-Type': 'application/json'},
             data: {
                "id": "632666b79bbd15888a28d00b",
                "title":"sdksskksk",
              "description":"sossdodso",
              "price":"1212","author":"uzytkownik",
              "subject":"Matematyka",
              "level":"1",
              "video":"https://drive.google.com/file/d/1MI_dOiSHHcws3nB8JStZmaEccj5M1qw3/view?usp=sharing",
              "thumnail":"https://drive.google.com/file/d/1MI_dOiSHHcws3nB8JStZmaEccj5M1qw3/view?usp=sharing"
             }
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