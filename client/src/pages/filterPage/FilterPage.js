import React, { useState, useEffect }  from "react";
import '../../styles/Filters.css';
import axios from '../../config/axios'
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

const FliterPage = () => {

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
        const response = await axios.get('/api/course/manageCourseBySubject?subject='+sub,
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
        <div className="filters-menu-container">
            <div className="row">
                <div className='search'>
                    <TextField
                        id='outlined-basic'
                        variant='outlined'
                        fullWidth
                        label='Szukaj kursów'
                    />
                </div>
                <button className='form-button' type="submit">
                    Filtruj 
                </button>
            </div>
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
                    BRAK KURSÓW Z TEGO WYSZUKIWANIA
                    <p className='empty-courses-bottom-text'>Spróbuj później</p>
                    </p>
                }
                </div>
            </div>
        </div>
    );
}

export default FliterPage;