import React, { useState } from "react";
import axios from "axios";
import Nav from "../Nav";
import { Modal } from "react-bootstrap";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { CREATE_ORDER, PAY_BILL } from "./service/payment-service";
const Paybill = () => {
  const [id, setId] = useState("");
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [cno, setCno] = useState("");
  const [cvv, setCvv] = useState("");
  const [exp_month, setExpMonth] = useState("");
  const [exp_year, setExpYear] = useState("");
  const userId = localStorage.getItem("userId");
  const [idError, setIdError] = useState("");
  const [pinError, setPinError] = useState("");
  const [nameError, setNameError] = useState("");
  const [cnoError, setCnoError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [expMonthError, setExpMonthError] = useState("");
  const [expYearError, setExpYearError] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInput = (e, setState, setErrorState) => {
    setState(e.target.value);
    setErrorState("");
  };

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleOpenModal = async (e) => {
    console.log("modal opened");

    e.preventDefault();
    let hasError = false;
    if (paymentType === "1") {
      if (!id) {
        setIdError("Please Enter UPI ID");
        hasError = true;
      } else {
        setIdError("");
      }

      if (pin.length !== 4 && pin.length !== 6) {
        setPinError("Invalid UPI PIN");
        hasError = true;
      } else {
        setPinError("");
      }
    } else if (paymentType === "2") {
      if (!name) {
        setNameError("Please Enter Name");
        hasError = true;
      } else {
        setNameError("");
      }
      if (cno.length !== 12) {
        setCnoError("Invalid Card No");
        hasError = true;
      } else {
        setCnoError("");
      }

      if (cvv.toString().length !== 3) {
        setCvvError("Invalid CVV");
        hasError = true;
      } else {
        setCvvError("");
      }

      if (!exp_month) {
        setExpMonthError("Please Enter Exp Month");
        hasError = true;
      } else {
        setExpMonthError("");
      }

      if (!exp_year) {
        setExpYearError("Please Select Exp Year");
        hasError = true;
      } else {
        setExpYearError("");
      }
    } else if (paymentType === "0") {
    }
    if (hasError) {
      return;
    }
    const payment = {
      amount: localStorage.getItem("totalPrice"),
      date: new Date(),
      type: paymentType,
    };

    console.log("Payment Details", payment);

    axios
      .post(PAY_BILL, {
        ...payment,
        userId: userId,
      })
      .then((resp) => {
        console.log(resp, "payment response");

        const order = {
          orderDate: new Date(),
          status: 0,
          addressId: localStorage.getItem("addressId"),
          deliveryId: localStorage.getItem("deliveryId"),
          userId: localStorage.getItem("userId"),
          paymentId: resp.data.paymentId,
        };
        console.log("addressId:----", localStorage.getItem("addressId"));
        axios
          .post(CREATE_ORDER, order)
          .then((res) => {
            console.log("order created.....", res);
            setIsModalOpen(true);
            setTimeout(() => {
              window.location.href = "/viewbill";
            }, 1000);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error, "catch block");
      });
  };

  const renderPaymentForm = () => {
    switch (paymentType) {
      case "0":
        return (
          <div>
            <div className="con">
              <h5 style={{ color: "rgb(15, 30, 74)" }}> Pay Using Cash</h5>
              <FormControl
                variant="outlined"
                value="0"
                size="sm"
                margin="normal"
                className="form-control"
              >
                <TextField
                  label="Amount"
                  value={localStorage.getItem("totalPrice")}
                  fullWidth
                />
              </FormControl>
              <br></br>

              <div className="text-center">
                {" "}
                <Button>
                  {" "}
                  <a href="/payment" className="btn btn-danger">
                    {" "}
                    Cancel{" "}
                  </a>{" "}
                </Button>
                &nbsp;&nbsp;{" "}
                <Button
                  onClick={handleOpenModal}
                  variant="contained"
                  type="submit"
                >
                  Paybill
                </Button>
                <Modal
                  show={isModalOpen}
                  onHide={handleCloseModal}
                  style={{
                    height: "100vh",
                    width: "100vw",
                    marginTop: "100px",
                  }}
                >
                  <Modal.Body>
                    <div className="text-center">
                      <img
                        src="https://funtura.in/lko/wp-content/themes/funtura/assets/images/success.svg"
                        alt="payment"
                        style={{ width: "150px", height: "150px" }}
                      />
                    </div>
                    <h2>
                      <center>Order Successful</center>
                    </h2>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        );

      case "1":
        return (
          <div>
            <div className="con">
              <h5 style={{ color: "rgb(15, 30, 74)" }}> Pay Using UPI</h5>
              <FormControl
                variant="outlined"
                value="1"
                size="sm"
                margin="normal"
                className="form-control"
              >
                <TextField
                  label="Amount"
                  value={localStorage.getItem("totalPrice")}
                 
                />
              </FormControl>
              <br></br>
              <FormControl
                variant="outlined"
                size="sm"
                margin="normal"
                className="form-control"
              >
                {" "}
                <TextField
                  id="product-street-textfield"
                  label="Upi_Id"
                  value={id}
                  onChange={(e) => handleInput(e, setId, setIdError)}
                  error={Boolean(idError)}
                  helperText={idError}
                  fullWidth
                />{" "}
              </FormControl>
              <br></br>
              <FormControl
                variant="outlined"
                size="sm"
                margin="normal"
                className="form-control"
              >
                {" "}
                <TextField
                  id="product-street-textfield"
                  label="Upi_Pin"
                  value={pin}
                  onChange={(e) => handleInput(e, setPin, setPinError)}
                  error={Boolean(pinError)}
                  helperText={pinError}
                />{" "}
              </FormControl>
              <br></br>
              <div className="text-center">
                {" "}
                <Button>
                  {" "}
                  <a href="/payment" className="btn btn-danger">
                    Cancel{" "}
                  </a>{" "}
                </Button>{" "}
                &nbsp;&nbsp;{" "}
                <Button
                  onClick={handleOpenModal}
                  variant="contained"
                  type="submit"
                >
                  Paybill
                </Button>
                <Modal
                  show={isModalOpen}
                  onHide={handleCloseModal}
                  style={{
                    height: "100vh",
                    width: "100vw",
                    marginTop: "100px",
                  }}
                >
                  <Modal.Body>
                    <div className="text-center">
                      <img
                        src="https://funtura.in/lko/wp-content/themes/funtura/assets/images/success.svg"
                        alt="payment"
                        style={{ width: "150px", height: "150px" }}
                      />
                    </div>
                    <h2>
                      <center>Order Successful</center>
                    </h2>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        );

      case "2":
        return (
          <div>
            <div className="con">
              <h5 style={{ color: "rgb(15, 30, 74)" }}> Pay Using Card</h5>
              <FormControl
                variant="outlined"
                value="2"
                size="sm"
                margin="normal"
                className="form-control"
              >
                <TextField
                  label="Amount"
                  value={localStorage.getItem("totalPrice")}
                
                />
              </FormControl>
              <br></br>
              <FormControl
                variant="outlined"
                size="sm"
                margin="normal"
                className="form-control"
              >
                {" "}
                <TextField
                  id="product-street-textfield"
                  label="Card Holder Name"
                  value={name}
                  onChange={(e) => handleInput(e, setName, setNameError)}
                  error={Boolean(nameError)}
                  helperText={nameError}
                  fullWidth
                />{" "}
              </FormControl>
              <br></br>
              <FormControl
                variant="outlined"
                size="sm"
                margin="normal"
                className="form-control"
              >
                {" "}
                <TextField
                  id="product-street-textfield"
                  label="Card Number"
                  value={cno}
                  onChange={(e) => handleInput(e, setCno, setCnoError)}
                  error={Boolean(cnoError)}
                  helperText={cnoError}
                  fullWidth
                />{" "}
              </FormControl>
              <br></br>
              <FormControl
                variant="outlined"
                size="sm"
                margin="normal"
                className="form-control"
              >
                {" "}
                <TextField
                  id="product-street-textfield"
                  label="Enter CVV"
                  value={cvv}
                  onChange={(e) => handleInput(e, setCvv, setCvvError)}
                  error={Boolean(cvvError)}
                  helperText={cvvError}
                  fullWidth
                />{" "}
              </FormControl>
              <br></br>
              <FormControl
                className="form-control"
                variant="outlined"
                size="sl"
                margin="normal"
              >
                {" "}
                <InputLabel id="category-select-label">Exp_month</InputLabel>
                <Select
                  className="select-control"
                  labelId="category-select-label"
                  id="category-select"
                  label="Category"
                  value={exp_month}
                  onChange={(e) =>
                    handleInput(e, setExpMonth, setExpMonthError)
                  }
                  error={Boolean(expMonthError)}
                  helperText={expMonthError}
                  fullWidth
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                  <MenuItem value="8">8</MenuItem>
                  <MenuItem value="9">9</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                  <MenuItem value="11">11</MenuItem>
                  <MenuItem value="12">12</MenuItem>
                </Select>
              </FormControl>
              <br></br>
              <FormControl
                className="form-control"
                variant="outlined"
                size="sl"
                margin="normal"
              >
                {" "}
                <InputLabel id="category-select-label">Exp_year</InputLabel>
                <Select
                  className="select-control"
                  labelId="category-select-label"
                  id="category-select"
                  label="Category"
                  value={exp_year}
                  onChange={(e) => handleInput(e, setExpYear, setExpYearError)}
                  error={Boolean(expYearError)}
                  helperText={expYearError}
                  fullWidth
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2026">2026</MenuItem>
                  <MenuItem value="2027">2027</MenuItem>
                  <MenuItem value="2028">2028</MenuItem>
                  <MenuItem value="2029">2029</MenuItem>
                  <MenuItem value="2030">2030</MenuItem>
                  <MenuItem value="2031">2031</MenuItem>
                  <MenuItem value="2032">2032</MenuItem>
                  <MenuItem value="2033">2033</MenuItem>
                  <MenuItem value="2034">2034</MenuItem>
                  <MenuItem value="2035">2035</MenuItem>
                  <MenuItem value="2036">2036</MenuItem>
                </Select>
              </FormControl>
              <br></br>
              <br></br>
              <div className="text-center">
                {" "}
                <Button>
                  {" "}
                  <a href="/payment" className="btn btn-danger">
                    Cancel{" "}
                  </a>{" "}
                </Button>
                &nbsp;&nbsp;{" "}
                <Button
                  onClick={handleOpenModal}
                  variant="contained"
                  type="submit"
                >
                  Paybill
                </Button>
                <Modal
                  show={isModalOpen}
                  onHide={handleCloseModal}
                  style={{
                    height: "100vh",
                    width: "100vw",
                    marginTop: "100px",
                  }}
                >
                  <Modal.Body>
                    <div className="text-center">
                      <img
                        src="https://funtura.in/lko/wp-content/themes/funtura/assets/images/success.svg"
                        alt="payment"
                        style={{ width: "150px", height: "150px" }}
                      />
                    </div>
                    <h2>
                      <center>Order Successful</center>
                    </h2>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="option_class text-center">
      <Nav></Nav>
      <br></br>
      <br></br>
      <br></br>
      <h2>Payment</h2>
      <label>
        <input
          type="radio"
          value="0"
          checked={paymentType === "0"}
          onChange={handlePaymentTypeChange}
        />
        Cash
      </label>
      &nbsp;&nbsp;
      <label>
        <input
          type="radio"
          value="1"
          checked={paymentType === "1"}
          onChange={handlePaymentTypeChange}
        />
        UPI
      </label>
      &nbsp;&nbsp;
      <label>
        <input
          type="radio"
          value="2"
          checked={paymentType === "2"}
          onChange={handlePaymentTypeChange}
        />
        Card
      </label>
      &nbsp;&nbsp;
      <br></br>
      <br></br>
      <div>{renderPaymentForm()}</div>
    </div>
  );
};
export default Paybill;
