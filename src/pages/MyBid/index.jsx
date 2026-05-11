import React, { use, useEffect, useState } from "react";
import useAuth from "../../Hooks/AuthContextHook";
import { CircleAlert } from "lucide-react";
import Swal from "sweetalert2";
import AxiosHook from "../../Hooks/AxiosHook";

const MyBid = () => {
  const { user } = useAuth();
  const [bids, setBids] = useState([]);
  const axiosInstance = AxiosHook();

  useEffect(() => {
    if (user?.email) {
      //using axios
      axiosInstance
        .get(`/bids?email=${user?.email}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => setBids(res.data))
        .catch((err) => console.log(err));

      // fetch(`http://localhost:3000/bids?email=${user?.email}`, {
      //   headers: {
      //     authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setBids(data);
      //   })
      //   .catch((err) => console.log(err.message))
    }
  }, [user?.email]);

  const handleRemoveBid = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009689",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        fetch(`http://localhost:3000/bids/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success",
              });
              const filterBid = bids.filter((bid) => bid._id != id);
              setBids(filterBid);
            }
          })
          .catch((err) => {
            alert(err.message);
          });
    });
  };

  return (
    <div className="bg-gray-100">
      <div className="container py-10">
        <div>
          <h1 className="font-bold text-3xl mb-5">
            My Bids: <span className="gradient-text">{bids.length}</span>
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
                  {bids?.map((bid, index) => {
                    if (!bid?.productData) {
                      return (
                        <tr key={index} className="border-t border-gray-300">
                          <td colSpan="5" className="py-5 text-red-500">
                            Product Deleted
                          </td>
                          <td className="py-5">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleRemoveBid(bid._id)}
                                className="px-4 py-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white duration-150 cursor-pointer"
                              >
                                Remove Bid
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }

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
                                src={bid.productData?.image}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h2 className="font-semibold">
                                {bid.productData?.title}
                              </h2>
                              <p className="text-gray-500 whitespace-nowrap">
                                ${bid.productData?.price_min} - $
                                {bid.productData?.price_max}
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
                            <button
                              onClick={() => handleRemoveBid(bid._id)}
                              className="px-4 py-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white duration-150 cursor-pointer"
                            >
                              Remove Bid
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
    </div>
  );
};

export default MyBid;
