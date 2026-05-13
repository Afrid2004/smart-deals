import React, { Suspense } from "react";
import LatestProductComponent from "./latestProductComponent";
import Loading from "./Loading";

const latestProduct = fetch("http://localhost:3000/latest-products").then(
  (res) => res.json(),
);

const LatestProduct = () => {
  return (
    <div className="py-10">
      <div className="mb-5">
        <h1 className="text-center font-bold text-5xl">
          Recent <span className="gradient-text">Products</span>
        </h1>
      </div>
      <div>
        <Suspense fallback={<Loading />}>
          <LatestProductComponent
            latestProduct={latestProduct}
          ></LatestProductComponent>
        </Suspense>
      </div>
    </div>
  );
};

export default LatestProduct;
