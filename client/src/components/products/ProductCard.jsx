function ProductCard({ product }) {
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="h-44 w-full object-cover"
      />

      <div className="p-4">
        <p className="text-sm text-zinc-400">
          {product.brand}
        </p>

        <h3 className="mt-1 font-semibold text-white">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-white">
            ₹{product.price}
          </span>

          <a
            href={product.productUrl}
            className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;