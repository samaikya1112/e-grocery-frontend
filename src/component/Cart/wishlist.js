import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import WishlistItem from "./wishlistItem";
import axios from "axios";
import { Button } from "@mui/material";
import {GET_WISHLIST_URL} from "./services/cart-service";


const Wishlist = ({ wishlistItems }) => {
  const [wishlist, setWishlist] = useState([]);

  //const background="#F5F1F7";

  const handleRemoveWishlist = (item) => {
    const newCart = wishlist.filter((WishlistItem) => WishlistItem.id !== item.id);
    setWishlist(newCart);
  };

  const handleEmptyWishlist = () => {
    setWishlist([]);
  };

  const getWishList = async () => {
    try {
      let userName=localStorage.getItem("username");
      const response = await axios.get(`${GET_WISHLIST_URL}${userName}`);
      console.log(response.data[0].products.imageUrl);
      setWishlist(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <div>
      <Nav/><br></br><br></br>
      <div className="container mt-4" style={{paddingTop: "50px"}}>
        <h3 className="mb-3 text-center"></h3>
        <div className="row">
          {wishlist.length === 0 ? (
            <div className="col-sm-12 empty-cart-cls text-center">
              <img src="https://thumbs.dreamstime.com/b/wishlist-icon-comic-style-like-document-cartoon-vector-illustration-white-isolated-background-favorite-list-splash-effect-218065056.jpg" alt="img" style={{ width: "100px", height: "100px" }} className="img-fluid mb-4 mr-3" />
              <h3><strong>Your wishlist is Empty</strong></h3>
              <h4>Add something to make me happy :)</h4>
              <a href="/products" className="btn btn-primary cart-btn-transform m-3" data-abc="true" style={{ color: "black" }}>continue shopping</a>
            </div>
          ) : (
            <>
              <div style={{position: "absolute", top: "100px", left: "10px"}}>
                <Button variant="contained" color="primary" onClick={handleEmptyWishlist} size="small">
                  Empty Wishlist
                </Button>
              </div>
              {wishlist.map((item) => (
                <WishlistItem
                  key={item.productId}
                  item={item}
                  products={item.products}
                  handleRemoveWishlist={handleRemoveWishlist}
                />
              ))}
            </>
          )}
        </div>
       
      </div>
    </div>
  );
};

export default Wishlist;
