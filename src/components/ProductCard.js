import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card">
      <CardMedia component="img" image={product.image} alt={product._id} />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {product.name}
        </Typography>
        <Typography gutterBottom fontWeight="bold">
          ${product.cost}
        </Typography>
        <Rating value={product.rating} readOnly />
      </CardContent>
      <CardActions className="card-actions">
        <Button
          variant="contained"
          startIcon={<AddShoppingCartOutlined />}
          className="card-button"
          fullWidth
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
