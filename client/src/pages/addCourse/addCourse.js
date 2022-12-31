import React, { useState } from 'react';
import AddCourseForm from '../../components/addCourse/addCourseForm'
import AddCourseResponse from '../../components/addCourse/addCourseResponse'
import AddFileForm from '../../components/addCourse/addFileForm'
import axios from '../../config/axios'
import { API } from '../../config/api';

const AddCourse = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [values, setValues] = useState({})
  const [files, setFiles] = useState({})

  const submitForm = async (isValid, values, files) => {
    if (isValid){
      setIsSubmitted(true);
      setValues(values);
      setFiles(files);
      const response = await axios.post(API.course, {...values, ...files},
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          'Accept': 'application',
          'Content-Type': 'application/json'},
      });
      console.log('Success:', response?.data);
      setValues(response?.data); 
     
    }else{
      setIsSubmitted(false);
      setValues({});
      setFiles({});
    }
      
  }
  return (
    <div>
      <div>
          {!isSubmitted ? <AddCourseForm submitForm={submitForm} /> : <AddCourseResponse values={values} />}
      </div>
      <div>
          <AddFileForm />
      </div>
    </div>
  )
}

export default AddCourse;
