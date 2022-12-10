import '../../App.css';
import React, { useState } from 'react';

import { AppBar, Typography } from '@material-ui/core';
// import { TextField } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import science from '../../assets/images/logos/logo.JPG';
import useStyles from '../../styles';


const Home = () => {
  const classes = useStyles();
  const isLoggedIn = localStorage.getItem('accessToken')
  const username = localStorage.getItem('username')


  return (
    <AppBar style={{ position: 'relative', background: '#F4EFFA', zIndex: 1 }}>
      <Toolbar>
        <a href='/'>
          <img className={classes.image} src={science} alt="logo" width="110" height="120"></img>
        </a>
        <a href='/' style={{ textDecoration: 'none' }}>
          <Typography className={classes.heading} style={{ marginLeft: 8, marginRight: 220, width: '18%', fontSize: "4rem"}} variant='h1' align='left' sx={{ flexGrow: 2 }}>
            TUTORS ALPHA
          </Typography>
        </a>
        {/* <div className='search' position='left'>
          <TextField
            id='outlined-basic'
            variant='outlined'
            fullWidth
            label='Szukaj kursów'
          />
        </div> */}
        {!isLoggedIn && <a href='/filter_courses' style={{ textDecoration: 'none' }}>
          <Button
            className={classes.title}>   Szukaj kursu
          </Button>
        </a>}
        {isLoggedIn && <a href='/filter_courses' style={{ textDecoration: 'none' }}>
        <Button
          className={classes.title}>   Szukaj kursu
        </Button>
      </a>}
        {!isLoggedIn && <a href='/categories' style={{ textDecoration: 'none' }}>
          <Button
            className={classes.title}>   Kategorie
          </Button>
        </a>}
        {isLoggedIn && <a href='/profile' style={{ textDecoration: 'none' }}>
        <Button
          className={classes.title}>   Profil ({username})
        </Button>
      </a>}
        
        {!isLoggedIn && <a href='/register' style={{ textDecoration: 'none' }}>
          <Button
            className={classes.title}>   Zostań nauczycielem
          </Button>
        </a>}
        {isLoggedIn && <a href='/user/logout' style={{ textDecoration: 'none' }}>
        <Button
          className={classes.title}>   Wyloguj się
        </Button>
      </a>}

      {isLoggedIn && <a href='/addCourse' style={{ textDecoration: 'none'}}>
          <Button
            variant="contained"
            style={ {borderRadius: 20}}
            className={classes.titleSecondButton}>   Dodaj kurs
          </Button>
        </a>}

        {!isLoggedIn && <a href='/' style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            style={ {borderRadius: 20}}
            className={classes.titleSecondButton}>   Zacznij naukę!
          </Button>
        </a>}
      </Toolbar>
    </AppBar>
  );
}

export default Home;
