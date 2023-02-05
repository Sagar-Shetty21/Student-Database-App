import React, {useState} from 'react'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import { Button, Typography, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';



const DeleteStudentModal = (props) => {

    const [active, setActive] = useState(true)
  
    const toggleActive = () => {
      setActive(false)
      props.func()
    }

    const handleDelete = async() => {
      try{
        const deleteStudent = await deleteDoc(doc(db, "students", props.data.id));
        alert("Student data deleted successfully.")
        window.location.reload()
      }catch(err){
        console.log(err)
      }
      setActive(false)
    }
  
    return (
      <>
        {active && (
          <div className="modal">
            <div onClick={toggleActive} className="overlay"></div>
            <div className="modal-content">
              <Typography variant="h6" align="center" m={4}>
                Are you sure you want to delete student details? 
              </Typography>
              <Typography variant="p" align="center">
                This cannot be undone!
              </Typography>
              <Divider light/>
              <Button onClick={handleDelete} variant="contained" color="warning" >Confirm</Button>
              <CloseIcon className="close-modal" fontSize="large" onClick={toggleActive}/>
            </div>
          </div>
        )}
      </>
    )
  }
  
  export default DeleteStudentModal
