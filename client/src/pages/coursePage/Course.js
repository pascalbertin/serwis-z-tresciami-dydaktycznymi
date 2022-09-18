import React,  { useState, useEffect } from 'react';
import './Course.css';
import science from '../../assets/images/science1.jpg';
import { Link } from 'react-router-dom';

function Course(){

  var idParam = window.location.search;
  var id = idParam.substring(4);

  const [value, setValues] = useState([])
  
  const submitForm = () => {
  fetch("https://serwis-z-tresciami.herokuapp.com/api/course/manageCourseById?id="+id, {method: "GET", headers: {
      'Accept': 'application',
      'Content-Type': 'application'
  }})
  .then(response => response.json())
  .then(data => {
      //console.log('Success:', data);
      setValues(data); 
      localStorage.clear();
      localStorage.setItem('title', data.title);
      localStorage.setItem('subject', data.subject);
      localStorage.setItem('info', data.description);
      localStorage.setItem('url', data.video);
  })  
}

  useEffect(() => {
    submitForm()
  }, [])


  return (
    <div className='course-info'>
      <div className='container'>
        <div className='left-column'>
          <img className='course-image' src={science}></img>
        </div>
        <div className='right-column'>
          <div className='description'>
            <h1 className='main-course-text'>{value.title}</h1>
            <h2 className='bottom-course-text'>Kategoria: {value.subject}</h2>
            <p className='course-text'>{value.description}</p>
          </div>
          <div className='row first-row'>
            <h3 className='main-course-text'>Cena kursu: {value.price} zł</h3>
            <Link to={`/payment_method`}>
              <button className="form-button" type="submit">Kup kurs</button>
            </Link>
          </div>
          <h2 className='bottom-course-code-text'>Wpisz kod, aby uzyskać dostęp do kursu </h2>
          <div className='row second-row'>
            <form className='activate-code' method="post">
              <input className='form-input' placeholder="Kod dostępu" />
              <Link to={`/video?id=${id}`}>
                <button className='form-button' type="submit">
                  Aktywuj 
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;