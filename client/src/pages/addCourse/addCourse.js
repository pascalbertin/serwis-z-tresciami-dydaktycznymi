import React, { useState } from 'react';
import AddCourseForm from '../../components/addCourse/addCourseForm'
import AddCourseResponse from '../../components/addCourse/addCourseResponse'
import axios from '../../config/axios'
import { API } from '../../config/api';
import ErrorHandler from '../../components/errorhandler/ErrorHandler';

const AddCourse = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isThumbnailLoaded, setIsThumbnailLoaded] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [error, setError] = useState('')
  const accessToken = localStorage.getItem('accessToken')
  const username = localStorage.getItem('accessToken')

  const uploadThumbnail = async (thumbnail) => {
    const formData = new FormData();
    formData.append("file", thumbnail);

    try {
      await axios.post('/api/fileUploadThumbnail', formData);
      setIsThumbnailLoaded(true)
    }
    catch(err){
      if(!err?.response) setError(process.env.REACT_APP_SERVER_CONN_ERROR)
      else setError(process.env.REACT_APP_FILE_ERROR)
      setIsThumbnailLoaded(true)
    }
  }

  const uploadVideo = async (video) => {
    const formData = new FormData();
    formData.append("file", video);

    try{
      await axios.post('/api/fileUploadVideo', formData);
      setIsVideoLoaded(true)
    }
    catch(err){
      if(!err?.response) setError(process.env.REACT_APP_SERVER_CONN_ERROR)
      else setError(process.env.REACT_APP_FILE_ERROR)
      setIsVideoLoaded(true)
    }
  }

  const addCourse = async (formValues) => {
    try{
    const response = await axios.post(API.course, {...formValues},
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          'Accept': 'application',
          'Content-Type': 'application/json'},
        withCredentials: true
      });
      if(response.status === 200 || response.status === 304) setError(process.env.REACT_APP_COURSE_ADD_SUCCESS)
  }
  catch(err) {
    if(!err?.response) setError(process.env.REACT_APP_SERVER_CONN_ERROR)
    else if(err.response?.status === 400) setError(process.env.REACT_APP_COURSE_ADD_ERROR)
    else if(err.response?.status === 409) setError(process.env.REACT_APP_COURSE_ALREADY_EXISTS)
    else setError(process.env.REACT_APP_SERVER_CONN_ERROR)
  }
  }

  const submitForm = async (isValid, values, video, thumbnail) => {
    if (isValid){
      setIsSubmitted(true);

      //calling endpoints
      uploadThumbnail(thumbnail);
      uploadVideo(video);
      addCourse(values);
    }else{
      setIsSubmitted(false);
    }

  }
  return (
    <div>
        {username != null && accessToken != null ? !isSubmitted ? <AddCourseForm submitForm={submitForm} /> : <AddCourseResponse error={error} isVideoLoaded={isVideoLoaded} isThumbnailLoaded={isThumbnailLoaded}/> : <ErrorHandler msg={process.env.REACT_APP_FORBIDDEN}/>}
    </div>
  )
}

export default AddCourse;