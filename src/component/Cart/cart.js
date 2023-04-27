import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import CartItem from "./cartitem";
import { Button } from "@mui/material";
import axios from "axios";
import { GET_CART_URL, DELETE_CART_URL } from "./services/cart-service";
import { Modal, button, Card, Image } from "react-bootstrap";

const Cart = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const red200 = "#4C14771A";
  //const background="#F5F1F7";

  const handleOpenModal = () => {
    console.log("modal opened");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const calculateTotalPrice = () => {
    const newTotalAmount = items.reduce((total, item) => {
      let itemTotalPrice = 0;
      item.products.forEach((product) => {
        const price = parseFloat(product.price);
        if (!isNaN(price)) {
          itemTotalPrice += price * item.productCount;
        }
        console.log([price * item.productCount], "priceee......");
      });
      return total + itemTotalPrice;
    }, 0);
    setTotalAmount(newTotalAmount);
  };

  const handleRemoveFromCart = (item) => {
    const newCart = items.filter((cartItem) => cartItem.id !== item.id);
    setItems(newCart);
    calculateTotalPrice(); // Recalculate total price
  };

  const handleQuantityChange = (item, newQuantity) => {
    const newCart = [...items];
    const index = newCart.findIndex((cartItem) => cartItem.id === item.id);
    newCart[index].productCount = isNaN(newQuantity) ? 0 : newQuantity;
    setItems(newCart);
    calculateTotalPrice(); // Recalculate total price
  };

  useEffect(() => {
    calculateTotalPrice(); // Initial calculation of total price
  }, [items]);

  const getCartDetails = async () => {
    try {
      let userName = localStorage.getItem("username");
      const response = await axios.get(`${GET_CART_URL}${userName}`);
      setItems(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCartDetails();
  }, []);

  const uniqueItems = new Set(
    items.map((item) => item?.products?.[0]?.productId)
  );
  const numUniqueItems = uniqueItems.size;
  // const numTotalItems =
  //   items.reduce((acc, item) => acc + item.productCount, 0) || 0;

  // Calculate handling charge
  let handlingCharge = 0;
  if (items.length > 0 && totalAmount < 150) {
    handlingCharge = 10;
  }

  // Calculate delivery fee
  let deliveryFee = 0;
  if (items.length > 0) {
    deliveryFee = totalAmount < 50 ? 35 : 25;
  }

  // Calculate the total amount to pay
  const totalAmountToPay = totalAmount + handlingCharge + deliveryFee;
  localStorage.setItem("totalPrice", totalAmountToPay);

  const handleEmptyCart = async () => {
    setItems([]);
    setTotalAmount(0);
  };

  const handleProceedToCheckout = () => {
    // Clear the cart items
    setItems([]);
    setTotalAmount(0); // Set totalAmount to 0
    // try {
    //   const response = await axios.delete(`${DELETE_CART_URL}${items.cartId}`);
    //   console.log(response.data, "deleting data");
    //   window.location.reload();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div style={{ backgroundColor: "" }}>
      <Nav />
      <br></br>
      <br></br>
      <br></br>
      <div className="container-fluid py-100 bg-light">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "83%",
            marginLeft: "150px",
          }}
        >
          <h5>Cart: ({numUniqueItems} item)</h5>
          <button className="btn btn-outline-danger" onClick={handleEmptyCart}>
            Empty Cart
          </button>
        </div>
        <br></br>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="card card shadow"
              style={{
                width: "80%",
                marginLeft: "150px ",
                textAlign: "center",
              }}
            >
              <div className="card-body">
                {items.length === 0 ? (
                  <div className="col-sm-12 text-center">
                    <img
                      src="https://i.imgur.com/dCdflKN.png"
                      alt="img"
                      style={{ width: "100px", height: "100px" }}
                      className="img-fluid mb-4 mr-3"
                    />
                    <h3>
                      <strong>Your Cart is Empty</strong>
                    </h3>
                    <h4>Add something to make me happy :)</h4>
                    <a
                      href="/products"
                      className="btn btn-primary cart-btn-transform m-3"
                      data-abc="true"
                      style={{ color: "black" }}
                    >
                      continue shopping
                    </a>
                  </div>
                ) : (
                  <>
                    {items.map((item) => (
                      <CartItem
                        key={item.productId}
                        item={item}
                        products={item.products}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleQuantityChange={handleQuantityChange}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>

            <br></br>
            <div
              className="card card shadow"
              style={{
                width: "80%",
                marginLeft: "150px ",
                textAlign: "center",
              }}
            >
              <div className="card-body">
                <div className="col-sm-10 text-center">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "50px ",
                    }}
                  >
                    <img
                      src="https://cdn.zeptonow.com/app/images/zeptonian-riding.png?tr=w-640,q-70"
                      alt="delivery-partner-safety"
                      style={{ width: "80px", height: "50px" }}
                      className="img-fluid mb-100 mr-50"
                    />
                    &nbsp;&nbsp;
                    <h6>
                      <strong>
                        See how we ensure our delivery partner’s safety{" "}
                        <a
                          style={{ color: "red" }}
                          href="#"
                          onClick={handleOpenModal}
                        >
                          Learn more
                        </a>
                      </strong>
                    </h6>
                    <Modal show={isModalOpen} onHide={handleCloseModal}>
                      <Modal.Body>
                        <div className="text-center">
                          <img
                            src="https://cdn.zeptonow.com/app/images/zeptonian-riding.png?tr=w-640,q-70"
                            alt="delivery-partner-safety"
                            style={{ width: "150px", height: "150px" }}
                          />
                        </div>
                        <h3 style={{ textAlign: "center" }}>
                          Here's how we do it
                        </h3>
                        <br></br>
                        <div
                          className="card shadow mb-2 text-center $red-200"
                          style={{ backgroundColor: red200 }}
                        >
                          <p style={{ paddingTop: "10px" }}>
                            <img
                              style={{ width: "30px", height: "30px" }}
                              src="https://cdn.zeptonow.com/app/images/lucide_bike.png?tr=w-1080,q-70"
                            />
                            No penalties for late deliveries & no incentives for
                            on-time deliveries
                          </p>
                        </div>
                        <div
                          className="card shadow mb-2 text-center"
                          style={{ backgroundColor: red200 }}
                        >
                          <p style={{ paddingTop: "10px" }}>
                            <img
                              style={{ width: "30px", height: "30px" }}
                              src="https://cdn.zeptonow.com/app/images/lucide_timer.png?tr=w-1080,q-70"
                            />
                            Delivery partners ride safely at an average speed of
                            15kmph per delivery
                          </p>
                        </div>
                        <div
                          className=" card shadow mb-2 text-center"
                          style={{ backgroundColor: red200 }}
                        >
                          <p style={{ paddingTop: "10px" }}>
                            <img
                              style={{ width: "30px", height: "30px" }}
                              src="https://cdn.zeptonow.com/app/images/lucide_megaphone.png?tr=w-1080,q-70"
                            />
                            Delivery partners are not informed about promised
                            delivery time
                          </p>
                        </div>
                      </Modal.Body>
                      <button
                        className="btn btn-danger mb-3 "
                        style={{ marginLeft: "20px", marginRight: "20px" }}
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="card card shadow" style={{ marginRight: "40px" }}>
              <div className="card-body">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5 className="card-title">Item Total:</h5>
                  <h5 className="card-title">₹{totalAmount}</h5>
                </div>
                <p className="card-text ">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Handling Charge:</span>
                    <span>₹{handlingCharge}</span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Delivery Fee:</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>
                      <strong>Total Amount To Pay:</strong>
                    </span>
                    <span>
                      <strong>₹{totalAmountToPay.toFixed(2)}</strong>
                    </span>
                  </div>
                </p>
                <Button variant="contained">
                  <a
                    href="/placeorder"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Proceed to Checkout
                  </a>
                </Button>
                &nbsp;&nbsp;
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleProceedToCheckout}
                >
                  <a
                    href="/products"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Cancel
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
