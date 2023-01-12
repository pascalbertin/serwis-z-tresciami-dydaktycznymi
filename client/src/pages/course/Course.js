import React,  { useState, useEffect } from 'react';
import '../../styles/Course.css';
import '../../styles/Profile.css';
import { Link } from 'react-router-dom';
import axios from '../../config/axios';
import { API } from '../../config/api'
import VideoCourse from '../videoCourse/VideoCourse';
import Loading from '../../components/loading/Loading'

function Course(){
  const idParam = window.location.search;
  const id = idParam.substring(7); //it's not ID, it's title
  const [isCorrect, setIsCorrect] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [code, setCode] = useState({ code: ''})
  const [value, setValues] = useState([])
  const username = localStorage.getItem('username')
  const roles = localStorage.getItem('roles')

  const [isAdmin, setIsAdmin] = useState(false)

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
        try {
            await axios.get(API.course + '/admin/notVerified', {
                headers: { 
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
                    'Content-Type': 'application/json'}
              });
              setIsAdmin(true)
        } catch (err) {
          setIsAdmin(false)
        }
      }
      checkAdmin();
  }, [])
  
  const getCourse = async () => {
    const response = await axios.get(API.course + '/' + id,
      {
        headers: { 
          'Accept': 'application',
          'Content-Type': 'application/json'},
      }); 
    setValues(response?.data);
    localStorage.removeItem('title')
    localStorage.setItem('title', response?.data.title)
    setIsLoaded(true)
}

const submitCodeHandler = async event =>{
  if(!isSubmitted){
    setIsSubmitted(true)
    event.preventDefault();
    try{
      const response = await axios.patch(API.code + '/' + id + '/usage', {...code},
      {
        headers: {'Content-Type': 'application/json',
                  'Accept': 'application/json'},
      })
      if(response.status === 204){
          setError(process.env.REACT_APP_COURSE_OUT_OF_USES)
      }
      else if(response.data?._id) setIsCorrect(true)
    }
    catch (err){
      if(err.response.status === 406 || err.response.status === 400) setError(process.env.REACT_APP_COURSE_INCORRECT_CODE)
      else if(err.response.status === 500) setError(process.env.REACT_APP_SERVER_CONN_ERROR)
      else setError(process.env.REACT_APP_UNKNOWN_ERROR)
    }
  }
  setIsSubmitted(false)
}

const updateCodeHandler = event => {
  setCode({
      [event.target.name]: event.target.value
  })
}

  useEffect(() => {
    getCourse()
  }, [])


  return (
    //checking if code is correct, if yes show video, if no show course page
    isLoaded ? !isCorrect ? (value.title ? (<div className='course-info'>
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
        {username === value.author || roles === '5150' ?
        (<div>
          <div className='row'>
            <h3 className='main-course-text'>Cena kursu: {value.price} zł</h3>
          </div>
          <div className='row first-row'>
            {username === value.author ? <Link to={`/editcourse?title=${value.title}`} style={{ textDecoration: 'none' }}>
              <button className='form-button' type="submit"> Edytuj kurs</button>
            </Link> : <div></div>}
          </div>
          <div className='row second-row'>
            {username === value.author ? <Link to={`/deletecourse?title=${value.title}`} style={{ textDecoration: 'none' }}>
              <button className='form-button' type="submit"> Usuń kurs</button>
            </Link> : <div></div>}
            {isAdmin && username != value.author ? <VideoCourse link={value?.video} /> : <></>}
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
          <form className='activate-code' method="post" onSubmit={submitCodeHandler}>
            <input id="username" type="text" name="code" className='form-input' placeholder="Kod dostępu" value={code.code} onChange={updateCodeHandler} />
              <button className='form-button' type="submit">
                Aktywuj 
              </button>              
          </form>
        </div>
        {error.length > 0 ? <h6 className="text-red-500">{error}</h6> : ""}
        </div>)
        }
      </div>
    </div>
  </div>) : 
<div></div>) : <div><a href={`/course/?title=${value.title}`}><svg className="w-6 h-6 lg:w-8 lg:h-8 m-4" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_iconCarrier"> <g id="style=linear"> <g id="arrow-long-left"> <path id="vector" d="M21.2858 12L2.78577 12" stroke="#2F184B" stroke-width="1.5" stroke-linecap="round"></path> <path id="vector_2" d="M9.28577 19L2.99287 12.7071C2.60235 12.3166 2.60235 11.6834 2.99287 11.2929L9.28577 5" stroke="#2F184B" stroke-width="1.5" stroke-linecap="round"></path> </g> </g> </g></svg></a> <VideoCourse title={value?.title} subject={value?.subject} info={value?.description} link={value?.video} /></div>
: <Loading />
  );
}

export default Course;