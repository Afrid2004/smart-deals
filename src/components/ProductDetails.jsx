import { ArrowLeft, CircleAlert } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import Modal from "./Modal";
import Avatar from "./Avatar";

const ProductDetails = () => {
  const product = useLoaderData();
  const [modal, setModal] = useState(false);
  const { _id: productID } = product; //renamed _id with productID
  const [bids, setBids] = useState([]);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const fetchBids = () => {
    fetch(
      `https://smart-deals-backend-server.vercel.app/products/bid/${productID}`,
    )
      .then((res) => res.json())
      .then((data) => setBids(data));
  };

  useEffect(() => {
    fetchBids();
  }, [productID]);

  return (
    <div className="bg-gray-100">
      <div className="container py-10">
        <div className="grid grid-cols-12 gap-5 mb-10">
          <div className="col-span-12 lg:col-span-5">
            <div className="aspect-4/4 overflow-hidden rounded-lg mb-5">
              <img
                className="w-full h-full object-cover"
                src={product.image}
                alt={product.title}
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
                    <p className="text-xl font-medium">{product.condition}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <h2 className="gradient-text font-medium text-lg">
                      Usage Time:
                    </h2>
                    <p className="text-xl font-medium">{product.usage_time}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xl">{product.description}</p>
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
                <h1 className="font-bold text-5xl">{product.title}</h1>
              </div>
              <div>
                <div className="px-4 py-1 bg-teal-600/20 border border-teal-600/30 text-teal-600 w-fit rounded-4xl">
                  <p className="text-sm">{product.category}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 border border-gray-200 rounded-lg mb-5">
              <p className="mb-3">Price starts from</p>
              <h2 className="text-[28px] font-bold text-teal-600">{`$${product.price_min} - ${product.price_max}`}</h2>
            </div>
            <div className="bg-white p-5 border border-gray-200 rounded-lg mb-5">
              <h2 className="text-2xl font-bold mb-3">Product Details</h2>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold">Product ID: </p>
                <p>{product._id}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-bold">Posted on: </p>
                <p>
                  {new Date(product.created_at).toLocaleString("en-GB", {
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
                <div className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden border border-gray-200">
                  <img
                    className="w-full h-full object-cover "
                    src={product.seller_image}
                    alt={product.seller_name}
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-[16px]">
                    {product.seller_name}
                  </h2>
                  <p className="text-gray-500">{product.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold">Location: </p>
                <p>{product.location}</p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <p className="font-bold">Contact: </p>
                <p>+88{product.seller_contact}</p>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold">Status: </p>
                <div className="p-2 bg-[#FFC107] w-fit rounded-4xl">
                  <p className="text-xs leading-none">{product.status}</p>
                </div>
              </div>
            </div>

            <button
              onClick={openModal}
              className="gradient text-white font-semibold text-[20px] px-4 py-3 rounded-lg w-full cursor-pointer"
            >
              I want to buy this product
            </button>
          </div>
        </div>

        <div>
          <h1 className="font-bold text-3xl mb-5">
            Bids for this product:{" "}
            <span className="gradient-text">{bids.length}</span>
          </h1>
          {bids.length ? (
            <div className="bg-white max-h-100 overflow-auto p-5 border border-gray-200 rounded-lg">
              <table className="min-w-200 w-full">
                <thead>
                  <tr className="text-left">
                    <th className="w-15 pb-3">SL No</th>
                    <th className="w-62.5 pb-3">Product</th>
                    <th className="w-62.5 pb-3">Buyer</th>
                    <th className="w-30 pb-3">Bid Price</th>
                    <th className="w-50 pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bids.map((bid, index) => {
                    const names = bid?.buyer_name || "User";
                    const [first, last] = names.split(" ");
                    const avatar = (first[0] || "") + (last ? last[0] : "");

                    return (
                      <tr key={index} className="border-t border-gray-300">
                        <td className="py-5">{index + 1}</td>

                        <td className="py-5">
                          <div className="flex gap-2 items-center">
                            <div className="w-20 h-12 shrink-0 overflow-hidden border border-gray-200">
                              <img
                                src={product.image}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h2 className="font-semibold">{product.title}</h2>
                              <p className="text-gray-500 whitespace-nowrap">
                                ${product.price_min} - ${product.price_max}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-5">
                          <div className="flex gap-2 items-center">
                            {bid?.buyer_image ? (
                              <img
                                src={bid?.buyer_image}
                                alt={bid?.buyer_name}
                                className="w-10 h-10 rounded-full"
                                title={bid?.buyer_name}
                              />
                            ) : (
                              <div
                                title={names}
                                className="w-10 h-10 cursor-default gradient text-white flex items-center justify-center rounded-full"
                              >
                                {avatar}
                              </div>
                            )}
                            <div>
                              <h2 className="font-semibold">
                                {bid.buyer_name}
                              </h2>
                              <p className="text-gray-500 whitespace-nowrap">
                                {bid.buyer_email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap py-5">
                          ${bid.bid_price}
                        </td>

                        <td className="py-5">
                          <div className="flex gap-2">
                            <button className="px-4 py-1 border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white duration-150 cursor-pointer">
                              Accept
                            </button>
                            <button className="px-4 py-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white duration-150 cursor-pointer">
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="p-4 rounded-md bg-amber-300/30 text-amber-600 border border-amber-300/50 flex items-center gap-2">
              <CircleAlert className="w-5 shrink-0" />
              No bids found for this product.
            </p>
          )}
        </div>
      </div>
      {modal && (
        <Modal
          closeModal={closeModal}
          refreshBids={fetchBids}
          productID={productID}
          minPrice={product.price_min}
          maxPrice={product.price_max}
        />
      )}
    </div>
  );
};

export default ProductDetails;
