
import React, { useState } from "react";
import "./all.css";
import axios from "axios";
import ProductCard from "./productcard";

import { FormControl, Select, MenuItem, Button } from "@mui/material";
import CustomerCard from "./customercard";
function ProductByCategory() {
  const [category, setCategory] = useState("");
  const [prop, setProp] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const cardStyle = {
    display: "flex",
    height: "550px",
  };
  const handleCancel=()=>{
    window.location.href="/products"
  }
  const handleViewProduct = (e) => {
    e.preventDefault();
    axios
      //.get(API.customerCategory + category)
      .then((res) => {
        if (res.data == null) {
          alert("no data");
        }
        setProp(res.data);
        setShowForm(true);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div className="m-auto">
      <br></br>
      <form id="product" className="m-auto">
        <FormControl
          label
          variant="standard"
          size="sm"
          style={{ marginLeft: "450px", width: "300px" }}
        >
          <Select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="VEGETABLES">VEGETABLES</MenuItem>
            <MenuItem value="FRUITS">FRUITS</MenuItem>
            <MenuItem value="GRAINS">GRAINS</MenuItem>
            <MenuItem value="OTHER">OTHER</MenuItem>
            <MenuItem value="DAIRY">DAIRY</MenuItem>
            <MenuItem value="MEAT">MEAT</MenuItem>
            <MenuItem value="SEAFOOD">SEA FOOD</MenuItem>
          </Select>
        </FormControl>
       
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewProduct}
          sx={{ ml: 2 }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleCancel}
          sx={{ ml: 2 }}
        >
          Cancel
        </Button>
      </form>
      {showForm && (
        <div className="product-list" style={cardStyle}>
          {prop.map((a) => (
            <CustomerCard key={a.productId} product={a} />
          ))}
        </div>
      )}
    </div>

 
  );
}
export default ProductByCategory;