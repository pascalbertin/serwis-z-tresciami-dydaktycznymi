import React,  { useState, useEffect} from 'react'
import './Course.css'
import science from '../../assets/images/science1.jpg';
import useStyles from '../../styles';

const Course = () => {

//   const [isSubmitted, setIsSubmitted] = useState(false)
//   const [values, setValues] = useState({})

// function submitForm(isValid){
//   if (isValid){
//   setIsSubmitted(false);
//   setValues(values);
//   fetch("https://serwis-z-tresciami.herokuapp.com/api/course/manageCourseBySubject", {method: "GET",headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//   }})
//   .then(response => response.json())
//   .then(data => {
//       console.log('Success:', data);
//   })
//   .catch((error) => {
//       console.error('Error:', error);
//   });
  
//   }else{
//   setIsSubmitted(false);
//   setValues({});
//   }
// }


  const classes = useStyles();
  return (
    <div className='course-info'>
      <div className='container'>
        <div className='left-column'>
          <img className='course-image' src={science}></img>
        </div>
        <div className='right-column'>
          <div className='description'>
            <h1 className='main-course-text'>Tytuł</h1>
            <h2 className='bottom-course-text'>Kategoria: </h2>
            <p className='course-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div className='row first-row'>
            <h3 className='main-course-text'>Cena kursu: </h3>
            <button className="form-button" type="submit">Kup kurs</button>
          </div>
          <h2 className='bottom-course-code-text'>Wpisz kod, aby uzyskać dostęp do kursu </h2>
          <div className='row second-row'>
            <form className='activate-code' method="post">
              <input className='form-input' placeholder="Kod dostępu" />
              <button className='form-button' type="submit">Aktywuj</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;