import React, { useEffect } from "react";
import axios from '../../config/axios';
import {useNavigate, useLocation} from 'react-router-dom';

// import useAxios from '../../hooks/useAxios'
// import useAuth from '../../hooks/useAuth'

const DeleteCourse = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const idParam = window.location.search;
    const id = idParam.substring(4);

    useEffect(() => {
       
       const deleteCourse = async () => {
           try {
                const response = await axios.delete('/api/course/manageCourseById',{
                   headers: { 
                        'Content-Type': 'application/json'},
                        data: {
                            id: id
                        }
                   });
                navigate(0);
                navigate('/profile', {state: { from: location}, replace: true})
           } catch (err) {
               console.log(err);
           }
       }

       deleteCourse();
    }, [])

    return (
        <div>
        </div>
    )
}   

export default DeleteCourse;