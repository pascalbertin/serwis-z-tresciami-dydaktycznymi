import './App.css';
import Form from './pages/registerPage/Form';
import Home from './pages/homePage/Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Categories from './components/categories/Categories';
import Footer from './components/footer/Footer';


function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          {/* <div className="App"> */}
            <Home />
            <div className="content">
              <Switch>
                <Route exact path="/">
                  {/* <Home /> */}
                </Route>
                <Route path="/form">
                  <Form />
                </Route>
                <Route path="/categories">
                  <Categories />
                </Route>
              </Switch>
            </div>
            
          {/* </div> */}
          
        </Router>
        <Footer/>
      </div>
      
    </div>
    
  );
}

export default App;
