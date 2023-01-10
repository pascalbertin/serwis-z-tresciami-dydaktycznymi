import { useEffect, useState } from "react";
import axios from '../../config/axios';
import {useNavigate, useLocation} from 'react-router-dom';
import { API } from '../../config/api'
import ErrorHandler from '../../components/errorhandler/ErrorHandler'
import Loading from "../../components/loading/Loading";

const DeleteCourse = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const idParam = window.location.search;
    const id = idParam.substring(7);

    const [error, setError] = useState('')

    useEffect(() => {
       
       const deleteCourse = async () => {
           try {
                const response = await axios.delete(API.course + '/' + id, {
                   headers: { 
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                        'Content-Type': 'application/json'},
                   withCredentials: true
                   });
                navigate('/profile', {state: { from: location}, replace: true})
                navigate(0);
                if(response.status === 200 || response.status === 304) setError(process.env.REACT_APP_COURSE_DELETE_SUCCESS)
           } 
           catch(err){
                if(!err?.response) setError(process.env.REACT_APP_SERVER_CONN_ERROR)
                else if(err.response?.status === 404) setError(process.env.REACT_APP_COURSE_ALREADY_DELETED)
           }
       }
       deleteCourse();
    }, [])

    return (
        error ? <ErrorHandler msg={error}/> : <Loading />
    )
}   

export default DeleteCourse;