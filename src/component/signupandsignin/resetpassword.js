import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from "axios";
import Nav from '../Nav';
import {FormControl,Stack} from "@mui/material";
import Logout from "./logout";
const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
});
function ResetPassword() {
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [newPasswordError,setNewPasswordError]=useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [open,setOpen]=useState(false)
  const [msg,setMsg]=useState('');
  const [snackOn,setSetSnackOn]=useState(false);
  
  const con = {
    margin: "10px",
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log();
    if (!userName) {
      setEmailError('username is required');
    }else{
      setEmailError('');
    }
    if (!password) {
      setPasswordError('password is required');
    } else{
      setPasswordError('');
    }
    if(!newPassword){
      setNewPasswordError('password is reqired');
    }else{
      setNewPasswordError('');
    }
     if(!confirmPassword){
      setConfirmPasswordError('confirm password is required');
    }
    else{
      setConfirmPasswordError("");
    }

   
    if(passwordError=="" && emailError=="" && newPasswordError==""){
      axios
      .put(`http://localhost:8084/users/resetpassword?userName=${userName}&password=${password}&newPassword=${newPassword}`)
      .then((response)=>{
      console.log(response.data);
      if(response.data.Message==="enter valid password" || response.data.Message==="enter valid userName" ){
       // window.alert(response.data.Message)
       setOpen(true)
        console.log(response.data.Message)
         setMsg(response.data.Message)
         setSetSnackOn(true);
      }
      else{
        //alert(response.data)
        setOpen(true)
        console.log(response.data)
        setMsg(response.data)
        setSetSnackOn(true);
      }
      })
    .catch((err)=>{
      console.log(err.message);
    })}
  };
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
      validateConfirmPassword(e.target.value);
    };
    const handleuserNameChange = (e) => {
      setuserName(e.target.value);
      validateEmail(e.target.value);
    };
    const handleNewPasswordChange = (e) => {
      setNewPassword(e.target.value);
      validateNewPassword(e.target.value);
    };

  const validateEmail = (userName) => {
    const re = /\S+@\S+\.\S+/;
    if(!userName){
      setEmailError('email is required');
    }
    else if (!re.test(userName)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };
 
  const validateNewPassword = (newPassword) => {
    const re= /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
    if(!newPassword){
      setNewPasswordError("newPassword is required")
    }
    else if (!re.test(newPassword)) {
      setNewPasswordError('Password must be 6-20 characters long, contain at least one number, one letter, and one special character.');
    }
    else if(newPassword===password){
      setNewPasswordError('new password cannot be your previous password');
    }
    else {
      console.log();
      setNewPasswordError('');
    }
  };
  const validateConfirmPassword = (confirmPassword) => {
   console.log(newPassword);
   console.log(confirmPassword)
     if(!(confirmPassword===newPassword)){
   
      setConfirmPasswordError("passords did not match");
    }else if(!confirmPassword){
      setConfirmPasswordError('confirm password is reqired');
    }
    else{
      setConfirmPasswordError("");
    }
  }
  const validatePassword = (password) => {
 
      if (!password) {
        setPasswordError('password is required');
      } else{
        setPasswordError('');
      }
    };
    let s = localStorage.getItem("role")
    console.log(s)
 const handleCancel=()=>{
  if(s==="CUSTOMER"){
    
    window.location.href="/products"
  }
  if(s==="ADMIN"){
    window.location.href="/viewproducts"
  }
 }
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      validatePassword(e.target.value);
    };
 
 

  return (
    <div>
      <Nav />

      <div className="con">
        <h5 style={{ color: "rgb(15, 30, 74)" }}>RESET PASSWORD</h5>

        <FormControl
          className="form-control"
          variant="outlined"
          size="sl"
          margin="normal"
        >
        <TextField
          id="userName"
          label="userName"
          type="userName"
          value={userName}
          onChange={handleuserNameChange}
          error={!!(emailError)}
          helperText={emailError}
          autoComplete="off"
        /></FormControl>
        <FormControl
          className="form-control"
          variant="outlined"
          size="sl"
          margin="normal"
        >
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={!!(passwordError)}
          helperText={passwordError}
        /></FormControl>
        <FormControl
          className="form-control"
          variant="outlined"
          size="sl"
          margin="normal"
        >
        <TextField
          id="newPassword"
          label="New Password"
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          error={!!newPasswordError}
          helperText={newPasswordError}
        /></FormControl>
        <FormControl
          className="form-control"
          variant="outlined"
          size="sl"
          margin="normal"
        >
        <TextField
          id="confirmPassword"
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={Boolean(confirmPasswordError)}
          helperText={confirmPasswordError}
        /></FormControl>
       <div className="text-center">
          <Stack direction="row" spacing={7}>
            <Button variant="contained" size="small" color="error" style={con}>
              <a  style={{textDecoration:'none',color:'white'}} onClick={handleCancel}>Cancel</a>
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="small"
              style={con}
              onClick={handleSubmit}
            >
              Reset
            </Button>
          </Stack>
         
        </div>
        <br></br>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Password Reset Successfully</DialogTitle>
          <DialogContent>
            <p>Your Password  has been successfully updated.</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
   </div>
  );
}

