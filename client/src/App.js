import './App.css';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import AddCourse from './pages/addCourse/addCourse';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Categories from './components/categories/Categories';
import Footer from './components/footer/Footer';
import Slider from './components/slider/Slider';
import Course from './pages/course/Course';
import VideoCourse from './pages/videoCourse/VideoCourse';
import Admin from './pages/admin/Admin';
import Logout from './pages/logout/Logout';
import AllCourses from './pages/allCoursesWithFilter/AllCourses';
import PaymentMethod from './pages/payment/PaymentMethod';
import Profile from './pages/profile/Profile';
import EditCourse from './pages/editCourse/EditCourse';
import DeleteCourse from './pages/deleteCourse/deleteCourse';
import FilterCourses from './pages/filterPage/FilterPage';
import MoneyPayout from './pages/moneyPayout/moneyPayout';
import PaymentFinal from './components/paymentMethod/PaymentFinal';
import EditUserData from './pages/editUserData/EditUserData';
import ResetPassword from './pages/resetPassword/ResetPassword';

function App() {
  return (
    <div className="page-container">
    <Home />
      <div className="content-wrap">
        <Router>
            <div className="content">
              <Routes>
                <Route exact path="/" element={<Slider />} />
                <Route path="/register" element={<Register />} />
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
                <Route path="/courses" element={ <AllCourses />} />
                <Route path="/payment_method" element={ <PaymentMethod />} />
                <Route path="/filter_courses" element={ <FilterCourses />} />
                <Route path="/payout" element={ <MoneyPayout />} />
                <Route path="/editYourData" element={ <EditUserData/>} />
                <Route path="/resetPassword" element={ <ResetPassword/>}/>
                <Route path="/payment_final" element={<PaymentFinal />} />
              </Routes>
            </div>          
        </Router>
        <Footer/>
      </div>
      
    </div>
    
  );
}

export default App;
