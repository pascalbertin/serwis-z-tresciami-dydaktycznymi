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

  const uploadThumbnail = async (thumbnail) => {
    const formData = new FormData();
    formData.append("file", thumbnail);

    const response = await axios.post('/api/fileUploadThumbnail', formData);
    console.log('Success:', response?.data);
  }

  const uploadVideo = async (video) => {
    const formData = new FormData();
    formData.append("file", video);

    const response = await axios.post('/api/fileUploadVideo', formData);
    console.log('Success:', response?.data);
  }

  const addCourse = async (formValues) => {
    console.log(formValues)
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
      uploadThumbnail(thumbnail);
      uploadVideo(video);
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