export default ResetPassword;
// import React, { useState } from "react";
// import { Box, Button, TextField, Typography } from "@mui/material";
// import { styled } from "@mui/system";
// import axios from "axios";
// import Nav from "../Nav";
// import { FormControl, Stack } from "@mui/material";
// const StyledForm = styled("form")({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   gap: "1rem",
// });
// function ResetPassword() {
//   const [userName, setuserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [newPasswordError, setNewPasswordError] = useState("");
//   const [msg, setMsg] = useState("");
//   const [snackOn, setSetSnackOn] = useState(false);
//   const con = {
//     margin: "10px",
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log();
//     if (!userName) {
//       setEmailError("username is required");
//     } else {
//       setEmailError("");
//     }
//     if (!password) {
//       setPasswordError("password is required");
//     } else {
//       setPasswordError("");
//     }
//     if (!newPassword) {
//       setNewPasswordError("password is reqired");
//     } else {
//       setNewPasswordError("");
//     }
//     if (passwordError == "" && emailError == "" && newPasswordError == "") {
//       axios
//         .put("http://localhost:8084/users/resetpassword")
//         .then((response) => {
//           console.log(response.data);
//           if (
//             response.data.Message === "enter valid password" ||
//             response.data.Message === "enter valid userName"
//           ) {
//             window.alert(response.data.Message);
//             console.log(response.data.Message);
//             setMsg(response.data.Message);
//             setSetSnackOn(true);
//           } else {
//             alert(response.data);
//             console.log(response.data);
//             setMsg(response.data);
//             setSetSnackOn(true);
//           }
//         })
//         .catch((err) => {
//           console.log(err.message);
//         });
//     }
//   };
//   const handleuserNameChange = (e) => {
//     setuserName(e.target.value);
//     validateEmail(e.target.value);
//   };
//   const handleNewPasswordChange = (e) => {
//     setNewPassword(e.target.value);
//     validateNewPassword(e.target.value);
//   };

//   const validateEmail = (userName) => {
//     const re = /\S+@\S+\.\S+/;
//     if (!userName) {
//       setEmailError("email is required");
//     } else if (!re.test(userName)) {
//       setEmailError("Invalid email format");
//     } else {
//       setEmailError("");
//     }
//   };

//   const validateNewPassword = (newPassword) => {
//     const re =
//       /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
//     if (!newPassword) {
//       setNewPasswordError("newPassword is required");
//     } else if (!re.test(newPassword)) {
//       setNewPasswordError(
//         "Password must be 6-20 characters long, contain at least one number, one letter, and one special character."
//       );
//     } else if (newPassword === password) {
//       setNewPasswordError("new password cannot be your previous password");
//     } else {
//       console.log();
//       setNewPasswordError("");
//     }
//   };

