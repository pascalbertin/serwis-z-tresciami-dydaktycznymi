import './App.css';
import Form from './pages/registerPage/Form';
import Home from './pages/homePage/Home';
import Login from './pages/loginPage/Login';
import AddCourse from './pages/addCoursePage/addCoursePage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Categories from './components/categories/Categories';
import Footer from './components/footer/Footer';
import Slider from './components/slider/Slider';
import Course from './pages/coursePage/Course';
import VideoCourse from './pages/videoCoursePage/videoCurse';
import Admin from './pages/adminPage/Admin';
import Logout from './pages/logoutPage/Logout';
import AllCourses from './pages/allCoursesWithFilter/AllCourses';
import PaymentMethod from './pages/paymentPage/PaymentMethod';
import Profile from './pages/profilePage/Profile';
import EditCourse from './pages/editCoursePage/EditCourse';
import DeleteCourse from './pages/deleteCourse/deleteCourse';
// import {AuthProvider} from './contexts/AuthProvider'

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router>
            <Home />
            <div className="content">
              <Routes>
                <Route exact path="/" element={<Slider />} />
                <Route path="/register" element={<Form />} />
                <Route path="/categories" element={ <Categories />} />
                <Route path="/login" element={ <Login />} />
                <Route path="/user/logout" element={ <Logout />} />
                <Route path="/admin" element={ <Admin />} />
                <Route path="/profile" element={ <Profile /> } />
                <Route path="/addcourse" element={ <AddCourse />} />
                <Route path="/course" element={ <Course />} />
                <Route path="/editcourse" element={ <EditCourse /> } />
                <Route path="/deletecourse" element={ <DeleteCourse />} />
                <Route path="/video" element={ <VideoCourse />} />
                <Route exact path="/courses" element={ <AllCourses />} />
                <Route path="/payment_method" element={ <PaymentMethod />} />
              </Routes>
            </div>          
        </Router>
        <Footer/>
      </div>
      
    </div>
    
  );
}

export default App;
