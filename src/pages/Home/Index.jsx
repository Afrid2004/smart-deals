import React from "react";
import Hero from "../../components/Hero";
import LatestProduct from "../../components/LatestProduct";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="bg-gray-100">
        <div className="container">
          <LatestProduct />
        </div>
      </div>
    </div>
  );
};

export default Home;
