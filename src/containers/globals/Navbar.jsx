import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const useStyles = makeStyles({
  navBar: {
    backgroundColor: 'white',
  },
  logo: {
    color: 'black',
    paddingTop: '20px',
    paddingLeft: '45px'
  },
  user: {
    color: 'black',
    
  },
  userIcon: {
    minHeight: '35px',
    minWidth: '35px',
    marginBottom :"14px"
  }
})

const Navbar = () => {

  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar className={classes.navBar} >
        <Grid container>
          <Grid item sm={8}>
            <Typography className={classes.logo} variant="h4" align="left">
              LOGO
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Button className={classes.user} color="info" align="right" startIcon={<AccountCircleOutlinedIcon className={classes.userIcon} color='disabled' />}>
              sagar@user.in
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar