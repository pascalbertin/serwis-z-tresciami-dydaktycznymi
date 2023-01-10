import React from 'react'
import axios from '../../config/axios'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import '../../components/slider/slider.css'
import { API } from '../../config/api'
import Loading from '../../components/loading/Loading'
import '../../styles/Form.css'
import Login from '../login/Login'
import ErrorHandler from '../../components/errorhandler/ErrorHandler'

const Profile = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [courses, setCourses] = useState({})
    const [user, setUser] = useState({})
    const username = localStorage.getItem('username')
    const accessToken = localStorage.getItem('accessToken')
    const [error, setError] = useState('Nie posiadasz jeszcze żadnych kursów')

    const roles = localStorage.getItem('roles')

    const getUser = async () => {
        try {
            const response = await axios.get(API.user + '/' + username , {
                headers: {
                    'Content-Type': 'application/json'}
                });
                setUser(response.data);
            } catch (err) {
                setIsLoaded(true)
                if(!err?.response) setError(process.env.REACT_APP_SERVER_CONN_ERROR)
            }
        }

    const getUserCourses = async () => {
        try {
            const response = await axios.get(API.user + '/' + username + '/courses', {
                headers: { 
                    'Authorization': 'Bearer ' + accessToken,
                },
                withCredentials: true
            });
            setCourses(response.data);
            setIsLoaded(true)
        } 
        catch (err) {
                setIsLoaded(true)
                if(!err?.response) setError(process.env.REACT_APP_SERVER_CONN_ERROR)
                else if(err.response?.status === 401) setError(process.env.REACT_APP_UNAUTHORIZED)
                else if(err.response?.status === 403) setError(process.env.REACT_APP_FORBIDDEN)
            }
        }

    useEffect(() => {
        getUser();
        getUserCourses();
    }, [])

  return (
    username != null && accessToken != null ?
        <div className="profile-container">
            <div className="profile-top-container">
                <div className='profile-row'>
                    <div className='row-avatar'>
                        <h2 className='avatar-nickname'>Witaj {username}!</h2>
                        <img className='avatar-image' src={user.avatar}></img>
                    </div>
                </div>
                <div className='profile-row-buttons'>
                    {roles !== '5150' ? <a href="/addCourse" ><button className="form-button-profile-button">Dodaj kurs</button></a> 
                    : <a href="/admin" ><button className="form-button-profile-button">Panel admina</button></a>}
                    <a href="/editYourData" ><button className="form-button-profile-button">Edytuj profil</button></a>
                </div>
                <h2>Twoje saldo: {user?.accountBalance} zł</h2>
                <a href="/payout"><button className="form-button profile-button">Wypłać</button></a>
            </div>
        <h2 className="pl-10">Lista Twoich kursów:</h2>
        <div className="filters-menu-container flex items-center">
          {courses?.length ? (
                    <ul >
                    {courses.map((value, i) => 
                    <div className='objects-of-course flex items-start'> 
                    <div className='column mt-4 mb-4'>
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
                                {!value.verification ? <div className='course-object-subject text-red-500 text-xs'>Kurs niezweryfikowany przez administratora</div> : <></>}
                                <div className='course-object-price pt-4 text-lg md:text-xl lg:text-2xl'>Cena: {value?.price} zł</div>
                                <div className='course-sales-amount text-lg md:text-xl lg:text-2xl text-purple-900'>Sprzedano: {value?.copiesSold} sztuk</div>
                            </div>
                        </div>
                    </li></div></div>)}              
                    </ul>
                    
                ) : isLoaded ? 
                        <ErrorHandler msg={error} /> : <Loading />
                }
    </div>
    </div>
    : <Login></Login>
  )
}

export default Profile;