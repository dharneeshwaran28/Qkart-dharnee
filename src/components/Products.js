import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import ProductCard from "./ProductCard";
import "./Products.css";
// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */
const Products = () => {
  const loggedIn = window.localStorage.getItem("username");
  const token = window.localStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    products: [],
    loading: false,
  });
  const [debounceTimeout, setDebounceTimeout] = useState(
    setTimeout(() => {}, 500)
  );
 
  useEffect(() => {
    performAPICall();
  }, []);
 
  const performAPICall = async () => {
    setState((preState) => ({
      ...preState,
      loading: true,
    }));
    await axios
      .get(`${config.endpoint}/products`)
      .then((response) => {
        setState((preState) => ({
          ...preState,
          products: response.data,
          loading: false,
        }));
      })
      .catch(() => {
        enqueueSnackbar(
          "Something went wrong. Check the backend console for more details",
          { variant: "error" }
        );
        setState((preState) => ({
          ...preState,
          loading: false,
        }));
      });
  };

  const performSearch = async (text) => {
    await axios
      .get(`${config.endpoint}/products/search?value=${text}`)
      .then((response) => {
        setState((preState) => ({
          ...preState,
          products: response.data,
        }));
      })
      .catch((error) => {
        if (error.response !== undefined && error.response.status === 404) {
          setState((preState) => ({
            ...preState,
            products: [],
          }));
          enqueueSnackbar("No products found", { variant: "error" });
        } else {
          enqueueSnackbar(
            "Something went wrong. Check the backend console for more details",
            { variant: "error" }
          );
        }
      });
  };

  const handleSearch = (event) => {
    debounceSearch(event, debounceTimeout);
  };
  const debounceSearch = (event, debounceTimeout) => {
    clearTimeout(debounceTimeout);
    setDebounceTimeout(
      setTimeout(() => {
        performSearch(event.target.value);
      }, 500)
    );
  };

  return (
    <div>
      {" "}
      <Header loggedIn={loggedIn} hasHiddenAuthButtons>
        {" "}
        <Box sx={{ width: "45vw" }}>
          {" "}
          <TextField
            className="search-desktop"
            size="small"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  <Search color="primary" />{" "}
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
            placeholder="Search for items/categories."
            name="search"
          />{" "}
        </Box>{" "}
      </Header>{" "}
      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {" "}
              <Search color="primary" />{" "}
            </InputAdornment>
          ),
        }}
        onChange={handleSearch}
        placeholder="Search for items/categories"
        name="search"
      />{" "}
      <Grid container spacing={2}>
        {" "}
        <Grid item xs={12} md={loggedIn !== null ? 9 : 12}>
          {" "}
          <Grid container spacing={2}>
            {" "}
            <Grid item className="product-grid">
              {" "}
              <Box className="hero">
                {" "}
                <p className="hero-heading">
                  {" "}
                  India's{" "}
                  <span className="hero-highlight">FASTEST DELIVERY</span> to
                  your door step
                </p>{" "}
              </Box>{" "}
            </Grid>{" "}
            {state.loading ? (
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                mt={6}
                mb={6}
              >
                {" "}
                <Grid item>
                  {" "}
                  <CircularProgress
                    size={40}
                    color="success"
                    className="loading"
                  />{" "}
                </Grid>{" "}
                <Grid item>
                  {" "}
                  <div>Loading Products...</div>{" "}
                </Grid>{" "}
              </Grid>
            ) : (
              <>
                {" "}
                {state.products.length === 0 ? (
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    mt={6}
                    mb={6}
                  >
                    {" "}
                    <Grid item>
                      {" "}
                      <SentimentDissatisfied
                        size={40}
                        className="loading"
                      />{" "}
                    </Grid>{" "}
                    <Grid item>
                      {" "}
                      <div>No products found</div>{" "}
                    </Grid>{" "}
                  </Grid>
                ) : (
                  <>
                    {" "}
                    {state.products.map((product) => (
                      <Grid item xs={12} sm={6} md={3} key={product._id}>
                        {" "}
                        <ProductCard
                          product={product}
                        />{" "}
                      </Grid>
                    ))}
                  </>
                )}
              </>
            )}
          </Grid>{" "}
        </Grid>{" "}
      </Grid>{" "}
      <Footer />{" "}
    </div>
  );
};
export default Products;
