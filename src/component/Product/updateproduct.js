import axios from "axios";
import { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import Nav from "../Nav";
import Stack from "@mui/material/Stack";
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
import { GET_BY_ID, UPDATE_PRODUCT } from "./service/product-service";

const UpdateProduct = () => {
  const FRUITS = {
    GRAPE: "Grape",
    BANANA: "Banana",
    POMOGRANATE: "Pomogranate",
    APPLE: "Apple",
    DRAGONFRUIT: "Dragonfruit",
    WATERMELON: "Watermelon",
    PINEAPPLE: "Pineapple",
    MANGO: "Mango",
    PAPAYA: "Papaya",
  };
  const MEAT = {
    CHICKEN: "Chicken",
    CHICKENBONELESS: "Cicken Boneless",
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
    LADYFINGER: "Ladyfinger",
    LEMON: "Lemon",
    CAULIFLOWER: "Cauliflower",
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

  const routeparams = useParams();
  console.log(routeparams.id);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [stockQuantityError, setStockQuantityError] = useState("");
  const [options, setOptions] = useState("");
  const [errors, setErrors] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [open, setOpen] = useState(false);
  const [op, setOp] = useState(false);
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
  const handleImageChange = (e,setState,setErrorState) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "image/jpeg") {
        setImage(e.target.files[0]);
        setImageUrlError("");
      } else {
        setImageUrlError("Please select a JPEG image.");
      }
    } else if(!file) {
      setImageUrlError("please insert image");
    }
  };
  useEffect(() => {
    axios
      .get(`${GET_BY_ID}${productId}` + routeparams.id)
      .then((response) => {
        console.log(response.data);

        setProductId(response.data.productId);
        setProductName(response.data.productName);
        setDescription(response.data.description);
        const url = `data:image/jpeg;base64,${response.data.image}`;
        setImage(response.data.image);
        setPrice(response.data.price);
        setCategory(response.data.category);
        setStockQuantity(response.data.stockQuantity);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
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
      setStockQuantityError("enter stock");
    } else {
      setStockQuantityError("");
    }
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stockQuantity", stockQuantity);
    if (image) {
      formData.append("image", image);
    }
    formData.append("base64Image", base64Image);
    console.log(formData);

    axios
      .put(`${UPDATE_PRODUCT}${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
      console.log(response.data)
        handleUpdateSuccess();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <Nav />
      <div className="con">
        <h5 style={{ color: "rgb(15, 30, 74)" }}>UPDATE PRODUCT</h5>
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
          {errors.category && <p className="text-danger">{errors.category}</p>}
        </FormControl>
        <br></br>
        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <InputLabel id="product-select-label"></InputLabel>
          {options.length > 0 ? (
            <Select
              className="select-control"
              labelId="product-select-label"
              id="product-select-select"
              value={productName}
              onChange={handleOptionChange}
              label="Name"
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
              id="product-select-textfield"
              label="Name"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
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
          {/* <div>
            <img
              src={image}
              alt="Product Image"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div> */}

          <TextField
            id="product-imageurl-textfield"
            type="file"
            onChange={(e)=>handleImageChange(e,setImage,setImageUrlError)}
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
        <Stack direction="row" spacing={7}>
          <Button
            variant="contained"
            size="large"
            color="error"
            style={{ width: "200px" }}
            onClick={handleOKClick}
            to="/viewproducts"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: "200px" }}
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Product Updated Successfully</DialogTitle>
            <DialogContent>
              <p>Your product has been successfully updated.</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleOKClick} to="/viewproducts">
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>
      </div>
    </div>
  );
};
export default UpdateProduct;
