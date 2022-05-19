import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

//import Posts from './components/Posts/Posts.js';
//import Form from './components/Form/Form/Form.js';
import science from './images/science1.jpg';

const App = () => {
  return (
    <Container maxWidth="lg"> 
      <AppBar position='static' color='inherit'>
        <Typography variant='h2' align='center'>Courses</Typography>
          <img src={science} width="200" height="160"></img>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify='space-between' alignItems='stretch' spacing={4}>
            <Grid item xs= {12} sm={7}>
              
            </Grid>
            <Grid item xs= {12} sm={4}>
              
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
