import React,  { useState, useEffect } from 'react';
import '../../styles/Course.css';
import '../../styles/Profile.css';
import { Link } from 'react-router-dom';
import axios from '../../config/axios';
import {useNavigate, useLocation} from 'react-router-dom';
import UseCodeResponse from '../../components/useCode/UseCodeResponse';
import { API } from '../../config/api'

function Course(){
  const navigate = useNavigate();
  const location = useLocation();
  const idParam = window.location.search;
  const id = idParam.substring(7); //it's not ID, it's title
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [code, setCode] = useState({ code: ''})
  const [value, setValues] = useState([])
  const username = localStorage.getItem('username')
  
  const submitForm = async () => {
    const response = await axios.get(API.course + '/' + id,
      {
        headers: { 
          'Accept': 'application',
          'Content-Type': 'application/json'},
      }); 
    setValues(response?.data); 
    localStorage.removeItem('title');
    localStorage.removeItem('subject');
    localStorage.removeItem('info');
    localStorage.removeItem('url');
    localStorage.setItem('title', response.data.title);
    localStorage.setItem('subject', response.data.subject);
    localStorage.setItem('info', response.data.description);
    localStorage.setItem('url', response.data.video);
}

const submitHandler = async event =>{
  event.preventDefault();
  try{
    const response = await axios.patch(API.code + '/' + id + '/usage', {...code},
    {
      headers: {'Content-Type': 'application/json',
                'Accept': 'application/json'},
    })
    console.log(response);
    console.log(response.data?.message)
    if(response.data?.message === "Out of uses"){
        setError(process.env.REACT_APP_COURSE_OUT_OF_USES)
    }
    if(response.data?.message === "Incorrect code"){
        setError(process.env.REACT_APP_COURSE_INCORRECT_CODE)
    }
    if(response.data?._id)
    {
        navigate('/video?id='+id, {state: { from: location}, replace: true});
    }
    setIsSubmitted(true)
  }
  catch (err){
    console.log(err)
  }
}

const updateHandler = event => {
  setCode({
      [event.target.name]: event.target.value
  })
}

  useEffect(() => {
    submitForm()
  }, [])


  return (
    !isSubmitted ? 
    value.title ? (<div className='course-info'>
    <div className='course-container'>
      <div className='left-column'>
        <img className='course-image' src={value.thumbnail}></img>
      </div>
      <div className='right-column'>
        <div className='description'>
          <h1 className='main-course-text'>{value.title}</h1>
          <h2 className='bottom-course-text'>Kategoria: {value.subject}</h2>
          <p className='course-text'>{value.description}</p>
        </div>
        {username === value.author ?
        (<div>
          <div className='row'>
            <h3 className='main-course-text'>Cena kursu: {value.price} zł</h3>
            </div>
            <div className='row first-row'>
            <Link to={`/editcourse?title=${value.title}`} style={{ textDecoration: 'none' }}>
            <button className='form-button' type="submit"> Edytuj kurs</button>
            </Link>
          </div>
          <div className='row second-row'>
          <Link to={`/deletecourse?title=${value.title}`} style={{ textDecoration: 'none' }}>
            <button className='form-button' type="submit"> Usuń kurs</button>
            </Link>
          </div>
        </div>)
         : (<div>
        <div className='row first-row'>
          <h3 className='main-course-text'>Cena kursu: {value.price} zł</h3>
            <Link to={`/payment_method?title=${value.title}`}>
                <button className="form-button" type="submit">Kup kurs</button>
            </Link>
          </div>
        <h2 className='bottom-course-code-text'>Wpisz kod, aby uzyskać dostęp do kursu </h2>
        <div className='row second-row'>
          <form className='activate-code' method="post" onSubmit={submitHandler}>
            <input id="username" type="text" name="code" className='form-input' placeholder="Kod dostępu" value={code.code} onChange={updateHandler} />
              <button className='form-button' type="submit">
                Aktywuj 
              </button>
          </form>
        </div>
        </div>)
        }
      </div>
    </div>
  </div>) : 
<div></div>
: <div><UseCodeResponse msg={error}/></div>
  );
}

export default Course;