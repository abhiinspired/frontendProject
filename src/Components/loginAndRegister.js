import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import './loginAndRegistration.css'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [register,setRegister] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    contact: '',
  });

  const [login, setLogin] = useState({
    userEmail:'',
    userPassword:''
  })
  
  const registerChangeHandler = (e) => {
    const state = register;
    state[e.target.name] = e.target.value;
    setRegister({...state});
  }

  const loginChangeHandler = (e) => {
    const state = login;
    state[e.target.name] = e.target.value;
    setLogin({...state});
  }

  const {fname,lname,email,password,contact} = register;
  const {userEmail, userPassword} = login;

  async function onRegister() {

    const details = register;
    
    const parms = {
      email_address: details.email,
      first_name: details.fname,
      last_name: details.lname,
      mobile_number: details.contact,
      password: details.password
    };

    try{
      const rawResponse = await fetch('http://localhost:8085/api/v1/signup',{
        body: JSON.stringify(parms),
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        }
      });
  
      const result = await rawResponse.json();

      if(rawResponse.ok){
        document.querySelector(".registrationStatus").style.display = "block";
        setRegister({
          fname: '',
          lname: '',
          email: '',
          password: '',
          contact: '',
        });
      }else{
        const error = new Error();
        error.message = result.message || 'Something went wrong';
        throw error;
      }
    }catch(e){
      alert(`Error: ${e.message}`);
    }    
}    

function onLogin(){
  alert("Login Clicked");
  console.log(login);
}

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Register" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ValidatorForm onSubmit={onLogin}>

        <TextValidator
                id="userEmail"
                type="email"
                name="userEmail"
                label="Username*"
                onChange = {loginChangeHandler}
                value={userEmail}
                validators={['required', 'isEmail']}
                errorMessages={['required']}
              >
              </TextValidator>
              <TextValidator
                id="userPassword"
                type="password"
                name="userPassword"
                label="Password*"
                onChange = {loginChangeHandler}
                value={userPassword}
                validators={['required']}
                errorMessages={['required']}
              >
              </TextValidator>

            <br />
            <Button 
                variant="contained" 
                color="primary"
                type="submit"
            >
                Login
            </Button>
        </ValidatorForm>
      </TabPanel>
      <TabPanel value={value} index={1}>
          <ValidatorForm onSubmit={onRegister}>
              <TextValidator
                id="fname"
                type="text"
                name="fname"
                label="First Name *"
                onChange = {registerChangeHandler}
                value = {fname}
                validators={['required']}
                errorMessages={['required']}
              >
              </TextValidator>
              <TextValidator
                id="lname"
                type="text"
                name="lname"
                label="Last Name *"
                onChange = {registerChangeHandler}
                value={lname}
                validators={['required']}
                errorMessages={['required']}
              >
              </TextValidator>
              <TextValidator
                id="email"
                type="email"
                name="email"
                label="Email *"
                onChange = {registerChangeHandler}
                value={email}
                validators={['required', 'isEmail']}
                errorMessages={['required']}
              >
              </TextValidator>
              <TextValidator
                id="password"
                type="password"
                name="password"
                label="Password *"
                onChange = {registerChangeHandler}
                value={password}
                validators={['required']}
                errorMessages={['required']}
              >
              </TextValidator>
              <TextValidator
                id="contact"
                type="text"
                name="contact"
                label="Contact No *"
                onChange = {registerChangeHandler}
                value={contact}
                validators={['required']}
                errorMessages={['required']}
              >
              </TextValidator>
              <p className="registrationStatus" >Registration Successfull. Please login!</p>
        <br />
        <Button 
            variant="contained" 
            color="primary"
            type="submit"
        >
            Register
        </Button>
        </ValidatorForm>
      </TabPanel>
    </div>
  );
}
