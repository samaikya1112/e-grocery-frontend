import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ADD_TO_CART_URL, WISHLIST_DELETE_URL} from "./services/cart-service";


const WishlistItem = ({ item, products}) => {
  console.log(item.data,"items...");
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  //const [wishlistId, setWishlistId] = useState("");

  const handleAddToCart2 = async () => {
    setIsAddedToCart(true);
    console.log("product details", products);
  
    const cartDTO = {
      productCount: 0,
      productId:  products[0].productId,
      totalPrice: products[0].price,
      userid: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName")
    };
  
    console.log(cartDTO, "cartdto");
  
    try {
      const response = await axios.post(ADD_TO_CART_URL, cartDTO);
      console.log(response, "cart item adding");
  
      await axios.delete(
        `${WISHLIST_DELETE_URL}${item.wishlistId}`
      );
      console.log("wishlistId id:", item.wishlistId);
  
      setIsAddedToCart(false);
      toast.success("Item added to cart successfully!", { autoClose: 600 });
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsAddedToCart(false);
      toast.error("product already in cart", { autoClose: 600 });
    }
  };
      
  

  const handleRemoveClick = async () => {
    try {
      const response = await axios.delete(`${WISHLIST_DELETE_URL}${item.wishlistId}`);
      console.log("wishlistId id:",item.wishlistId);
      console.log(response.data, "deleting data");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <Card className="shadow"  style={{ width: "16rem" }}>
        <Card.Img variant="top" src={`data:image/jpeg;base64,${products[0].image}`}
          style={{ height: "10rem" }}/>
        <Card.Body>
          <Card.Title>{products[0].productName}</Card.Title>
          <Card.Text>
            {products[0].description}
            <br />
            Price: ₹{products[0].price}
          </Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="danger" onClick={handleRemoveClick}>
              Remove
            </Button>
            <Button variant="primary" onClick={handleAddToCart2}>
              Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default WishlistItem;
