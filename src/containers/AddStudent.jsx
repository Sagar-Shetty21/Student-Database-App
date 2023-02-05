import React, {useState, useEffect} from 'react'
import { collection, addDoc } from "firebase/firestore";
import Navbar from './globals/Navbar';
import SideBar from './globals/SideBar';
import { db } from '../config/firebase';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import {TextField, MenuItem} from '@mui/material';



const AddStudent = () => {

  const [dateTime, setDateTime] = useState(new Date());

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [division, setDivision] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  
  useEffect( () => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [])

  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!/^[0-9]{2}$/.test(rollNumber)){
      alert("roll number not valid");
    }else if(!/^[0-9]{6}$/.test(pincode)){
      alert("pincode not valid");
    }else{
      const res = await addDoc(collection(db, "students"), {
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
      alert("Student added successfully.")  
      setFirstName("") 
      setMiddleName("")
      setLastName("")
      setStudentClass("")
      setDivision("")
      setRollNumber("")
      setAddressOne("")
      setAddressTwo("")
      setLandmark("")
      setCity("")
      setPincode("")
    }
  }

  return (
    <div>
        <Navbar />
        <Box display="flex">
          <SideBar />
          <Box width="80vw">
            <Box>
              <Grid container spacing={2} m={2}>
                <Grid item sm={9} align="left">
                  <Typography variant="h6">Add Student</Typography>
                </Grid>
                <Grid item sm={3}>
                  <div>{date}, {time}</div>
                </Grid>
              </Grid>
            </Box>
            <Box>
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
                    {/* <TextField id="outlined-basic" select label="Last Name" variant="outlined" > */}
                      <TextField id="outlined-basic" select label="Division" variant="outlined" value={division} onChange={(e) => setDivision(e.target.value)} required>
                        {[" ","A","B","C","D","E"].map((value) => (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </TextField>
                    {/* </TextField> */}
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
                    <Button color="primary" variant="contained" fullWidth="true" type="submit">Add Student</Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        </Box>
    </div>
  )
}

export default AddStudent
