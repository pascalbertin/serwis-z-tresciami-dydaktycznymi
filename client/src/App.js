import './App.css';
import Form from './pages/registerPage/Form';
import Home from './pages/homePage/Home';
import Login from './pages/loginPage/Login';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Categories from './components/categories/Categories';
import Footer from './components/footer/Footer';
import Slider from './components/slider/Slider';
import Course from './pages/coursePage/Course';

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router>
            <Home />
            <div className="content">
              <Switch>
                <Route exact path="/">
                   <Slider/>
                </Route>
                <Route path="/form">
                  <Form />
                </Route>
                <Route path="/categories">
                  <Categories />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/course">
                  <Course />
                </Route>
              </Switch>
            </div>          
        </Router>
        <Footer/>
      </div>
      
    </div>
    
  );
}

export default App;