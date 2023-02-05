import React, { useState, useEffect} from 'react'
import "./modal.css"
import { Box, TextField, Grid, Typography, Divider} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const ViewStudentModal = (props) => {

  const [active, setActive] = useState(true)
  const [studentData, setStudentData] = useState(props.data)

  const toggleActive = () => {
    setActive(false)
    props.func()
  }

  return (
    <>
      {active && (
        <div className="modal">
          <div onClick={toggleActive} className="overlay"></div>
          <div className="modal-content">
          <Box>
            <Typography variant="h6" align="center" m={2}>
              View Mode
            </Typography>
            <Divider light/>
              <form>
                <Grid container p={4} sx={{'& .MuiTextField-root': { m: 1, width: '100%', p: "5px" }}}>
                  <Grid item md={4}>
                    <TextField id="outlined-basic" label="First Name" variant="outlined" value={studentData.firstName} disabled/>
                  </Grid>
                  <Grid item md={4}>
                    <TextField id="outlined-basic" label="Middle Name" variant="outlined" value={studentData.middleName} disabled/>
                  </Grid>
                  <Grid item md={4}>
                    <TextField id="outlined-basic" label="Last Name" variant="outlined" value={studentData.lastName} disabled/>
                  </Grid>
                  <Grid item md={4}>
                    <TextField id="outlined-basic" label="Class" variant="outlined" value={studentData.class} disabled/>
                  </Grid>
                  <Grid item md={4}>
                      <TextField id="outlined-basic" label="Division" variant="outlined" value={studentData.division} disabled />
                  </Grid>
                  <Grid item md={4}>
                    <TextField id="outlined-basic" label="Roll-No in Digits" variant="outlined" value={studentData.rollNumber} disabled/>
                  </Grid>
                  <Grid item md={6}>
                    <TextField id="outlined-basic" label="Address Line 1" variant="outlined" value={studentData.addressOne} disabled/>
                  </Grid>
                  <Grid item md={6}>
                    <TextField id="outlined-basic" label="Address Line 2" variant="outlined" value={studentData.addressTwo} disabled/>
                  </Grid>
                  <Grid item md={4}>
                    <TextField id="outlined-basic" label="Landmark" variant="outlined" value={studentData.landmark} disabled/>
                  </Grid>
                  <Grid item md={4}>
                    <TextField id="outlined-basic" label="City" variant="outlined" value={studentData.city} disabled/>
                  </Grid>
                  <Grid item md={4}>
                    <TextField id="outlined-basic" label="Pincode" variant="outlined" value={studentData.pincode} disabled/>
                  </Grid>
                </Grid>
              </form>
            </Box>
            <CloseIcon className="close-modal" fontSize="large" onClick={toggleActive}/>
          </div>
        </div>
      )}
    </>
  )
}

export default ViewStudentModal