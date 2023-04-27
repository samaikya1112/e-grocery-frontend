import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Nav from "../Nav";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";
import { Snackbar, SnackbarContent } from "@mui/material";
import { green } from "@mui/material/colors";
//import API from "./api.json";
const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
});
function Register() {
  const [values, setValues] = useState({
    userName: "",
    mobileNumber: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [bool, setBool] = useState(false);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState();
  const handleOKClick =()=>{
    window.location.href="/login"
  }
  const con = {
    margin: "10px",
  };
  const handleCancel = ()=>{
    window.location.href="/"
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmit(true);
    const errors = validate(values);
    console.log(values);
    axios
      .post(`http://localhost:8084/users/register`, values)
      .then((response) => {
        console.log(response.data);
        // window.alert("Registered successfully");
        setOpen(true);

        if (response.data == "Registered successfully") {
         
          navigate("/login");
        }
      })
      .catch((err) => {
      console.log(err.message);
      });
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log(errors);
    }
  }, [errors]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = (values) => {
    let errors = {};
    const nameRegex = /^[a-zA-Z]{3,20}$/;
    if (!values.userName) {
      setEmailError("email is required");
    }

    if (!values.mobileNumber) {
      errors.mobileNumber = "Mobile number is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    }

    return errors;
  };
  const validateEmail = (email) => {
    // email validation regex
    const re = /\S+@\S+\.\S+/;
    if (!email) {
      //errors.userName=('email is required');
      setEmailError("email is required");
    } else if (!re.test(email)) {
      //errors.userName=('Invalid email format');
      setEmailError("Invalid email format");
    } else {
      //errors.userName=('');
      setEmailError("");
      setBool(true);
    }
    
  };

  const handleEmailChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      userName: e.target.value,
    }));
    validateEmail(e.target.value);
  };

  const validateMobileNumber = (mobileNumber) => {
    // email validation regex
    const phoneNumberRegex = /^[+0-9][-0-9 \d]{7,}$/;
    if (!values.mobileNumber) {
      errors.mobileNumber = "Mobile number is required";
    } else if (!phoneNumberRegex.test(values.mobileNumber)) {
      errors.mobileNumber = "enter valid mobile number";
    } else {
      errors.mobileNumber = "";
    }
  };

  const handleMobileNumberChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      mobileNumber: e.target.value,
    }));
    validateMobileNumber(e.target.value);
  };
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password must be 6-20 characters long, contain at least one number, one letter, and one special character.";
    } else {
      errors.password = "";
    }
  };
  const handlePasswordChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      password: e.target.value,
    }));
    const newPassword = e.target.value;
    validatePassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      role: parseInt(e.target.value),
    }));
    ValidateRole(e.target.value);
  };
  const ValidateRole = (role) => {
    if (!role) {
      errors.role = "role is required";
    } else {
      errors.role = "";
    }
  };

  return (
    <div>
      <Nav />

      <div className="con">
        <h5 style={{ color: "rgb(15, 30, 74)" }}>REGISTER</h5>

        <FormControl
          className="form-control"
          variant="outlined"
          size="sl"
          margin="normal"
        >
          <TextField
            id="userName"
            label="Email"
            type="email"
            value={values.userName}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
            autoComplete="off"
          />
        </FormControl>
        <FormControl
          className="form-control"
          variant="outlined"
          size="sl"
          margin="normal"
        >
          <TextField
            id="mobileNumber"
            label="mobileNumber"
            type="text"
            name="mobileNumber"
            value={values.mobileNumber}
            onChange={handleMobileNumberChange}
            error={!!errors.mobileNumber}
            helperText={errors.mobileNumber}
            autoComplete="off"
          />
        </FormControl>

        <FormControl
          className="form-control"
          variant="outlined"
          size="sl"
          margin="normal"
        >
          <InputLabel id="role">Role</InputLabel>
          <Select
            labelId="role"
            id="role"
            name="role"
            value={values.role}
            label="role"
            onChange={handleRoleChange}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value={0}>ADMIN</MenuItem>
            <MenuItem value={1}>CUSTOMER</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          className="form-control"
          variant="outlined"
          size="sl"
          margin="normal"
        >
          <TextField
            id="password"
            label="password"
            type="password"
            name="password"
            value={values.password}
            onChange={handlePasswordChange}
            error={!!errors.password}
            helperText={errors.password}
            autoComplete="off"
          />
        </FormControl>
        <div className="text-center">
          <Stack direction="row" spacing={7}>
            <Button variant="contained" size="small" color="error" style={con} onClick={handleCancel}>
              Cancel
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="small"
              style={con}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Stack>
        </div>
        <br></br>

        <h6>
          Already registered?
          <a href="/login" style={{ textDecoration: "none" }}>
            {" "}
            login
          </a>
        </h6>
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Register Successfully</DialogTitle>
            <DialogActions>
              <Button onClick={handleOKClick}>OK</Button>
            </DialogActions>
          </Dialog>
      </div>
    </div>
  );
}
export default Register;

