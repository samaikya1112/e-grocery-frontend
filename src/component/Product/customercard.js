import React, { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Stack from "@mui/material/Stack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import {
  ADD_TO_CART_URL,
  ADD_TO_WISHLIST_URL,
} from "../Cart/services/cart-service";
const CustomerCard = ({ product }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

  const handleAddToCart = () => {
    console.log("product details", product);

    const cartDTO = {
      productCount: 0,
      productId: product.productId,
      totalPrice: product.price,
      userid: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName"),
    };
    console.log(cartDTO, "cartdto");

    axios
      .post(ADD_TO_CART_URL, cartDTO)
      .then((res) => {
        console.log(res, "cart item adding");
        setIsAddedToCart(true);
        toast.success("Item added to cart successfully!", { autoClose: 600 });
      })
      .catch((err) => {
        console.error("error occured", err);
        toast.error("product already in cart", { autoClose: 600 });
      });
  };

  const handleAddToWishlist = () => {
    const wishlistDTO = {
      productId: product.productId,
      productPrice: product.price,
      userName: localStorage.getItem("userName"),
      userid: localStorage.getItem("userId"),
    };
    axios
      .post(ADD_TO_WISHLIST_URL, wishlistDTO)
      .then((res) => {
        console.log(res.data.message);
        setIsAddedToWishlist(true);
        toast.success("Item added to wishlist successfully!", {
          autoClose: 600,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("product already in wishlist", { autoClose: 600 });
      });
  };
  const con = {
    margin: "10px",
  };

  return (
    <div>
      <br></br>
      <div
        className="container"
        style={{
          width: "250px",
          height: "350px",
          fontstyle: "italic",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gridGap: "20px",
        }}
      >
        <div className="card-deck">
          <div className="card text-center" style={{ height: "100%" }}>
            <div className="card-block" style={{ height: "80%" }}>
              <br></br>
              <h5
                className="card-title"
                style={{ fontFamily: "Arial", fontSize: "18px" }}
              >
                {product.productName}
              </h5>
              <img
                src={`data:image/jpeg;base64,${product.image}`}
                className="card-img"
                style={{ width: "100px" }}
                alt="..."
              />
              <p
                className="card-text"
                style={{ fontStyle: "italic", overflow: "auto" }}
              >
                {product.description}
              </p>
              <p className="card-text" style={{ overflow: "auto" }}>
                ₹{product.price}/-
              </p>
            </div>
            <br></br>
            <Stack direction="row">
              <Button
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
                size="small"
                color="error"
                style={con}
                disabled={isAddedToCart}
                onClick={handleAddToCart}
              >
                {isAddedToCart ? "Added" : "Add"}
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                variant="contained"
                color="success"
                endIcon={<FavoriteIcon />}
                size="small"
                style={con}
                disabled={isAddedToWishlist}
                onClick={handleAddToWishlist}
              >
                {isAddedToWishlist ? "wishlisted" : "wishlist"}
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
