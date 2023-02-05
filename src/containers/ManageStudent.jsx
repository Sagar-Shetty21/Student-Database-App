import React, {useEffect, useState} from 'react';
import Navbar from './globals/Navbar';
import SideBar from './globals/SideBar';
import { collection, getDocs } from "firebase/firestore";
import EditStudentModal from './Modals/EditStudentModal';
import ViewStudentModal from './Modals/ViewStudentModal';
import DeleteStudentModal from './Modals/DeleteStudentModal';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Icon } from '@mui/material';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../config/firebase';


const ManageStudent = () => {

  const [dateTime, setDateTime] = useState(new Date());
  const [showViewStudentModal, setShowViewStudentModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [showDeleteStudentModal, setShowDeleteStudentModal] = useState(false);
  const [studentsData, setStudentsData] = useState([]);
  const [rowData, setRowData] = useState({});
  console.log(showViewStudentModal,showDeleteStudentModal)
  useEffect( () => {
    const getData = async() => {
      let data = [];
      try{
        const querySnapshot = await getDocs(collection(db, "students"));
        querySnapshot.forEach((doc) => {
          data.push({id: doc.id, ...doc.data()});
        });
        setStudentsData(data) 
      }catch(err){
        console.log(err)
      }
    };
    getData()
  }, [])

  useEffect( () => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 60000);
    return () => clearInterval(intervalId);
  }, [])


  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

  const columns = [
    {field: "firstName", flex:1, headerName:"Name"},
    {field: "class", flex:1, headerName:"Class"},
    {field: "rollNumber", flex:1, headerName:"Roll Number"},
    {
      headerName:"View  /  Edit  /  Delete", 
      flex:1,
      renderCell: ({row}) => {
        return (
          <Box >
            <IconButton>
              <VisibilityIcon onClick={() => setShowViewStudentModal(p => !p)} />
            </IconButton>
            <IconButton>
              <BorderColorIcon onClick={() => setShowEditStudentModal(p => !p)} />
            </IconButton>
            <IconButton>
              <DeleteIcon onClick={() => setShowDeleteStudentModal(p => !p)}/>
            </IconButton>
          </Box>
        )
      }
    }
  ]
  
  return (
    <div>
      <Navbar />
      <Box display="flex">
        <SideBar />
        <Box  width="80vw" pl={6}>
          <Box>
            <Grid container spacing={2} m={2}>
              <Grid item sm={9} align="left">
                <Typography variant="h6">Manage Student</Typography>
              </Grid>
              <Grid item sm={3}>
                <div>{date}, {time}</div>
              </Grid>
            </Grid>
          </Box>
            
          <Box height="70vh">
            <DataGrid
              rows={studentsData}
              columns={columns}
              onRowClick={(e) => setRowData(e.row)}
            />
          </Box>
        </Box>
      </Box>
      {showViewStudentModal && <ViewStudentModal data={rowData} func={() => setShowViewStudentModal(false)}/>}
      {showEditStudentModal && <EditStudentModal data={rowData} func={() => setShowEditStudentModal(false)}/>}
      {showDeleteStudentModal && <DeleteStudentModal data={rowData} func={() => setShowDeleteStudentModal(false)}/>}
    </div>
  )
}

export default ManageStudent