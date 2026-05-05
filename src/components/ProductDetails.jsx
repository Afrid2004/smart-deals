import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useLoaderData, useParams } from "react-router";

const ProductDetails = () => {
  const params = useParams();
  const data = useLoaderData();
  const sigleProduct = data.find((data) => data._id == params.id);
  return (
    <div className="bg-gray-100">
      <div className="container py-10">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-5">
            <div className="aspect-4/4 overflow-hidden rounded-lg mb-5">
              <img
                className="w-full h-full object-cover"
                src={sigleProduct.image}
                alt={sigleProduct.title}
              />
            </div>
            <div className="bg-white p-5 border border-gray-200 rounded-lg">
              <div>
                <h2 className="font-bold text-2xl mb-3">Product Description</h2>
                <div className="flex items-center flex-wrap justify-between gap-2 border-b border-gray-300 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <h2 className="gradient-text font-medium text-lg">
                      Condition:
                    </h2>
                    <p className="text-xl font-medium">
                      {sigleProduct.condition}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <h2 className="gradient-text font-medium text-lg">
                      Usage Time:
                    </h2>
                    <p className="text-xl font-medium">{sigleProduct.usage}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xl">{sigleProduct.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="bg-white p-5 border border-gray-200 rounded-lg mb-5">
              <div className="mb-5">
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-5 shrink-0" />
                  <p>Back to All Products</p>
                </Link>
              </div>
              <div className="mb-5">
                <h1 className="font-bold text-5xl">{sigleProduct.title}</h1>
              </div>
              <div>
                <div className="px-4 py-1 bg-teal-600/20 border border-teal-600/30 text-teal-600 w-fit rounded-4xl">
                  <p className="text-sm">{sigleProduct.category}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 border border-gray-200 rounded-lg mb-5">
              <p className="mb-3">Price starts from</p>
              <h2 className="text-[28px] font-bold text-teal-600">{`$${sigleProduct.price_min} - ${sigleProduct.price_max}`}</h2>
            </div>
            <div className="bg-white p-5 border border-gray-200 rounded-lg mb-5">
              <h2 className="text-2xl font-bold mb-3">Product Details</h2>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold">Product ID: </p>
                <p>{sigleProduct._id}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-bold">Posted on: </p>
                <p>
                  {new Date(sigleProduct.created_at).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
            <div className="bg-white p-5 border border-gray-200 rounded-lg mb-5">
              <h2 className="text-2xl font-bold mb-3">Seller Information</h2>
              <div className="flex gap-2 mb-3">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={sigleProduct.seller_image}
                    alt={sigleProduct.seller_name}
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-[16px]">
                    {sigleProduct.seller_name}
                  </h2>
                  <p className="text-gray-500">{sigleProduct.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold">Location: </p>
                <p>{sigleProduct.location}</p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <p className="font-bold">Contact: </p>
                <p>+88{sigleProduct.seller_contact}</p>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold">Status: </p>
                <div className="p-2 bg-[#FFC107] w-fit rounded-4xl">
                  <p className="text-xs leading-none">{sigleProduct.status}</p>
                </div>
              </div>
            </div>

            <button className="gradient text-white font-semibold text-[20px] px-4 py-3 rounded-lg w-full cursor-pointer">
              I want Buy This Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
