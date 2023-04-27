import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import Nav from "../Nav";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
function Login() {
  const [user, setUser] = useState({ userName: "", password: "" });
  const [loginErrorMessage, setLoginErrorMessage] = useState();
  const theme = createTheme();
  const[snackBar,setSnackBar]=useState(false)
  
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!user.userName) {
      setUserNameError("email is required");
    }

    if (!user.password) {
      setPasswordError( "Password is required");
    }

    console.log(user);
    console.log(localStorage.getItem("userId"), "userid");
    console.log(localStorage.getItem("mobileNumber"))
    axios
      .post(
        "http://localhost:8084/users/login",
        {},
        {
          params: user,
        }
      )

      .then((response) => {
        if (response.data.message === "Login Successfull") {
          localStorage.setItem("status", "true");
          console.log(response.data.message);
          console.log(response.data.mobileNumber)

          
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("username", response.data.userName);
          localStorage.setItem("userId", response.data.userid);
          localStorage.setItem("mobileNumber",response.data.mobileNumber)
          if (response.data.role === "CUSTOMER") {
            navigate("/products");
            
          } else if (response.data.role === "ADMIN") {
            navigate("/viewproducts");
          }
        } else {
          setLoginErrorMessage(response.data.message);
          console.log(response,"---------------")
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const handleEmailChange = (e) => {
    setUser((prevValues) => ({
      ...prevValues,
      userName: e.target.value,
    }));
    validateEmail(e.target.value);
  };
  const validateEmail = (email) => {
    // email validation regex
    const re = /\S+@\S+\.\S+/;
    if (!email) {
      //errors.userName=('email is required');
      setUserNameError("email is required");
    } else if (!re.test(email)) {
      //errors.userName=('Invalid email format');
      setUserNameError("Invalid email format");
    } else {
      //errors.userName=('');
      setUserNameError("");
    }
  };
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
    if (!password) {
    setPasswordError("Password is required");
    } else if (!passwordRegex.test(password)) {
      
      setPasswordError(  "Password must be 6-20 characters long, contain at least one number, one letter, and one special character.");
    } else {
      setPasswordError("");
    }
  };
  const handlePasswordChange = (e) => {
    setUser((prevValues) => ({
      ...prevValues,
      password: e.target.value,
    }));
    const newPassword = e.target.value;
    validatePassword(e.target.value);
  };
  return (
    <div>
      <Nav />
      <br></br>
      <br></br>
      <div>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleFormSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="userName"
                  value={user.userName}
                  onChange={handleEmailChange}
                  error={Boolean(userNameError)}
                  helperText={userNameError}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  value={user.password}
                  onChange={handlePasswordChange}
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
               
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                
                  
                  <Grid item xs>
                    <Link href="/register" variant="body2" style={{marginLeft:"80px"}}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
               
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Login;

