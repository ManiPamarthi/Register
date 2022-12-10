import './App.css';
import axios from "axios";
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import {TextField, Typography, Box, Button, Paper,Radio, FormControlLabel} from '@mui/material';
import { useState } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
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

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option: FilmOptionType) => option.title,
});

interface FilmOptionType {
  title: string;
  year: number;
}

function App() {

  const [firstname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");
  const [gander,setGander] = useState("");
  const [designation,setDesignation] = useState("");
  const [date,setDate] = useState("");

  const registerForm = () => {
    axios.post("http://localhost:5000/login", {
      firstname: firstname,
      lastname: lastname,
      gander: gander,
      designation: designation,
      date: date,
}).then((response) => {
        console.log(response);
     });
   };

   const user = () => {
    axios.post("http://localhost:5000/user", {
      
}).then((response) => {
        console.log(response);
     });
   };

  

  const [value, setValue]= useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);

  const top100Films = [
    { title: 'Developer', year: 1994 },
    { title: 'Desginer', year: 1972 },
    { title: 'Team Lead', year: 1974 },
    { title: 'Manger', year: 2008 },
    { title: 'Tester', year: 1957 },
    { title: "Devopes", year: 1993 },
  ];

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
        <FormControlLabel value="male" control={<Radio />} label="Male" onChange={(e) =>{setGander(e.target.value);}} />
        <FormControlLabel value="female" control={<Radio />} label="Female" onChange={(e) =>{setGander(e.target.value);}} />
        <>
        <Autocomplete
            id="filter-demo"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            filterOptions={filterOptions}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Designation" />}
            onChange={(e) =>{setDesignation(e.target.value);}}
        />
    </>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
