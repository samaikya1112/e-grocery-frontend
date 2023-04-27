import { useState } from "react";
import Nav from "../Nav";
import "./order.css";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ADD_ADDRESS } from "./order-service/order-service";
function OrderForm() {
  const [housenumber, setHousenumber] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");

  const userId = localStorage.getItem("userId");
const [open,setOpen]=useState(false)
  const [housenumberError, setHousenumberError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [landmarkError, setLandmarkError] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [stateError, setStateError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const regex = "/^d{6}$/";
  const handleInput = (e, setState, setErrorState) => {
    setState(e.target.value);
    setErrorState("");
  };
  const handleOKClick=()=>{
    window.location.href="/placeorder"
  }
  //let user = localStorage.getItem("userId")
  const addaddress = async (e) => {
    e.preventDefault();
    let hasError = false;
    if (!housenumber) {
      setHousenumberError("please enter Housenumber");
      hasError=true
    } else {
      setHousenumberError("");
    }
    if (!street) {
      setStreetError("please enter Street");
      hasError=true
    } else {
      setStreetError("");
    }
    if (!landmark) {
      setLandmarkError("please enter Landmark");
      hasError=true
    } else {
      setLandmarkError("");
    }
    if (!district) {
      setDistrictError("please enter District");
      hasError=true
    } else {
      setDistrictError("");
    }
    if (!state) {
      setStateError("please enter State");
      hasError=true
    } else {
      setStateError("");
    }
    if (!pin) {
      setPincodeError("please enter Pincode");
      hasError=true
    } else {
      setPincodeError("");
    }
    if (hasError) {
      // If there are validation errors, return without sending the request
      return;
    }
    const address = {
      housenumber,
      street,
      state,
      pin,
      landmark,
      district,
    };
    console.log(address);
    axios
      .post(ADD_ADDRESS, {
        ...address,
        userId: userId,
      })
      .then((response) => {
        console.log(response.data);
        setOpen(true)
        //alert("added successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Nav></Nav>
      <br/><br/>
      <div className="con">
        <h5 style={{ color: "rgb(15, 30, 74)" }}>ADD ADDRESS</h5>

        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <TextField
            id="product-houseNumber-textfield"
            label="HouseNumber"
            value={housenumber}
            fullWidth
            onChange={(e) =>
              handleInput(e, setHousenumber, setHousenumberError)
            }
            error={Boolean(housenumberError)}
            helperText={housenumberError}
          />
        </FormControl>
        <br></br>
        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <TextField
            id="product-street-textfield"
            label="Street"
            value={street}
            onChange={(e) => handleInput(e, setStreet, setStreetError)}
            error={Boolean(streetError)}
            helperText={streetError}
            fullWidth
          />
        </FormControl>
        <br></br>
        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <TextField
            id="product-landmark-textfield"
            label="Landmark"
            value={landmark}
            onChange={(e) => handleInput(e, setLandmark, setLandmarkError)}
            error={Boolean(landmarkError)}
            helperText={landmarkError}
            fullWidth
          />
        </FormControl>
        <br></br>
        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <TextField
            id="product-district-textfield"
            label="District"
            value={district}
            onChange={(e) => handleInput(e, setDistrict, setDistrictError)}
            error={Boolean(districtError)}
            helperText={districtError}
            fullWidth
          />
        </FormControl>
        <br></br>
        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <TextField
            id="product-state-textfield"
            label="State"
            type="text"
            value={state}
            onChange={(e) => handleInput(e, setState, setStateError)}
            error={Boolean(stateError)}
            helperText={stateError}
            fullWidth
          />
        </FormControl>
        <br></br>
        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <TextField
            id="product-pincode-textfield"
            label="Pincode"
            value={pin}
            onChange={(e) => handleInput(e, setPin, setPincodeError)}
            error={Boolean(pincodeError)}
            helperText={pincodeError}
            fullWidth
          />
        </FormControl>
        <br></br>
        <div className="text-center">
          <Button>
            <a href="/placeorder" class="btn btn-danger">
              Cancel
            </a>
          </Button>
          &nbsp;&nbsp;
          <Button variant="contained" type="submit" onClick={addaddress}>
            Add Address
          </Button>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Address Added Successfully</DialogTitle>
            <DialogContent>
              <p>Your Address has been successfully added.</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleOKClick} to="/viewproducts">
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
