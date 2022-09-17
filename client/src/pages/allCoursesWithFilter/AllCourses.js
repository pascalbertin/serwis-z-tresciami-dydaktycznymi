import React, { useState, useEffect }  from 'react';
import './AllCourses.css';
import science from '../../assets/images/science1.jpg';
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

  const submitForm = () => {
    fetch("https://serwis-z-tresciami.herokuapp.com/api/course/manageCourseBySubject?subject="+sub, {method: "GET", headers: {
        'Accept': 'application',
        'Content-Type': 'application'
    }})
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        setValues(data); 
    })  
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
                <Link to={`/course?id=${value._id}`} style={{ textDecoration: 'none' }}>
                  <div className='course-object-title'>{value?.title}</div>
                </Link>
                <div className='course-object-subject'>Kategoria: {value?.subject}</div>
                <div className='course-object-price'>Cena: {value?.price} zł</div>
                <hr />
              </li>)}              
            </ul>
          ) : <p className='empty-courses'>
              BRAK KURSÓW Z TEGO PRZEDMIOTU
              <p className='empty-courses-bottom-text'>Spróbuj później</p>
            </p>
        }
        </div>
      </div>
    </div>
    
  );
}

export default AllCourses;