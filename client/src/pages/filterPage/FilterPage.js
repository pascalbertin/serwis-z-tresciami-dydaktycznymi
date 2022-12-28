import React, { useState, useEffect }  from "react";
import '../../styles/Filters.css';
import axios from '../../config/axios'
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Checkbox, Collapse } from 'antd';
import { API } from '../../config/api'

const {Panel} = Collapse

const FliterPage = () => {
    const [values, setValues] = useState([])
    const [CheckedSubject, setCheckedSubject] = useState([])
    const [CheckedClasses, setCheckedClasses] = useState([])
    var sub = CheckedSubject.join()
    var level = ""
    //var level = "&level=" + CheckedClasses.join()

    const subjects = [
        {
            "_id": 1,
            "name": "Matematyka",
            "search": "Matematyka"
        },
        {
            "_id": 2,
            "name": "Język polski",
            "search": "Polski"
        },
        {
            "_id": 3,
            "name": "Język angielski",
            "search": "Angielski"
        },
        {
            "_id": 4,
            "name": "Informatyka",
            "search": "Informatyka"
        },
        {
            "_id": 5,
            "name": "Biologia",
            "search": "Biologia"
        },
        {
            "_id": 6,
            "name": "Chemia",
            "search": "Chemia"
        },
        {
            "_id": 7,
            "name": "Fizyka",
            "search": "Fizyka"
        },
        {
            "_id": 8,
            "name": "Historia",
            "search": "Historia"
        },
        {
            "_id": 9,
            "name": "Geografia",
            "search": "Geografia"
        },
        {
            "_id": 10,
            "name": "Język niemiecki",
            "search": "Niemiecki"
        },
        {
            "_id": 11,
            "name": "Podstawy przedsiębiorczości",
            "search": "PP"
        }
    ]

    const schoolClasses = [
        {
            "_id": 1,
            "name": "Klasy 1-3 Szkoły Podstawowej",
            "value": 1
        },
        {
            "_id": 2,
            "name": "Klasy 4-6 Szkoły Podstawowej",
            "value": 2
        },
        {
            "_id": 3,
            "name": "Klasy 7-8 Szkoły Podstawowej",
            "value": 3
        },
        {
            "_id": 4,
            "name": "Klasy 1-2 Szkoły Średniej",
            "value": 4
        },
        {
            "_id": 5,
            "name": "Klasy 3-5 Szkoły Średniej",
            "value": 5
        }
    ]

    const madeObjects = (data) => {
        data.forEach(course => {
        // const objectCourse = JSON.parse(course);
        console.log(course);
        });
    }

    const submitForm = async () => {
        if(CheckedClasses.length > 0){
            level = "&level=" + CheckedClasses.join()
        }else{
            level = ""
        }
        const response = await axios.get(API.course + '?subject=' + sub + level,
        {
            headers: { 
            'Accept': 'application',
            'Content-Type': 'application/json'},
        });
       // console.log('Success:', response?.data);
        setValues(response?.data);
        // console.log('SUBJECTS: ', CheckedSubject);
        // console.log('sub: ', sub);
        // console.log('CLASSES: ', CheckedClasses);
        // console.log('classes: ', CheckedClasses.join());
    }
    
    const handleToggleSubjects = (value) => {

        const currentIndex = CheckedSubject.indexOf(value);
        const newChecked = [...CheckedSubject];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setCheckedSubject(newChecked)
        //props.handleFilters(newChecked)
        //update this checked information into Parent Component
    }

    const handleToggleClasses = (value) => {

        const currentIndex = CheckedClasses.indexOf(value);
        const newChecked = [...CheckedClasses];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setCheckedClasses(newChecked)
        //props.handleFilters(newChecked)
        //update this checked information into Parent Component
    }

    // useEffect(() => {
    //     submitForm()
    //     madeObjects(values);
    // }, [])
    const renderCheckboxSubjectList = () => subjects.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox
                onChange={() => handleToggleSubjects(value.search)}
                type="checkbox"
                checked={CheckedSubject.indexOf(value.search) === -1 ? false : true}
            />
            <span>{" " +value.name+" "}</span>
        </React.Fragment>
    ))

    const renderCheckboxClassList = () => schoolClasses.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox
                onChange={() => handleToggleClasses(value._id)}
                type="checkbox"
                checked={CheckedClasses.indexOf(value._id) === -1 ? false : true}
            />
            <span>{" " +value.name+" "}</span>
        </React.Fragment>
    ))

    

    return (
        <div className="filters-menu-container">
            <div className="row">
                <label className="price-text">Cena min:</label>
                <input className="price-input" id="min" type="number" />
                <label className="price-text">Cena max:</label>
                <input className="price-input" id="max" type="number" />
                <div className='search'>
                    <TextField
                        id='outlined-basic'
                        variant='outlined'
                        fullWidth
                        label='Szukaj kursów'
                    />
                </div>
                <button className='form-button' type="submit" onClick={submitForm}>
                    Filtruj 
                </button>
            </div>
            <div className="row-checkbox">
                <Collapse defaultActiveKey={['0']}>
                    <Panel key="1" header="Wybierz przedmioty">
                        {renderCheckboxSubjectList()}
                    </Panel>
                </Collapse>
            </div>
            <div className="row-checkbox">
                <Collapse defaultActiveKey={['0']} >
                    <Panel key="1" header="Wybierz klasę">
                       {renderCheckboxClassList()}
                    </Panel>
                </Collapse>
            </div>
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