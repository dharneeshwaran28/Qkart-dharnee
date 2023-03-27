import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import { useHistory, Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
const Register = () => {
  
  const { enqueueSnackbar } = useSnackbar();
  const [valid, setValid] = useState(true);
  const history = useHistory();
  // curl -X POST 
  // -H "Content-Type: application/json" \
  // -d '{"username": "crio.do", "password":“learnbydoing”.}' \
  // https:3.111.207.63:

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  
  //  * Definition for register handler
  //  * - Function to be called when the user clicks on the register button or submits the register form
  //  *
  //  * @param {{ username: string, password: string, confirmPassword: string }} formData
  //  *  Object with values of username, password and confirm password user entered to register
  //  *
  //  * API endpoint - "POST /auth/register"
  //  *
  //  *
  //  * Example for successful response from backend for the API call:
  
  //  * HTTP 201
  //  * {
  //  *      "success": true,
  //  * }
  //  *
  //  * Example for failed response from backend for the API call:
  //  * HTTP 400
  //  * {
  //  *      "success": false,
  //  *      "message": "Username is already taken"
  //  * }
  

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
   const [load, setLoad] = useState(false);
   const [formData, setFormData] = useState({
     username: "",
     password: "",
     confirmPassword: ""
    });
   const [data, setData] = useState({
     username: "",
     password: "",
     confirmPassword: ""
    });
    const handleChange = (event) => {
     setFormData({ ...formData, [event.target.name]: event.target.value });
     setData({ ...data, [event.target.name]: event.target.value });
   };
 
   const register = async (formData) => {
    //  console.log(formData);
     
     try {
      setLoad(true);
       await axios.post(`${config.endpoint}/auth/register`,
        {username: formData.username, password: formData.password});
        enqueueSnackbar("Registered successfully", { success : true });
        history.push('/login')
        setFormData({
         username: "",
         password: "",
         confirmPassword: ""
       });
     } catch (error) {
       if (error.response.status === 400) {
         setLoad(false);
          enqueueSnackbar(error.response.data.message, { variant: "warning" });
         }
         else {
           setLoad(false);
           enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.", { success : false });
         }
       }
       setLoad(false);
      //  console.log("registered");
     };
  
  const validateInput = () => {
    
    if(data.username === "")
    {
      enqueueSnackbar("Username is a required field", {variant: "warning"});
      console.log(data.username);
      setValid(false);
    }
    else if(data.username.length<6){
      enqueueSnackbar("Username must be at least 6 characters", {variant: "warning"});
      setValid(false);
    }
      else if(data.password === "")
      {
        enqueueSnackbar("Password is a required field", {variant: "warning"});
        setValid(false);
      }
      else if(data.password.length<6){
        enqueueSnackbar("Password must be at least 6 characters", {variant: "warning"});
        setValid(false);
      } 
      else if(data.password !== data.confirmPassword)
      { 
        enqueueSnackbar("Passwords do not match", {variant : "warning"});
        setValid(false);
      }
      else{
        setValid(true);
        register(formData) 

      }
      return valid;
    }
  

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          {load?<CircularProgress/>:
           <Button className="button" variant="contained" onClick={validateInput}>
            Register Now
           </Button> }
          <p className="secondary-action">
            Already have an account?{" "}
             <Link className="link" to="/login">
              Login here
             </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
