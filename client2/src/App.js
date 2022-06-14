import './App.css';
import Form from './Form';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {
  return (
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
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
