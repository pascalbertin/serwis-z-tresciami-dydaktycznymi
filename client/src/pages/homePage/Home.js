import '../../App.css';
import React, { useState } from 'react';

import { AppBar, Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import science from '../../assets/images/logo.JPG';
import useStyles from '../../styles';

const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('accessToken')

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar style={{ position: 'relative', background: '#F4EFFA', zIndex: 1 }}>
      <Toolbar>
        <img className={classes.image} src={science} width="110" height="120"></img>
        <Typography className={classes.heading} style={{ marginLeft: 8, width: '22%', fontSize: "4rem"}} variant='h1' align='left' sx={{ flexGrow: 2 }}>
          TUTORS ALPHA
        </Typography>
        <div className='search' position='left'>
          <TextField
            id='outlined-basic'
            variant='outlined'
            fullWidth
            label='Szukaj kursów'
          />
        </div>
        {!isLoggedIn && <a href='/categories' style={{ textDecoration: 'none' }}>
          <Button
            className={classes.title}
            onClick={handleOpen}>   Kategorie
          </Button>
        </a>}
        {isLoggedIn && <a href='/profile' style={{ textDecoration: 'none' }}>
        <Button
          className={classes.title}
          onClick={handleOpen}>   Profil ({localStorage.getItem('username')})
        </Button>
      </a>}
        
        {!isLoggedIn && <a href='/register' style={{ textDecoration: 'none' }}>
          <Button
            className={classes.title}
            onClick={handleOpen}>   Zostań nauczycielem
          </Button>
        </a>}
        {isLoggedIn && <a href='/user/logout' style={{ textDecoration: 'none' }}>
        <Button
          className={classes.title}
          onClick={handleOpen}>   Wyloguj się
        </Button>
      </a>}

      {isLoggedIn && <a href='/addCourse' style={{ textDecoration: 'none'}}>
          <Button
            variant="contained"
            style={ {borderRadius: 20}}
            className={classes.titleSecondButton}
            onClick={handleOpen}>   Dodaj kurs
          </Button>
        </a>}

        {!isLoggedIn && <a href='/' style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            style={ {borderRadius: 20}}
            className={classes.titleSecondButton}
            onClick={handleOpen}>   Zacznij naukę!
          </Button>
        </a>}
      </Toolbar>
    </AppBar>
  );
}

export default Home;
