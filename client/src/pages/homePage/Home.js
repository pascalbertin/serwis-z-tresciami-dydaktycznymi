import '../../App.css';
import React, { useState } from 'react';

import { Container, AppBar, Typography, Grow, Grid, Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import science from '../../assets/images/science1.jpg';
import useStyles from '../../styles';

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
    <AppBar style={{ position: 'relative', background: '#F4EFFA', zIndex: 1 }}>
      <Toolbar>
        <img className={classes.image} src={science} width="280" height="160"></img>
        <Typography className={classes.heading} style={{ marginLeft: 8, width: '22%' }} variant='h1' align='left' sx={{ flexGrow: 2 }}>
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
        <a href='/categories'>
          <Button
            className={classes.title}
            onClick={handleOpen}>   Kategorie
          </Button>
        </a>
        <a href='/form'>
          <Button
            className={classes.title}
            onClick={handleOpen}>   Zostań nauczycielem
          </Button>
        </a>
        <a href='/'>
          <Button
            variant="contained"
            className={classes.titleSecondButton}
            onClick={handleOpen}>   Zacznij naukę!
          </Button>
        </a>
      </Toolbar>
    </AppBar>
  );
}

export default Home;
