import React from 'react'
import axios from '../../config/axios'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Profile.css'
import '../../styles/AllCourses.css'
import { API } from '../../config/api'

const Profile = () => {
    const [courses, setCourses] = useState({})
    const username = localStorage.getItem('username')

    useEffect(() => {
        let isMounted = true;
        
        const getUserCourses = async () => {
            try {
                console.log(API.course + '?author=' + username)
                 const response = await axios.get(API.course + '?author=' + username, {
                    headers: { 
                        'Content-Type': 'application/json'}
                 });
                 isMounted && setCourses(response.data);
            } catch (err) {
                console.log(err);
            }
        }
 
        getUserCourses();
        
        return () => {
            isMounted = false;
        }
     }, [])


  return (
    courses ?  <div className="profile-container">
      <div className="profile-top-container">
        <h2>Witaj {username}!</h2>
        <a href="/addCourse"><button className="form-button profile-button">Dodaj kurs</button></a>
      </div>
      <div className="profile-bttm-container">
        <h2>Lista Twoich kursów:</h2>
        <div className='all-courses-container'>
        <div className='objects-of-course'>
        <div className='column'>
          {courses?.length ? (
            <ul >
              {courses.map((value, i) => 
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
            </p>
        }
        </div> 
      </div>
    </div>
    </div>
    </div>
    : <div></div>
  )
}

export default Profile;