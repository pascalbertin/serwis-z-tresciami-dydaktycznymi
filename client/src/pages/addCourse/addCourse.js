import React, { useState } from 'react';
import AddCourseForm from '../../components/addCourse/addCourseForm'
import AddCourseResponse from '../../components/addCourse/addCourseResponse'
import axios from '../../config/axios'
import { API } from '../../config/api';

const AddCourse = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [values, setValues] = useState({})
  const [video, setVideo] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post('/api/fileUpload', formData);
    console.log('Success:', response?.data);
  }

  const addCourse = async (formValues) => {
    const response = await axios.post(API.course, {...formValues},
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          'Accept': 'application',
          'Content-Type': 'application/json'},
      });
      console.log('Success:', response?.data);
      setValues(response?.data); 
  }

  const submitForm = async (isValid, values, video, thumbnail) => {
    if (isValid){
      setIsSubmitted(true);
      setValues(values);
      setVideo(video);
      setThumbnail(thumbnail)

      //calling endpoints
      uploadFile(video);
      uploadFile(thumbnail);
      addCourse(values);
    }else{
      setIsSubmitted(false);
      setValues({});
      setVideo(null);
      setThumbnail(null);
    }
      
  }
  return (
    <div>
      <div>
          {!isSubmitted ? <AddCourseForm submitForm={submitForm} /> : <AddCourseResponse values={values} />}
      </div>
    </div>
  )
}

export default AddCourse;
