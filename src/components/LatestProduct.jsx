import React from "react";
import LatestProductComponent from "./latestProductComponent";

const latestProduct = fetch(
  "https://smart-deals-backend-server.vercel.app/latest-products",
).then((res) => res.json());

const LatestProduct = () => {
  return (
    <div className="py-10">
      <div className="mb-5">
        <h1 className="text-center font-bold text-5xl">
          Recent <span className="gradient-text">Products</span>
        </h1>
      </div>
      <div>
        <LatestProductComponent
          latestProduct={latestProduct}
        ></LatestProductComponent>
      </div>
    </div>
  );
};

export default LatestProduct;
