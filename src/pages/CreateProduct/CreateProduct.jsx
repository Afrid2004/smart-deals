import {
  CalendarDays,
  CircleDollarSign,
  DollarSign,
  LayoutGrid,
  Link,
  Mail,
  Phone,
  Type,
  UserRound,
  X,
} from "lucide-react";
import React, { use, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/AuthContextHook";

const CreateProduct = () => {
  const { user } = useAuth();
  const name = user?.displayName || "User";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-5">
      <div className="w-full max-w-110 lg:max-w-220 bg-white p-5 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <h1 className="font-bold text-4xl text-center mb-5 px-8">
          Create a <span className="gradient-text">Product</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-6">
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
                <label htmlFor="name">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <Type className="w-5 shrink-0" />
                  </div>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Product Title"
                  className="outline-none w-full px-2.5 h-full"
                />
              </div>
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
                <label htmlFor="min_price">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <DollarSign className="w-5 shrink-0" />
                  </div>
                </label>
                <input
                  type="number"
                  name="min_price"
                  id="min_price"
                  required
                  placeholder="Min Price"
                  className="outline-none w-full px-2.5 h-full"
                />
              </div>
              <div className="flex gap-3">
                <label
                  for="brand_new"
                  class="flex justify-between items-center gap-6 rounded-sm px-2.5 h-10 ring-1 ring-gray-300/70  hover:bg-gray-100 has-checked:text-gray-800 has-checked:ring-gray-600"
                >
                  Brand New
                  <input
                    id="brand_new"
                    class="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-gray-600 checked:ring-gray-600"
                    type="radio"
                    value="Brand New"
                    name="productCondition"
                  />
                </label>
                <label
                  for="used"
                  class="flex justify-between items-center gap-6 rounded-sm px-2.5 h-10 ring-1 ring-gray-300/70 hover:bg-gray-100 has-checked:text-gray-800 has-checked:ring-gray-600"
                >
                  Used
                  <input
                    id="used"
                    class="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-gray-600 checked:ring-gray-600"
                    type="radio"
                    value="used"
                    name="productCondition"
                  />
                </label>
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
                <label htmlFor="select">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <LayoutGrid className="w-5 shrink-0" />
                  </div>
                </label>
                <select
                  name="select"
                  className="w-full outline-none px-1"
                  id="select"
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Home Accessories">Home Accessories</option>
                </select>
              </div>
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
                <label htmlFor="max_price">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <DollarSign className="w-5 shrink-0" />
                  </div>
                </label>
                <input
                  type="number"
                  name="max_price"
                  id="max_price"
                  required
                  placeholder="Max Price"
                  className="outline-none w-full px-2.5 h-full"
                />
              </div>
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                <label htmlFor="usage_time">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <CalendarDays className="w-5 shrink-0" />
                  </div>
                </label>
                <input
                  type="text"
                  name="usage_time"
                  id="usage_time"
                  placeholder="Product Usage Time (e.g. 1 year 3 month)"
                  className="outline-none w-full px-2.5 h-full"
                />
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
                <label htmlFor="product_image">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <Link className="w-5 shrink-0" />
                  </div>
                </label>
                <input
                  type="text"
                  name="product_image"
                  id="product_image"
                  placeholder="Product Image Url (e.g. https://...)"
                  className="outline-none w-full px-2.5 h-full"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="gradient text-white font-medium px-4 py-2 rounded-lg w-full cursor-pointer flex items-center justify-center gap-2"
          >
            Submit Bid
            {loading && spin}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
