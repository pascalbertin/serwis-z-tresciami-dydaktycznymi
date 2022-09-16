import React, { useState, useEffect }  from 'react';
import './AllCourses.css';
import science from '../../assets/images/science1.jpg';


const AllCourses = () => {

  var subParametr = window.location.search;
  var sub = subParametr.substring(9);  

  const [value, setValues] = useState([])

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
        var l = data.length;
        console.log("length: ", l);
    })  
  }
  
  useEffect(() => {
    submitForm()
    // var l = data.length;
    // console.log("lengthA: ", l);
    madeObjects(value);
  }, [])
  
  return (
    <div className='all-courses-container'>
      <div className='title-text'>{sub}</div>
      <div className='category-text'></div>
      {/* <div className='description-text'>AAAA {value[1].title}</div> */}
      <div className='objects-of-course'>
        <div className='row'>
          {/* <img className='course-photo' src={science}></img> */}
          {/* <div className='course-info'> */}
            {/* <div className='object-title'>{value[0].title}</div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
    
  );
}

export default AllCourses;