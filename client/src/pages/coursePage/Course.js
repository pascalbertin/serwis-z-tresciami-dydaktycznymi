import React,  { useState, useEffect } from 'react'
import './Course.css'
import science from '../../assets/images/science1.jpg';
// import useStyles from '../../styles';

const Course = () => {

  var idParam = window.location.search;
  var id = idParam.substring(4);

  //const [isSubmitted, setIsSubmitted] = useState(false)
  const [value, setValues] = useState([])

  const submitForm = () => {
  console.log("AAAAAAAAAAA");
  fetch("https://serwis-z-tresciami.herokuapp.com/api/course/manageCourseById?id="+id, {method: "GET", headers: {
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
            <button className="form-button" type="submit">Kup kurs</button>
          </div>
          <h2 className='bottom-course-code-text'>Wpisz kod, aby uzyskać dostęp do kursu </h2>
          <div className='row second-row'>
            <form className='activate-code' method="post">
              <input className='form-input' placeholder="Kod dostępu" />
                <button className='form-button' type="submit">
                  Aktywuj 
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;