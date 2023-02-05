
import React, {useState, useContext} from 'react';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';
import { auth } from '../../config/firebase';
import { signOut } from "firebase/auth";

const useStyles = makeStyles(theme => ({
  root: {
    width: '16vw',
    maxWidth: 320,
    position: 'relative',
  },
}));




const SideBar = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("user");
      navigate("/login");
      alert("user logged out!");
    }).catch((error) => {
      console.log(error);
    });
    
  }
  
  return (
    <div>
      <div className={classes.root}>
        <List component="nav">
          <ListItem button onClick={() => navigate("/addstudent")}>
            <ListItemIcon><GroupAddIcon/></ListItemIcon>
            <ListItemText primary="Add Student" />
          </ListItem>
          <ListItem button onClick={() => navigate("/managestudent")}>
            <ListItemIcon><ManageSearchIcon/></ListItemIcon>
            <ListItemText primary="Manage Student" />
          </ListItem>
          <ListItem button onClick={handleSignOut}>
            <ListItemIcon><LogoutIcon/></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    
    </div>
  );
}


export default SideBar;