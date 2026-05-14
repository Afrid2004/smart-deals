import React, { useState } from "react";
import { Link } from "react-router";
import AxiosHook from "../Hooks/AxiosHook";
import Swal from "sweetalert2";
import AxiosSecureHook from "../Hooks/AxiosSecureHook";
import UpdateProduct from "./UpdateProduct";

const MyProductExtend = ({ product, setProducts, setTotalProduct }) => {
  const axiosSecureInstance = AxiosSecureHook();
  const [modal, setModal] = useState(false);
  const handleProductDelete = (id) => {
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
        axiosSecureInstance
          .delete(`/products/${id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount) {
              setProducts((prev) =>
                prev.filter((product) => product._id !== id),
              );
              setTotalProduct((prev) => prev - 1);
              Swal.fire({
                title: "Deleted!",
                text: "Your product has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => alert(err.message));
    });
  };

  const handleProductUpdate = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="bg-white p-3 rounded-lg border border-gray-200">
      <div className="aspect-4/3 mb-3 rounded-md overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={product.image}
          alt={product.title}
        />
      </div>
      <div>
        <Link to={`/product/${product._id}`}>
          <h5 className="text-3xl font-medium mb-3 line-clamp-1">
            {product.title}
          </h5>
        </Link>
        <span className="gradient-text font-medium text-2xl mb-3 block">
          Price: {`$${product.price_min} - ${product.price_max}`}
        </span>
        <div>
          <Link
            to={`/product/${product._id}`}
            className="gradient text-white px-4 py-2 w-full block text-center rounded-md mb-2"
          >
            View Product
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleProductUpdate()}
              className="w-full py-2 duration-75 bg-gray-800 hover:bg-gray-900 text-white rounded-md cursor-pointer"
            >
              Update Product
            </button>
            <button
              onClick={() => handleProductDelete(product._id)}
              className="w-full py-2 duration-75 bg-red-600 hover:bg-red-700 text-white rounded-md cursor-pointer"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
      {modal && <UpdateProduct product={product} closeModal={closeModal} />}
    </div>
  );
};

export default MyProductExtend;