//   const validatePassword = (password) => {
//     if (!password) {
//       setPasswordError("password is required");
//     } else {
//       setPasswordError("");
//     }
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     validatePassword(e.target.value);
//   };

//   return (
//     <div>
//       <Nav />

//       <div className="con">
//         <h5 style={{ color: "rgb(15, 30, 74)" }}>RESET PASSWORD</h5>

//         <FormControl
//           className="form-control"
//           variant="outlined"
//           size="sl"
//           margin="normal"
//         >
//           <TextField
//             id="userName"
//             label="userName"
//             type="userName"
//             value={userName}
//             onChange={handleuserNameChange}
//             error={!!emailError}
//             helperText={emailError}
//             autoComplete="off"
//           />
//         </FormControl>
//         <FormControl
//           className="form-control"
//           variant="outlined"
//           size="sl"
//           margin="normal"
//         >
//           <TextField
//             id="password"
//             label="Password"
//             type="password"
//             value={password}
//             onChange={handlePasswordChange}
//             error={!!passwordError}
//             helperText={passwordError}
//           />
//         </FormControl>
//         <FormControl
//           className="form-control"
//           variant="outlined"
//           size="sl"
//           margin="normal"
//         >
//           <TextField
//             id="newPassword"
//             label="New Password"
//             type="password"
//             value={newPassword}
//             onChange={handleNewPasswordChange}
//             error={!!newPasswordError}
//             helperText={newPasswordError}
//           />
//         </FormControl>

//         <div className="text-center">
//           <Stack direction="row" spacing={7}>
//             <Button variant="contained" size="small" color="error" style={con}>
//               <a
//                 href="/login"
//                 style={{ textDecoration: "none", color: "white" }}
//               >
//                 Cancel
//               </a>
//             </Button>

//             <Button
//               variant="contained"
//               color="primary"
//               size="small"
//               style={con}
//               onClick={handleSubmit}
//             >
//               Reset
//             </Button>
//           </Stack>
//         </div>
//         <br></br>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;

