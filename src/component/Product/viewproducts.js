import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import "./all.css";
import ProductCard from "./productcard";
import {
  FormControl,
  Button,
  List,
  Card,
  Typography,
  CardMedia,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { GET_ALL_PRODUCTS, GET_BY_PRODUCT } from "./service/product-service";

function ViewAllProducts() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);      // renamed
  const [searchTerm, setSearchTerm] = useState("");

  const toArray = (data) => {
    // Normalize API shapes => always return an array
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.content)) return data.content;     // common page shape
    if (Array.isArray(data?.products)) return data.products;   // common field
    if (Array.isArray(data?.data)) return data.data;           // some APIs
    return []; // fallback
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleAddButton = () => {
    window.location.href = "/addproduct";
  };

  const filteredProducts = (products || []).filter((p) =>
    (p?.productName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCancel = () => {
    window.location.href = "/viewproducts";
  };

  const handleViewProduct = (category) => {
    axios
      .get(`${GET_BY_PRODUCT}${category}`)
      .then((res) => {
        const list = toArray(res.data);
        if (list.length === 0) {
          alert("No data");
        }
        setProducts(list);
        setShowForm(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    axios
      .get(GET_ALL_PRODUCTS)
      .then((res) => setProducts(toArray(res.data)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Nav />
      <br />
      <br />
      <div className="m-auto">
        <br />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <FormControl style={{ height: "50px" }}>
              <TextField
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                style={{ marginLeft: "192px" }}
                placeholder="Search"
              />
            </FormControl>
          </Box>
          <Button
            className="text-center"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddButton}
          >
            Add Product
          </Button>
        </Box>

        <div className="parent-container">
          <div className="sidebar">{/* <-- was class */} 
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
                  <Typography align="center" style={{ fontSize: "14px", marginBottom: "5px" }}>
                    All
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
                  <Typography align="center" style={{ fontSize: "14px", marginBottom: "5px" }}>
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
                  <Typography align="center" style={{ fontSize: "14px", marginBottom: "5px" }}>
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
                  <Typography align="center" style={{ fontSize: "14px", marginBottom: "5px" }}>
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
                  <Typography align="center" style={{ fontSize: "14px", marginBottom: "5px" }}>
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
                  <Typography align="center" style={{ fontSize: "14px", marginBottom: "5px" }}>
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
                  <Typography align="center" style={{ fontSize: "14px", marginBottom: "5px" }}>
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
                  <Typography align="center" style={{ fontSize: "14px", marginBottom: "5px" }}>
                    SeaFood
                  </Typography>
                </Card>
              </div>
            </List>
          </div>
        </div>

        <div>
          <div className="product-list" style={{ marginLeft: "170px" }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))
            ) : (
              <div className="no-products-msg">No products available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAllProducts;
