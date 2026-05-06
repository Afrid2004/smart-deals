import React from "react";
import { Link } from "react-router";

const Product = ({ product }) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow-md">
      <div className="aspect-4/3 mb-3 rounded-md overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={product.image}
          alt={product.title}
        />
      </div>
      <div>
        <h5 className="text-3xl font-medium mb-3">{product.title}</h5>
        <span className="gradient-text font-medium text-2xl mb-3 block">
          Price: {`$${product.price_min} - ${product.price_max}`}
        </span>
        <div>
          <Link
            to={`/product/${product._id}`}
            className="gradient text-white px-4 py-2 w-full block text-center rounded-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
