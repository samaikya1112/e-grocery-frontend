import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import "./all.css";
import CustomerCard from "./customercard";
import { List, CardMedia, Typography } from "@mui/material";
import { FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Card } from "react-bootstrap";
import { GET_ALL_PRODUCTS, GET_BY_PRODUCT } from "./service/product-service";
function ViewAllProducts() {
  const [prop, setProp] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  const filteredProducts = prop.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProduct = (category) => {
    axios
      .get(`${GET_BY_PRODUCT}${category}`)
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

  const handleCancel = () => {
    window.location.href = "/products";
  };
  const [showForm, setShowForm] = useState("");
  useEffect(() => {
    try {
      axios.get(GET_ALL_PRODUCTS).then((res) => {
        setProp(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <div>
      <Nav />
      <br></br>
      <br></br>
      <div>
        <Box display="flex" alignItems="center">
          <FormControl>
            <TextField
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              style={{ marginLeft: "192px" }}
              placeholder="Search"
            />
          </FormControl>
        </Box>
      </div>
      <div className="parent-container">
        <div class="sidebar">
          <List style={{ color: "black" }}>
            <div>
              <Card style={{ cursor: "pointer", margin: "10px" }}>
                <CardMedia
                  style={{ padding: "5px" }}
                  component="img"
                  height="70"
                  image="/images/all.jpg"
                  onClick={handleCancel}
                />
                <Typography
                  align="center"
                  style={{ fontSize: "14px", marginBottom: "5px" }}
                >
                  All Products
                </Typography>
              </Card>
            </div>

            <div>
              <Card style={{ cursor: "pointer", margin: "10px" }}>
                <CardMedia
                  style={{ padding: "5px" }}
                  component="img"
                  height="70"
                  image="/images/vege.jpg"
                  onClick={() => handleViewProduct("VEGETABLES")}
                />
                <Typography
                  align="center"
                  style={{ fontSize: "14px", marginBottom: "5px" }}
                >
                  vegetables
                </Typography>
              </Card>
            </div>

            <div>
              <Card style={{ cursor: "pointer", margin: "10px" }}>
                <CardMedia
                  style={{ padding: "5px" }}
                  component="img"
                  height="70"
                  image="/images/fruits.jpg"
                  onClick={() => handleViewProduct("FRUITS")}
                />
                <Typography
                  align="center"
                  style={{ fontSize: "14px", marginBottom: "5px" }}
                >
                  Fruits
                </Typography>
              </Card>
            </div>

            <div>
              <Card style={{ cursor: "pointer", margin: "10px" }}>
                <CardMedia
                  style={{ padding: "5px" }}
                  component="img"
                  height="70"
                  image="/images/grains.jpg"
                  onClick={() => handleViewProduct("GRAINS")}
                />
                <Typography
                  align="center"
                  style={{ fontSize: "14px", marginBottom: "5px" }}
                >
                  Grains
                </Typography>
              </Card>
            </div>
            <div>
              <Card style={{ cursor: "pointer", margin: "10px" }}>
                <CardMedia
                  style={{ padding: "5px" }}
                  component="img"
                  height="70"
                  image="/images/other.jpg"
                  onClick={() => handleViewProduct("OTHER")}
                />
                <Typography
                  align="center"
                  style={{ fontSize: "14px", marginBottom: "5px" }}
                >
                  All Snacks
                </Typography>
              </Card>
            </div>
            <div>
              <Card style={{ cursor: "pointer", margin: "10px" }}>
                <CardMedia
                  style={{ padding: "5px" }}
                  component="img"
                  height="70"
                  image="/images/dairy.jpg"
                  onClick={() => handleViewProduct("DAIRY")}
                />
                <Typography
                  align="center"
                  style={{ fontSize: "14px", marginBottom: "5px" }}
                >
                  Dairy
                </Typography>
              </Card>
            </div>
            <div>
              <Card style={{ cursor: "pointer", margin: "10px" }}>
                <CardMedia
                  style={{ padding: "5px" }}
                  component="img"
                  height="70"
                  image="/images/meat.jpg"
                  onClick={() => handleViewProduct("MEAT")}
                />
                <Typography
                  align="center"
                  style={{ fontSize: "14px", marginBottom: "5px" }}
                >
                  Meat
                </Typography>
              </Card>
            </div>
            <div>
              <Card style={{ cursor: "pointer", margin: "10px" }}>
                <CardMedia
                  style={{ padding: "5px" }}
                  component="img"
                  height="70"
                  image="/images/sea.jpg"
                  onClick={() => handleViewProduct("SEAFOOD")}
                />
                <Typography
                  align="center"
                  style={{ fontSize: "14px", marginBottom: "5px" }}
                >
                  SeaFood
                </Typography>
              </Card>
            </div>
          </List>
        </div>

        <div className="product-list" style={{ marginLeft: "170px" }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((a) => (
              <CustomerCard key={a.productId} product={a} />
            ))
          ) : (
            <div className="no-products-msg">No products available</div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ViewAllProducts;
