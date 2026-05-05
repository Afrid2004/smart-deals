import React, { use } from "react";
import { Link } from "react-router";
import Product from "./Product";

const LatestProductComponent = ({ latestProduct }) => {
  const products = use(latestProduct);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {products.map((product) => {
        return <Product key={product._id} product={product}></Product>;
      })}
    </div>
  );
};

export default LatestProductComponent;
