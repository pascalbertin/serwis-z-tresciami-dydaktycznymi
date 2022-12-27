import React, { useState, useEffect }  from 'react';
import '../../styles/AllCourses.css';
import axios from '../../config/axios'
import { Link } from 'react-router-dom';


const AllCourses = () => {

  var subParametr = window.location.search;
  var sub = subParametr.substring(9);  

  const [values, setValues] = useState([])

  const madeObjects = (data) => {
    data.forEach(course => {
      // const objectCourse = JSON.parse(course);
      console.log(course);
    });
  }

  const submitForm = async () => {
    const response = await axios.get('/api/courses?subject='+sub,
      {
        headers: { 
          'Accept': 'application',
          'Content-Type': 'application/json'},
      });
      console.log('Success:', response?.data);
      setValues(response?.data); 
  }
  
  useEffect(() => {
    submitForm()
    madeObjects(values);
  }, [])
  
  return (
    <div className='all-courses-container'>
      <div className='sub-title-text'>{sub}</div>
      <div className='objects-of-course'>
        <div className='column'>
          {values?.length ? (
            <ul >
              {values.map((value, i) => 
              <li key={i}>
                <Link to={`/course/?title=${value.title}`} style={{ textDecoration: 'none' }}>
                  <div className='course-object-title'>{value?.title}</div>
                </Link>
                <div className='course-object-subject'>Kategoria: {value?.subject}</div>
                <div className='course-object-price'>Cena: {value?.price} zł</div>
                <hr />
              </li>)}              
            </ul>
          ) : <p className='empty-courses'>
              {process.env.REACT_APP_SUBJECT_NO_COURSES}
              <p className='empty-courses-bottom-text'>Spróbuj później</p>
            </p>
        }
        </div>
      </div>
    </div>
    
  );
}

export default AllCourses;