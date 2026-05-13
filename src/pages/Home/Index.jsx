import React from "react";
import Hero from "../../components/Hero";
import LatestProduct from "../../components/LatestProduct";
import ErrorBoundary from "../../components/ErrorBoundary";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="bg-gray-100">
        <div className="container">
          <ErrorBoundary fallback="Failed to load product">
            <LatestProduct />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default Home;
