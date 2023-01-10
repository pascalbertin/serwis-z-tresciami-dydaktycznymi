import React, { useState } from 'react';
import EditCourseForm from '../../components/editCourse/editCourseForm'
import EditCourseResponse from '../../components/editCourse/editCourseResponse'
import axios from '../../config/axios'
import { API } from '../../config/api'

const EditCourse = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isThumbnailLoaded, setIsThumbnailLoaded] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [error, setError] = useState('')

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

  const editCourse = async (formValues) => {
    try {
      const response = await axios.patch(API.course + '/' + localStorage.getItem('title'), {...formValues},
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            'Accept': 'application',
            'Content-Type': 'application/json'},
          withCredentials: true
        });
        if(response.status === 200 || response.status === 304) setError(process.env.REACT_APP_COURSE_EDIT_SUCCESS)
    }
    catch(err) {
      if(!err?.response) setError(process.env.REACT_APP_SERVER_CONN_ERROR)
      else if(err.response?.status === 401) setError(process.env.REACT_APP_UNAUTHORIZED)
      else if(err.response?.status === 403) setError(process.env.REACT_APP_FORBIDDEN)
      else if(err.response?.status === 404) setError(process.env.REACT_APP_COURSE_NOT_FOUND)
      else setError(process.env.REACT_APP_SERVER_CONN_ERROR)
    }
  }

  const submitForm = async (isValid, values, video, thumbnail) => {
    if (isValid){
      setIsSubmitted(true);

      //calling endpoints
      if(video == null && thumbnail != null) {
        uploadThumbnail(thumbnail);
        setIsVideoLoaded(true)
      }
      else if(thumbnail == null && video != null){
        uploadVideo(video)
        setIsThumbnailLoaded(true)
      }
      else{
        uploadThumbnail(thumbnail);
        uploadVideo(video);
      }
      editCourse(values);
    }else{
      setIsSubmitted(false);
    }
  }
  return (
    <div>
        {!isSubmitted ? <EditCourseForm submitForm={submitForm} /> : <EditCourseResponse error={error} isThumbnailLoaded={isThumbnailLoaded} isVideoLoaded={isVideoLoaded} />}
    </div>
  )
}

export default EditCourse;