import React, { useState, useEffect }  from 'react';
import '../../styles/Filters.css';
import axios from '../../config/axios'
import { Link } from 'react-router-dom';
import { API } from '../../config/api'
import Loading from '../../components/loading/Loading';

const AllCourses = () => {
  const [isLoaded, setIsLoaded] = useState(false)

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
    const response = await axios.get(API.course + '?subject=' + sub,
      {
        headers: { 
          'Accept': 'application',
          'Content-Type': 'application/json'},
      });
      console.log('Success:', response?.data);
      setValues(response?.data);
      setIsLoaded(true)
  }
  
  useEffect(() => {
    submitForm()
    madeObjects(values);
  }, [])
  
  return (
    <div className="filters-menu-container flex items-center">
      <div className='text-3xl md:text-4xl text-first text-center pt-20'>{sub}</div>
      {values?.length ? (
            <div className='objects-of-course flex items-start mb-20'> 
                <div className='column mt-16'>
                    <ul >
                    {values.map((value, i) => 
                    <li key={i}>
                        <div className="row ml-8 hover:opacity-70 transition-all">
                            <div className="filters-left-column">
                                <Link to={`/course/?title=${value.title}`}>
                                    <img className='filters-course-image xl:max-w-sm xl:h-56 w-44 h-28 md:w-56 md:h-36 lg:w-72 lg:h-40 rounded-lg xl:rounded-lg' src={value.thumbnail}></img>
                                </Link>
                            </div>
                            <div className="filters-right-column ml-8 max-w-4 w-full">
                                <Link to={`/course/?title=${value.title}`} style={{ textDecoration: 'none' }}>
                                <div className='course-object-title text-first text-xl md:text-2xl lg:text-3xl font-bold'>{value?.title}</div>
                                </Link>
                                <div className='course-object-subject text-gray-500'>Kategoria: {value?.subject}</div>
                                <div className='course-object-subject text-gray-500'>Autor: {value?.author}</div>
                                <div className='course-object-price pt-4 text-lg md:text-xl lg:text-2xl'>Cena: {value?.price} zł</div>
                            </div>
                        </div>
                    </li>)}              
                    </ul>
                    </div>
            </div>
                ) : isLoaded ? <p className='empty-courses pt-12'>
                    BRAK KURSÓW W TEJ KATEGORII
                    <p className='empty-courses-bottom-text'>Spróbuj później</p>
                    </p> : <Loading />
                }
    </div>
    
  );
}

export default AllCourses;