// import React, { useState } from 'react';
// import { Box, Button, TextField, Typography } from '@mui/material';
// import { styled } from '@mui/system';
// import axios from "axios";
// import Nav from '../Nav';
// import {FormControl,Stack} from "@mui/material";
// const StyledForm = styled('form')({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   gap: '1rem',
// });
// function ResetPassword() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [newPasswordError,setNewPasswordError]=useState('');
//   const [confirmPasswordError, setConfirmPasswordError] = useState('');
//   const [msg,setMsg]=useState('');
//   const [snackOn,setSetSnackOn]=useState(false);
//   const con = {
//     margin: "10px",
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email) {
//       setEmailError('email is required');
//     }else{
//       setEmailError('');
//     }
//     if (!password) {
//       setPasswordError('password is required');
//     } else{
//       setPasswordError('');
//     }
//     if(!newPassword){
//       setNewPasswordError('password is reqired');
//     }else{
//       setNewPasswordError('');
//     }
//      if(!confirmPassword){
//       setConfirmPasswordError('conform password is reqired');
//     }
//     else{
//       setConfirmPasswordError("");
//     }

//     if(passwordError=="" && emailError=="" && confirmPasswordError==""&& newPasswordError==""){
//       axios
//       .put(`http://localhost:9191/ `)
//       .then((response)=>{
//       console.log(response.data);
//       if(response.data.Message==="enter valid password" || response.data.Message==="enter valid userName" ){
//         window.alert(response.data.Message)
//         console.log(response.data.Message)
//          setMsg(response.data.Message)
//          setSetSnackOn(true);
//       }
//       else{
//         alert(response.data)
//         console.log(response.data)
//         setMsg(response.data)
//         setSetSnackOn(true);
//       }
//       })
//     .catch((err)=>{
//       console.log(err.message);
//     })}
//   };
//     const handleConfirmPasswordChange = (e) => {
//       setConfirmPassword(e.target.value);
//       validateConfirmPassword(e.target.value);
//     };
//     const handleEmailChange = (e) => {
//       setEmail(e.target.value);
//       validateEmail(e.target.value);
//     };
//     const handleNewPasswordChange = (e) => {
//       setNewPassword(e.target.value);
//       validateNewPassword(e.target.value);
//     };

//   const validateEmail = (email) => {
//     const re = /\S+@\S+\.\S+/;
//     if(!email){
//       setEmailError('email is required');
//     }
//     else if (!re.test(email)) {
//       setEmailError('Invalid email format');
//     } else {
//       setEmailError('');
//     }
//   };

//   const validateNewPassword = (newPassword) => {
//     const re= /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
//     if(!newPassword){
//       setNewPasswordError("newPassword is required")
//     }
//     else if (!re.test(newPassword)) {
//       setNewPasswordError('Password must be 6-20 characters long, contain at least one number, one letter, and one special character.');
//     }
//     else if(newPassword===password){
//       setNewPasswordError('new password cannot be your previous password');
//     }
//     else {
//       console.log("jai");
//       setNewPasswordError('');
//     }
//   };
//   const validateConfirmPassword = (confirmPassword) => {
//    console.log(newPassword);
//    console.log(confirmPassword)
//      if(!(confirmPassword===newPassword)){

//       setConfirmPasswordError("passords did not match");
//     }else if(!confirmPassword){
//       setConfirmPasswordError('conform password is reqired');
//     }
//     else{
//       setConfirmPasswordError("");
//     }
//   }
//   const validatePassword = (password) => {

//       if (!password) {
//         setPasswordError('password is required');
//       } else{
//         setPasswordError('');
//       }
//     };

//     const handlePasswordChange = (e) => {
//       setPassword(e.target.value);
//       validatePassword(e.target.value);
//     };

//   return (
//     <div>
//       <Nav />

//       <div className="con">
//         <h5 style={{ color: "rgb(15, 30, 74)" }}>RESET PASSWORD</h5>

//         <FormControl
//           className="form-control"
//           variant="outlined"
//           size="sl"
//           margin="normal"
//         >
//         <TextField
//           id="email"
//           label="Email"
//           type="email"
//           value={email}
//           onChange={handleEmailChange}
//           error={!!(emailError)}
//           helperText={emailError}
//           autoComplete="off"
//         /></FormControl>
//         <FormControl
//           className="form-control"
//           variant="outlined"
//           size="sl"
//           margin="normal"
//         >
//         <TextField
//           id="password"
//           label="Password"
//           type="password"
//           value={password}
//           onChange={handlePasswordChange}
//           error={!!(passwordError)}
//           helperText={passwordError}
//         /></FormControl>
//         <FormControl
//           className="form-control"
//           variant="outlined"
//           size="sl"
//           margin="normal"
//         >
//         <TextField
//           id="newPassword"
//           label="New Password"
//           type="password"
//           value={newPassword}
//           onChange={handleNewPasswordChange}
//           error={!!newPasswordError}
//           helperText={newPasswordError}
//         /></FormControl>
//         <FormControl
//           className="form-control"
//           variant="outlined"
//           size="sl"
//           margin="normal"
//         >
//         <TextField
//           id="confirmPassword"
//           label="Confirm New Password"
//           type="password"
//           value={confirmPassword}
//           onChange={handleConfirmPasswordChange}
//           error={Boolean(confirmPasswordError)}
//           helperText={confirmPasswordError}
//         /></FormControl>
//        <div className="text-center">
//           <Stack direction="row" spacing={7}>
//             <Button variant="contained" size="small" color="error" style={con}>
//               <a href='/login' style={{textDecoration:'none',color:'white'}}>Cancel</a>
//             </Button>

//             <Button
//               variant="contained"
//               color="primary"
//               size="small"
//               style={con}
//               onClick={handleSubmit}
//             >
//               Register
//             </Button>
//           </Stack>
//         </div>
//         <br></br>

//    </div>
//     </div>
//   );
// }

// export default ResetPassword;
