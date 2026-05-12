import { Search } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className=" bg-linear-to-br from-teal-600/10 to-teal-950/20">
      <div className="container py-15">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-7">
            <h1 className="font-bold text-7xl text-center mb-3 text-primary">
              Deal your <span className="gradient-text">Products</span> <br />{" "}
              in a <span className="gradient-text">Smart</span> way !
            </h1>
            <p className="text-gray-600">
              SmartDeals helps you sell, resell, and shop from trusted local
              sellers — all in one place!
            </p>
          </div>
          <div className="mb-10">
            <form>
              <div className="w-120 mb-7 h-12 flex items-center justify-between shadow-md rounded-4xl overflow-hidden bg-white">
                <div className="flex-1 h-full">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    required
                    className="w-full h-full outline-none border-none px-5"
                    placeholder="search For Products, Categoriees..."
                  />
                </div>
                <button
                  type="submit"
                  className="bg-teal-900 hover:bg-teal-950 duration-150 cursor-pointer h-full w-15 shrink-0 text-white flex items-center justify-center"
                >
                  <Search />
                </button>
              </div>
            </form>
            <div className="flex items-center justify-center gap-3">
              <Link
                to="/all-products"
                className="gradient text-white px-4 py-3 rounded-lg"
              >
                Watch All Products
              </Link>
              <Link
                to="/create-product"
                className="border border-gray-800 text-gray-800 hover:bg-teal-950 duration-150 hover:text-white px-4 py-3 rounded-lg"
              >
                Post an Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
