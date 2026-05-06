import {
  CircleDollarSign,
  DollarSign,
  Link,
  Mail,
  Phone,
  UserRound,
  X,
} from "lucide-react";
import React, { use, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Modal = ({ closeModal, productID, refreshBids }) => {
  const { user } = use(AuthContext);
  const name = user?.displayName || "User";
  const [first, last] = name.split(" ");
  const avatar = (first[0] || "") + (last ? last[0] : "");
  const spin = (
    <div className="w-5 h-5 border-2 border-white border-t-white/30 border-r-white/30 rounded-full animate-spin"></div>
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const price = e.target.price.value;
    const phone = e.target.phone.value;

    const bidDetails = {
      product: productID,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL || "",
      bid_price: parseFloat(price),
      buyer_contact: phone,
      status: "Pending",
    };
    setLoading(true);
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bidDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setLoading(false);
          refreshBids();
          closeModal();
          Swal.fire({
            title: "Your bid has been placed.",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
          });
        } else if (data.message) {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Failed to place bid",
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      onClick={closeModal}
      className="w-full h-full fixed top-0 left-0 flex items-center justify-center backdrop-blur-2xl bg-white/30 py-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-110 bg-white p-5 rounded-kl shadow-sm rounded-lg border border-gray-200 relative overflow-hidden animating"
      >
        <h1 className="font-bold text-2xl text-center mb-5 px-8">
          Give Seller Your Offered Price
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
            <label htmlFor="name">
              <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                <UserRound className="w-5 shrink-0" />
              </div>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              readOnly
              defaultValue={user?.displayName}
              className="outline-none w-full px-2.5 h-full"
            />
          </div>
          <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
            <label htmlFor="email">
              <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                <Mail className="w-5 shrink-0" />
              </div>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              readOnly
              defaultValue={user?.email}
              className="outline-none w-full px-2.5 h-full"
            />
          </div>
          <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
            <label htmlFor="price">
              <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                <DollarSign className="w-5 shrink-0" />
              </div>
            </label>
            <input
              type="number"
              name="price"
              id="price"
              required
              placeholder="e.g. 10, 20..."
              className="outline-none w-full px-2.5 h-full"
            />
          </div>
          <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
            <label htmlFor="phone">
              <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                <Phone className="w-5 shrink-0" />
              </div>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              placeholder="e.g. +8801XXXXXXXXX"
              className="outline-none w-full px-2.5 h-full"
            />
          </div>
          <button
            type="submit"
            className="gradient text-white font-medium px-4 py-2 rounded-lg w-full cursor-pointer flex items-center justify-center gap-2"
          >
            Submit Bid
            {loading && spin}
          </button>
        </form>
        <div
          onClick={closeModal}
          className="absolute -right-0.5 -top-0.5 w-9 h-9 flex items-center justify-center rounded-md rounded-t-none rounded-br-none bg-gray-100 hover:bg-gray-200 duration-150 cursor-pointer border border-gray-300/50"
        >
          <X className="w-5 shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
