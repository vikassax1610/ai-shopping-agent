import ProductCard from "./ProductCard";

function ProductList({ products }) {
  if (!products?.length) {
    return null;
  }

  return (
    <div className="mt-3 flex flex-wrap gap-4 overflow-x-auto pb-2">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductList;