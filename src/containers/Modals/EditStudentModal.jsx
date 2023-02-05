import React, { useState, useEffect} from 'react'
import "./modal.css"
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../config/firebase';
import { Grid, TextField, Box, MenuItem, Button, Typography, Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';


const EditStudentModal = (props) => {

  const [active, setActive] = useState(true)

  const [firstName, setFirstName] = useState(props.data.firstName);
  const [middleName, setMiddleName] = useState(props.data.middleName);
  const [lastName, setLastName] = useState(props.data.lastName);
  const [studentClass, setStudentClass] = useState(props.data.class);
  const [division, setDivision] = useState(props.data.division);
  const [rollNumber, setRollNumber] = useState(props.data.rollNumber);
  const [addressOne, setAddressOne] = useState(props.data.addressOne);
  const [addressTwo, setAddressTwo] = useState(props.data.addressTwo);
  const [landmark, setLandmark] = useState(props.data.landmark);
  const [city, setCity] = useState(props.data.city);
  const [pincode, setPincode] = useState(props.data.pincode);
  
  const toggleActive = () => {
    setActive(false)
    props.func()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!/^[0-9]{2}$/.test(rollNumber)){
      alert("roll number not valid");
    }else if(!/^[0-9]{6}$/.test(pincode)){
      alert("pincode not valid");
    }else{
      const res = await setDoc(doc(db, "students", props.data.id), {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        class: studentClass,
        division: division,
        rollNumber: rollNumber,
        addressOne: addressOne,
        addressTwo: addressTwo,
        landmark: landmark,
        city: city,
        pincode: pincode
      });
      window.location.reload()
      console.log(res)      
    }
    setActive(false)
  }

  return (
    <>
      {active && (
        <div className="modal">
          <div onClick={toggleActive} className="overlay"></div>
          <div className="modal-content">
          <Box>
            <Typography variant="h6" align="center" m={2}>
              Edit Mode
            </Typography>
            <Divider light/>
              <form onSubmit={handleSubmit}>
                <Grid container sx={{'& .MuiTextField-root': { m: 1, width: '100%', p: "5px" }}}>
                  <Grid item md={4}>
                    <TextField id="outlined-basic" label="First Name" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  </Grid>
                  <Grid item md={4}>
                    <TextField id="outlined-basic" label="Middle Name" variant="outlined" value={middleName} onChange={(e) => setMiddleName(e.target.value)} required />
                  </Grid>
                  <Grid item md={4}>
                    <TextField id="outlined-basic" label="Last Name" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </Grid>
                  <Grid item md={4}>
                    <TextField id="outlined-basic" select label="Class" variant="outlined" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} required>
                      {[" ","1","2","3","4","5","6","7","8","9","10","11","12"].map((value) => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={4}>
                      <TextField id="outlined-basic" select label="Division" variant="outlined" value={division} onChange={(e) => setDivision(e.target.value)} required>
                        {[" ","A","B","C","D","E"].map((value) => (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </TextField>
                  </Grid>
                  <Grid item md={4}>
                    <TextField id="outlined-basic" label="Roll-No in Digits" variant="outlined" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required/>
                  </Grid>
                  <Grid item md={6}>
                    <TextField id="outlined-basic" label="Address Line 1" variant="outlined" value={addressOne} onChange={(e) => setAddressOne(e.target.value)} required/>
                  </Grid>
                  <Grid item md={6}>
                    <TextField id="outlined-basic" label="Address Line 2" variant="outlined" value={addressTwo} onChange={(e) => setAddressTwo(e.target.value)} required/>
                  </Grid>
                  <Grid item md={4}>
                    <TextField id="outlined-basic" label="Landmark" variant="outlined" value={landmark} onChange={(e) => setLandmark(e.target.value)} required/>
                  </Grid>
                  <Grid item md={4}>
                    <TextField id="outlined-basic" label="City" variant="outlined" value={city} onChange={(e) => setCity(e.target.value)} required/>
                  </Grid>
                  <Grid item md={4}>
                    <TextField id="outlined-basic" label="Pincode" variant="outlined" value={pincode} onChange={(e) => setPincode(e.target.value)} required/>
                  </Grid>
                  <Grid item md={12}>
                    <Button color="primary" variant="contained" fullWidth="true" type="submit">Apply Changes</Button>
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

export default EditStudentModal