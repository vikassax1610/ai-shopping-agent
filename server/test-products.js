import searchProducts from "./services/product.service.js";

const products = searchProducts({
  category: "Running Shoes",
  color: "red",
  maxPrice: 6000,
});

console.log("products", products);