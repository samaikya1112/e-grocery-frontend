import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {UPDATE_CART_URL, DELETE_CART_URL} from "./services/cart-service";



const CartItem = ({ item, products, handleQuantityChange, handleOpenModal }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(item.products[0].price * item.productCount);

  const updateCartDetails = async () => {
    try {
      const newTotalPrice = products[0].price * quantity;
      setTotalPrice(newTotalPrice);
      console.log("newTotalPrice", newTotalPrice);
      console.log(products)
      const data = {
        productCount: quantity,
        productId: products[0].productId,
        totalPrice: totalPrice,
        userName: localStorage.getItem("userName"),
        userid: localStorage.getItem("userId"),
      };

      const response = await axios.put(`${UPDATE_CART_URL}${item.cartId}`, data);
      console.log(response.data, "updated cart price");
     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateCartDetails();
  }, [quantity]);

  const handleRemoveClick = async () => {
    try {
      const response = await axios.delete(`${DELETE_CART_URL}${item.cartId}`);
      console.log(response.data, "deleting data");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    handleQuantityChange(item, newQuantity);
  };

  console.log("quantity value=", quantity);

  const handleQuantityDecrease = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      handleQuantityChange(item, newQuantity);
    }
  };
  return (
    <section>
      <div className="card mb-3" >
        <div className="card-body" >
          {products.map((product, index) => (
            <div key={index} className="row align-items-center">
              <div className="col-md-2">
                <img
                  src={`data:image/jpeg;base64,${product.image}`}
                  style={{ height: "5rem", width: "6rem" }}
                  className="card-img"
                  alt="product"
                />
              </div>
              <div className="col-md-2">{product.productName}</div>
              <div className="col-md-1">₹{product.price}</div>
              <div className="col-md-2">
                <div
                  className="btn-group "
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleQuantityDecrease}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleQuantityChange}
                  >
                    {quantity}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleQuantityIncrease}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col-md-3 d-flex">
                <div className="w-100">
                  <button
                    className="btn btn-danger w-100"
                    onClick={handleRemoveClick}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="col-md-2 text-danger" onClick={updateCartDetails}>
                ₹{product.price * quantity}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CartItem;
