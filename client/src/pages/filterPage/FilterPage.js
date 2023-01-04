import React, { useState, useEffect }  from "react";
import '../../styles/Filters.css';
import axios from '../../config/axios'
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Checkbox, Collapse} from 'antd';
import { API } from '../../config/api'

const {Panel} = Collapse


const FliterPage = () => {
    const [values, setValues] = useState([])
    const [CheckedSubject, setCheckedSubject] = useState([])
    const [CheckedClasses, setCheckedClasses] = useState([])
    const [priceMin, setPriceMin] = useState(5)
    const [priceMax, setPriceMax] = useState(20)
    var sub = ""
    var level = ""
    var minPrice = "&priceMin="+priceMin.toString()
    var maxPrice = "&priceMax="+priceMax.toString()

    

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
        if(CheckedSubject.length > 0){
            sub = "subject=" + CheckedSubject.join()
        }else{
            sub = ""
        }
        const response = await axios.get('/api/courses?'+sub+minPrice+maxPrice+level,
        {
            headers: { 
            'Accept': 'application',
            'Content-Type': 'application/json'},
        });
        setValues(response?.data);
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
    }
    const handleInputMin = (e)=>{
        setPriceMin( e.target.value );
      }
    const handleInputMax = (e)=>{
    setPriceMax( e.target.value );
    }

    // const getBackgroundSizeMin = () => {
    //     return {
    //         backgroundSize: `${(priceMin * 100) / priceMax}% 100%`,
    //     };
    // };
    // const getBackgroundSizeMax = () => {
    //     return {
    //         backgroundSize: `${(priceMax * 100) / 250}% 100%`,
    //     };
    // };
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
                <input className="price-slider" type="range" onInput={ handleInputMin } min={1} max={priceMax-1} value={priceMin} />
                <input className="price-slider" type="range" onInput={ handleInputMax } min={priceMin} max={250} value={priceMax} />
            </div>
            <div className="row">
                <label className="price-text">Cena min: {priceMin}zł</label> 
                <label className="price-text">Cena max: {priceMax}zł</label> 
            </div>
            <div className="row-checkbox">
                <Collapse bordered={false} defaultActiveKey={['0']} >
                    <Panel key="1" header="Wybierz przedmioty" className="collapse-panel">
                        {renderCheckboxSubjectList()}
                    </Panel>
                </Collapse>
            </div>
            <div className="row-checkbox">
                <Collapse bordered={false} defaultActiveKey={['0']} >
                    <Panel key="1" header="Wybierz klasę" className="collapse-panel">
                       {renderCheckboxClassList()}
                    </Panel>
                </Collapse>
            </div>
            <div className="row">
                <button className='form-button' type="submit" onClick={submitForm}>
                    Filtruj 
                </button>
            </div>
            <div className='objects-of-course'> 
                <div className='column'>
                {values?.length ? (
                    <ul >
                    {values.map((value, i) => 
                    <li key={i}>
                        <div className="row">
                            <div className="filters-left-column">
                                <Link to={`/course/?title=${value.title}`}>
                                    <img className='filters-course-image' src={value.thumbnail}></img>
                                </Link>
                            </div>
                            <div className="filters-right-column">
                                <Link to={`/course/?title=${value.title}`} style={{ textDecoration: 'none' }}>
                                <div className='course-object-title'>{value?.title}</div>
                                </Link>
                                <div className='course-object-subject'>Kategoria: {value?.subject}</div>
                                <div className='course-object-price'>Cena: {value?.price} zł</div>
                            </div>
                        </div>
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