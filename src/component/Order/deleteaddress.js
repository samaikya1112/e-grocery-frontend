import axios from "axios";
import React from "react";
import { useState } from "react";
import Nav from "../Nav";
import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
  } from "@mui/material";
  import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
  } from "@mui/material";
function DeleteAddress(){
    const[addressId,setAddressId]=useState("");
    const handleCancel =()=>{
        window.location.href="/placeorder"
    }
    const handleDelete = async (e)=>{
       
    }
    return (
        <div>
            <Nav/>
            <div className="con">
        <h5 style={{ color: "rgb(15, 30, 74)" }}>DELETE ADDRESS</h5>
        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <TextField
            id="product-imageurl-textfield"
            label="Address Id"
            value={addressId}
            onChange={(e) => setAddressId(e.target.value)}
          />
        </FormControl>
        <div className="text-center">
    
            <Button onClick={handleDelete} variant="contained" >
                Delete
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button onClick={handleCancel} variant="contained" color="error">
                Cancel
            </Button>
        
        </div>
        </div>
        </div>
    )
}
export default DeleteAddress;