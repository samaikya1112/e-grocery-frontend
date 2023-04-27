import React, { useState } from "react";
import axios from "axios";
import Nav from "../Nav";
import "./all.css";
import Stack from "@mui/material/Stack";
import { ADD_PRODUCT } from "./service/product-service";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
const FRUITS = {
  GRAPE: "Grape",
  BANANA: "Banana",
  POMOGRANATE: "Pomogranate",
  APPLE: "Apple",
  DRAGONFRUIT: "Dragon Fruit",
  WATERMELON: "Watermelon",
  PINEAPPLE: "Pineapple",
  MANGO: "Mango",
  PAPAYA: "Papaya",
};
const MEAT = {
  CHICKEN: "Chicken",
  CHICKENBONELESS: "Chicken Boneless",
  MUTTON: "Mutton",
};
const VEGETABLES = {
  TOMATO: "Tamoto",
  ONION: "Onion",
  CABBAGE: "Cabbage",
  GARLIC: "Garlic",
  BEETROOT: "Beetroot",
  BEANS: "Beans",
  CARROT: "Carrot",
  POTATO: "Potato",
  LADYFINGER: "Lady Finger",
  LEMON: "Lemon",
  CAULIFLOWER: "Cauli Flower",
  CHILLI: "Chilli",
  CAPSICUM: "Capsicum",
};
const SEAFOOD = {
  FISH: "Fish",
  DRYFISH: "Dryfish",
  PRAWNS: "Prawns",
};
const DAIRY = {
  MILK: "Milk",
  BREAD: "Bread",
  OATS: "Oats",
  BUTTER: "Butter",
  CHEESE: "Cheese",
  PANEER: "Paneer",
  MILKMAID: "Milkmaid",
};
const GRAINS = {
  RICE: "Rice",
  BROWNRICE: "Brownrice",
  MILLET: "Millet",
  CORN: "Corn",
};
const initialFruits = [
  { value: FRUITS.GRAPE, label: "Grape" },
  { value: FRUITS.BANANA, label: "Banana" },
  { value: FRUITS.POMOGRANATE, label: "Pomogranate" },
  { value: FRUITS.APPLE, label: "Apple" },
  { value: FRUITS.DRAGONFRUIT, label: "Dragonfruit" },
  { value: FRUITS.WATERMELON, label: "Watermelon" },
  { value: FRUITS.PINEAPPLE, label: "Pineapple" },
  { value: FRUITS.MANGO, label: "Mango" },
  { value: FRUITS.PAPAYA, label: "Papaya" },
];
const initialMeat = [
  { value: MEAT.CHICKEN, label: "Chicken" },
  { value: MEAT.CHICKENBONELESS, label: "Chicken Boneless" },
  { value: MEAT.MUTTON, label: "Mutton" },
];
const initialVegetables = [
  { value: VEGETABLES.TOMATO, label: "Tomato" },
  { value: VEGETABLES.ONION, label: "Onion" },
  { value: VEGETABLES.CABBAGE, label: "Cabagge" },
  { value: VEGETABLES.GARLIC, label: "Garlic" },
  { value: VEGETABLES.BEANS, label: "Beans" },
  { value: VEGETABLES.BEETROOT, label: "Beetroot" },
  { value: VEGETABLES.CAPSICUM, label: "Capsicum" },
  { value: VEGETABLES.CARROT, label: "Carrot" },
  { value: VEGETABLES.CAULIFLOWER, label: "Cauliflower" },
  { value: VEGETABLES.CHILLI, label: "Chilli" },
  { value: VEGETABLES.LADYFINGER, label: "Lady Finger" },
  { value: VEGETABLES.LEMON, label: "Lemon" },
  { value: VEGETABLES.POTATO, label: "Potato" },
];
const initialSeafood = [
  { value: SEAFOOD.DRYFISH, label: "Dry Fish" },
  { value: SEAFOOD.FISH, label: "Fish" },
  { value: SEAFOOD.PRAWNS, label: "Prawns" },
];
const initialDairy = [
  { value: DAIRY.BREAD, label: "Bread" },
  { value: DAIRY.BUTTER, label: "Butter" },
  { value: DAIRY.CHEESE, label: "Cheese" },
  { value: DAIRY.MILK, label: "Milk" },
  { value: DAIRY.MILKMAID, label: "Milkmaid" },
  { value: DAIRY.OATS, label: "Oats" },
  { value: DAIRY.PANEER, label: "Paneer" },
];
const initialGrains = [
  { value: GRAINS.BROWNRICE, label: "Brown rice" },
  { value: GRAINS.CORN, label: "Corn" },
  { value: GRAINS.MILLET, label: "Millet" },
  { value: GRAINS.RICE, label: "Rice" },
];
const Product = () => {
  function handleCategoryChange(event) {
    setCategory(event.target.value);
    if (event.target.value === "FRUITS") {
      setOptions(initialFruits);
    } else if (event.target.value === "MEAT") {
      setOptions(initialMeat);
    } else if (event.target.value === "VEGETABLES") {
      setOptions(initialVegetables);
    } else if (event.target.value === "SEAFOOD") {
      setOptions(initialSeafood);
    } else if (event.target.value === "DAIRY") {
      setOptions(initialDairy);
    } else if (event.target.value === "GRAINS") {
      setOptions(initialGrains);
    }
  }

  function handleOptionChange(event) {
    setProductName(event.target.value);
  }
  const [base64Image, setBase64Image] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [stockQuantityError, setStockQuantityError] = useState("");
  const [options, setOptions] = useState([]);
  const [categoryError, setCategoryError] = useState("");
  const [productNameError, setProductNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [open, setOpen] = useState(false);
  const addProduct = async (e) => {
    e.preventDefault();

    if (!category) {
      setCategoryError("please select category");
    } else {
      setCategoryError("");
    }
    if (!productName) {
      setProductNameError("please select category");
    } else {
      setProductNameError("");
    }
    if (!description) {
      setDescriptionError("please enter description");
    } else {
      setDescriptionError("");
    }
    if (isNaN(price) || Number(price) <= 0 || !price) {
      setPriceError("please enter price in digits");
    } else {
      setPriceError("");
    }
    if (!stockQuantity) {
      setStockQuantityError("please enter stock");
    } else {
      setStockQuantityError("");
    }
    if (!image) {
      setImageUrlError("please insert image");
    } else {
      setImageUrlError("");
    }
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stockQuantity", stockQuantity);
    formData.append("image", image);
    formData.append("base64Image", base64Image);
    setBase64Image()
    console.log(formData);
    axios
      .post(ADD_PRODUCT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        handleUpdateSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpdateSuccess = () => {
    setOpen(true);
  };
  const handleInput = (e, setState, setErrorState) => {
    setState(e.target.value);
    setErrorState("");
  };
  const handleOKClick = () => {
    setOpen(false);
    window.location.href = "/viewproducts";
  };
  const handleImageChange = (e, setState, setErrorState) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type === "image/jpeg") {
        setState(e.target.files[0]);
        setErrorState("");
      } else {
        setErrorState("Please select a JPEG image.");
      }
    } else if (!file) {
      setErrorState("please insert image");
    }
  };

  return (
    <div>
      <Nav />
      <div className="con">
        <h5 style={{ color: "rgb(15, 30, 74)" }}>ADD PRODUCT</h5>
        <FormControl
          className="form-control"
          variant="outlined"
          size="sl"
          margin="normal"
        >
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            className="select-control"
            labelId="category-select-label"
            id="category-select"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            error={Boolean(categoryError)}
            helperText={categoryError}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="FRUITS">Fruits</MenuItem>
            <MenuItem value="MEAT">Meat</MenuItem>
            <MenuItem value="VEGETABLES">Vegetable</MenuItem>
            <MenuItem value="SEAFOOD">Sea Food</MenuItem>
            <MenuItem value="DAIRY">Dairy</MenuItem>
            <MenuItem value="GRAINS">Grains</MenuItem>
            <MenuItem value="OTHER">Other</MenuItem>
          </Select>
        </FormControl>
        <br></br>
        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <InputLabel id="product-name-label">Name</InputLabel>
          {options.length > 0 ? (
            <Select
              className="select-control"
              labelId="product-name-label"
              label="Name"
              id="product-name-select"
              value={productName}
              onChange={handleOptionChange}
              error={Boolean(productNameError)}
              helperText={productNameError}
              required
            >
              <MenuItem value="">Select Option</MenuItem>
              {options.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <TextField
              id="product-name-textfield"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
              required
            />
          )}
        </FormControl>
        <br></br>
        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <TextField
            id="product-description-textfield"
            label="Description"
            value={description}
            onChange={(e) =>
              handleInput(e, setDescription, setDescriptionError)
            }
            fullWidth
            error={Boolean(descriptionError)}
            helperText={descriptionError}
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
            id="product-price-textfield"
            label="Price"
            value={price}
            onChange={(e) => handleInput(e, setPrice, setPriceError)}
            fullWidth
            error={Boolean(priceError)}
            helperText={priceError}
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
            id="product-imageurl-textfield"
            type="file"
            onChange={(e) => handleImageChange(e, setImage, setImageUrlError)}
            inputProps={{
              accept: "image/jpeg", // Accept only JPEG images
            }}
            error={Boolean(imageUrlError)}
            helperText={imageUrlError}
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
            id="product-price-textfield"
            label="Stock-Quantity"
            value={stockQuantity}
            onChange={(e) =>
              handleInput(e, setStockQuantity, setStockQuantityError)
            }
            fullWidth
            error={Boolean(stockQuantityError)}
            helperText={stockQuantityError}
          />
        </FormControl>
        <br></br>
        <Stack direction="row" spacing={7}>
          <Button
            variant="contained"
            size="large"
            color="error"
            style={{ width: "200px" }}
          >
            <a
              href="/viewproducts"
              style={{ textDecoration: "none", color: "white" }}
            >
              Cancel
            </a>
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: "200px" }}
            onClick={addProduct}
          >
            Submit
          </Button>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Product Added Successfully</DialogTitle>
            <DialogContent>
              <p>Your product has been added successfully.</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleOKClick}>OK</Button>
            </DialogActions>
          </Dialog>
        </Stack>
      </div>
    </div>
  );
};

export default Product;
