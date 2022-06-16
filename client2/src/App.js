import './App.css';
import Form from './Form';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Categries from './Categories';
import Footer from './Footer';


function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          <div className="App">
            <Home />
            <div className="content">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/form">
                  <Form />
                </Route>
                <Route path="/categories">
                  <Categries />
                </Route>
              </Switch>
            </div>
            
          </div>
          
        </Router>
      </div>
      <Footer/>
    </div>
    
  );
}

export default App;
