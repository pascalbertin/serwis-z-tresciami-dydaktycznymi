import React, { useEffect, useState, useContext } from "react";
import axios from '../../config/axios'
import { API } from '../../config/api'
import '../../components/slider/slider.css'
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import VideoCourse from '../../pages/videoCourse/VideoCourse'
import { useNavigate, useLocation } from "react-router-dom";
import ErrorHandler from "../../components/errorhandler/ErrorHandler";

const Admin = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [courses, setCourses] = useState({})
    const [currentCourse, setCurrentCourse] = useState({})
    const [showVideo, setShowVideo] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const accessToken = localStorage.getItem('accessToken')
    const username = localStorage.getItem('accessToken')
    const roles = localStorage.getItem('roles')

    const acceptCourse = async (courseName) => {
        try {
            const response = await axios.get(API.course + '/' + courseName + '/verification', {
                headers: { 
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
                    'Content-Type': 'application/json'}
                });
                setTimeout(navigate(0), 100)
                setTimeout(navigate('/admin', {state: { from: location}, replace: true}), 100)
            } catch (err) {
        }
    }

    useEffect(() => {
        const getUserCourses = async () => {
            try {
                const response = await axios.get(API.course + '/admin/notVerified', {
                    headers: { 
                        'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
                        'Content-Type': 'application/json'}
                    });
                     setCourses(response.data);
                     setIsLoaded(true)
                } catch (err) {
            }
        }
        getUserCourses();
    }, [])

    return ( 
    accessToken != null && username != null && roles === '5150' ? !showVideo ? <div className="profile-container">
      <div className="profile-top-container">
        <h2 className="xl:text-4xl lg:text-3xl text-2xl mb-10">Panel administratora</h2>
      </div>
      <h2 className="pl-10 xl:text-3xl lg:text-2xl text-xl">Niezweryfikowane kursy:</h2>
        <div className="filters-menu-container flex items-center">
          {courses?.length ? (
                    <ul >
                    {courses.map((value, i) => 
                    <div className='objects-of-course'> 
                    <div className='column mt-8 mb-8'>
                    <li key={i}>
                        <div className="row ml-8">
                            <div className="filters-left-column">
                                <Link to={`/course/?title=${value.title}`}>
                                    <img className='hover:opacity-70 transition-all filters-course-image xl:max-w-sm xl:h-56 w-44 h-28 md:w-56 md:h-36 lg:w-72 lg:h-40 rounded-lg xl:rounded-lg' src={value.thumbnail}></img>
                                </Link>
                            </div>
                            <div className="filters-right-column ml-8 max-w-4 w-full">
                                <Link to={`/course/?title=${value.title}`} style={{ textDecoration: 'none' }}>
                                <div className='course-object-title text-first text-xl md:text-2xl lg:text-3xl font-bold'>{value?.title}</div>
                                </Link>
                                <div className='course-object-subject text-gray-500'>Kategoria: {value?.subject}</div>
                                <div className='course-object-price pt-4 text-lg md:text-xl lg:text-2xl'>Cena: {value?.price} zł</div>
                                <div className='icons flex flex-row mt-4 lg:mt-8 gap-3'>
                                    <button className="hover:bg-first hover:bg-opacity-30 rounded-lg p-1.5" onClick={() => {acceptCourse(value?.title)}}><svg width="64px" height="64px" className="w-6 h-6 lg:w-8 lg:h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_iconCarrier"> <defs></defs> <title></title> <g id="checkmark"> <line className="cls-1" x1="3" x2="12" y1="16" y2="25"></line> <line className="cls-1" x1="12" x2="29" y1="25" y2="7"></line> </g> </g></svg></button>
                                    <button className="hover:bg-first hover:bg-opacity-30 rounded-lg p-1.5" onClick={() => {setShowVideo(true); setCurrentCourse(value)}}><svg width="64px" height="64px" className="w-6 h-6 lg:w-8 lg:h-8" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_iconCarrier"><defs></defs><rect className="cls-2" x="1.5" y="7.23" width="21" height="15.27"></rect><rect className="cls-2" x="1.5" y="1.5" width="21" height="5.73"></rect><line className="cls-2" x1="1.98" y1="1.5" x2="7.7" y2="7.23"></line><line className="cls-2" x1="6.75" y1="1.5" x2="12.48" y2="7.23"></line><line className="cls-2" x1="11.52" y1="1.5" x2="17.25" y2="7.23"></line><line className="cls-2" x1="16.3" y1="1.5" x2="22.02" y2="7.23"></line><polygon className="cls-2" points="9.14 17.73 9.14 12 14.86 14.86 9.14 17.73"></polygon></g></svg></button>
                                </div>
                            </div>
                        </div>
                    </li></div></div>)}              
                    </ul>
                ) : isLoaded ? <p className='empty-courses flex ml-8 pt-12'>
                    Nie ma żadnych kursów do zweryfikowania!
                    </p> : <Loading />
                }
    </div>
    </div> : <div><a href="/admin"><svg className="w-6 h-6 lg:w-8 lg:h-8 m-2" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_iconCarrier"> <g id="style=linear"> <g id="arrow-long-left"> <path id="vector" d="M21.2858 12L2.78577 12" stroke="#2F184B" stroke-width="1.5" stroke-linecap="round"></path> <path id="vector_2" d="M9.28577 19L2.99287 12.7071C2.60235 12.3166 2.60235 11.6834 2.99287 11.2929L9.28577 5" stroke="#2F184B" stroke-width="1.5" stroke-linecap="round"></path> </g> </g> </g></svg></a> <VideoCourse title={currentCourse?.title} info={currentCourse?.description} subject={currentCourse?.subject} link={currentCourse?.video} /></div>
    : <ErrorHandler msg={process.env.REACT_APP_FORBIDDEN} />
    )
}   

export default Admin;