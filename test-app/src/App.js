import './App.css';
import axios from "axios";
import { styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import {TextField, Typography, Box, Button, Paper,Radio, FormControlLabel} from '@mui/material';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useForm } from "react-hook-form";

const StyledButton = styled(Button)(({theme}) => ({
  padding:'10px',
  lineHeight:'1',
  marginLeft:'35%',
  marginTop:'9px',
  minWidth:'75px',
  fontSize:'12px'
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  margin:theme.spacing(3)
}));

const StyledForm = styled(Box)(({ theme }) => ({
	'& .MuiFormHelperText-root': {
		textAlign: 'right', color: theme.palette.primary.main, fontWeight: 500,
	},
}));

function App() {

  const [firstname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");

  const registerForm = () => {
    axios.post("http://localhost:5000/login", {
      firstname: firstname,
      lastname: lastname,
}).then((response) => {
        console.log(response);
     });
   };

  const [value, setValue]= useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);

  

  return (
    <div className="App">
      <header className="App-header">
            <Item>
            <Typography variant="h4" sx={{textAlign:'center'}}>Register Form</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
            <StyledForm  sx={{
							'& .MuiTextField-root': { mt: 3, width: '100%' },
							'& .MuiOutlinedInput-root': { fontSize: 13 },
							'& .MuiInputLabel-root': { fontSize: 13 }
						}} noValidate
							autoComplete="off">

                <TextField 
                    label="First Name" 
                    id="fullWidth" 
                    type="text"
                    className={errors.uname ? 'in-valid-input' : ''}
										size="small"
                    {...register("uname", {required: true,})}
                    onChange={(e) =>{setFirstname(e.target.value);}}
                />
      { errors.uname && <p className="text-error">First Name Required.</p> }
                <TextField 
                    label="Last Name" 
                    id="fullWidth"
                    type="text"
                    className={errors.pwd ? 'in-valid-input' : ''}
										size="small" 
                    {...register("pwd", { required: true, })}
                    onChange={(e) =>{setLastname(e.target.value);}}
                />
      { errors.pwd && <p className="text-error">{ 'Last Name Required.'}</p> }
                      <Typography sx={{fontSize:'small', paddingTop:'5px'}} >Gander</Typography>      
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />   
            
        <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">Desgination</Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <Dropdown.Item href="#/action-1" active>Developer</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Team Leader</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Desginer</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Tester</Dropdown.Item>
            </Dropdown.Menu>
      </Dropdown>
    </>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Date"
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
              </LocalizationProvider>
              <StyledButton type="submit" variant="outlined" onClick={registerForm}>Register</StyledButton>
                </StyledForm></form></Item>
      </header>
    </div>
  );
}

export default App;
