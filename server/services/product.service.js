import products from "../data/productsData.js";

const searchProducts = ({
  category,
  color,
  maxPrice,
  minPrice,
  brand,
}) => {
  return products.filter((product) => {
    const matchedBrand =
      !brand ||
      product.brand.toLowerCase().includes(brand.toLowerCase());

    const matchedColor =
      !color ||
      product.color.toLowerCase().includes(color.toLowerCase());

    const matchedCategory =
      !category ||
      product.category.toLowerCase().includes(category.toLowerCase());

    const matchedMaxPrice =
      !maxPrice ||
      product.price <= maxPrice;

    const matchedMinPrice =
      !minPrice ||
      product.price >= minPrice;

    return (
      matchedBrand &&
      matchedColor &&
      matchedCategory &&
      matchedMaxPrice &&
      matchedMinPrice
    );
  });
};

export default searchProducts;