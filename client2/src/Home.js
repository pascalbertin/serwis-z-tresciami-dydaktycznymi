import './App.css';
import React, { useState} from 'react';
import { Container, AppBar, Typography, Grow, Grid, Box } from '@material-ui/core';
import { TextField} from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
//import { Button } from 'react-native';

import science from './images/science1.jpg';
import useStyles from './styles';
import { Link } from 'react-router-dom';

const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg"> 
    <Box sx={{ flexGrow: 1}}>
      <AppBar className={classes.appBar} position='absolute' style={{margin: 20, background: '#F4EFFA'}}>
        <Toolbar>      
          <img className={classes.image} src={science} width="280" height="160"></img>
          <Typography className={classes.heading} style={{marginLeft: 8}} variant='h1' align='left' sx={{ flexGrow: 2}}>
            NAZWA FIRMY
          </Typography>
            <div className='search' position='left'>
              <TextField
                id='outlined-basic'
                variant='outlined'
                fullWidth
                label='Szukaj kursów'
              />
            </div>
          <a href='http://localhost:3000/categories'>
            <Button            
              className={classes.title}              
              onClick={handleOpen}>   Kategorie
            </Button>
          </a>
          <a href='http://localhost:3000/form'>
            <Button            
              className={classes.title}              
              onClick={handleOpen}>   Zostań nauczycielem 
            </Button>
          </a>
          <a href='http://localhost:3000'>
            <Button      
              variant="contained" 
              className={classes.titleSecondButton}              
              onClick={handleOpen}>   Zacznij naukę 
            </Button>
          </a>
        </Toolbar>
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
      </Box>
    </Container>
  );
}

export default Home;
