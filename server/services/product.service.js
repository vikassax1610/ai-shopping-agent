import products from "../data/productsData.js";

const searchProducts = ({
  category,
  gender,
  color,
  maxPrice,
  minPrice,
  minRating,
  isNew,
  isBestSeller
}) => {
  return products.filter((product) => {
    const matchedCategory =
      !category ||
      product.category?.toLowerCase().includes(category.toLowerCase());

    const matchedGender =
      !gender ||
      product.gender?.toLowerCase() === gender.toLowerCase();

    const matchedColor =
      !color ||
      product.colors.some(
        (productColor) =>
          productColor?.toLowerCase().includes(color.toLowerCase())
      );

    const matchedMaxPrice =
      maxPrice == null || product.price <= maxPrice;

    const matchedMinPrice =
      minPrice == null || product.price >= minPrice;

    const matchedRating =
      minRating == null || product.rating >= minRating;

    const matchedNew =
      isNew == null || product.isNew === isNew;

    const matchedBestSeller =
      isBestSeller == null || product.isBestSeller === isBestSeller;
    return (
      matchedCategory &&
      matchedGender &&
      matchedColor &&
      matchedMaxPrice &&
      matchedMinPrice &&
      matchedRating &&
      matchedNew &&
      matchedBestSeller
    );
  });
};

export default searchProducts;