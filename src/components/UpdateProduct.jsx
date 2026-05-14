import React, { useState } from "react";
import {
  CalendarDays,
  CircleDollarSign,
  DollarSign,
  LayoutGrid,
  Link,
  ListTodo,
  Mail,
  MapPin,
  Phone,
  Type,
  X,
} from "lucide-react";
import AxiosSecureHook from "../Hooks/AxiosSecureHook";
import Swal from "sweetalert2";

const spin = (
  <div className="w-5 h-5 border-2 border-white border-t-white/30 border-r-white/30 rounded-full animate-spin"></div>
);

const UpdateProduct = ({ product, closeModal, refreshProducts }) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const axiosSecureInstance = AxiosSecureHook();
  const {
    _id,
    title,
    price_min,
    price_max,
    category,
    usage_time,
    image,
    location,
    seller_contact,
    description,
    condition,
    status,
  } = product;
  const handleSubmit = (e) => {
    setErr("");
    e.preventDefault();
    const title = e.target.title.value.trim(),
      price_min = parseInt(e.target.min_price.value),
      price_max = parseInt(e.target.max_price.value),
      category = e.target.category.value,
      status = e.target.status.value,
      usage_time = e.target.usage_time.value.trim(),
      image = e.target.product_image.value.trim(),
      location = e.target.location.value.trim(),
      seller_contact = e.target.seller_phone.value.trim(),
      description = e.target.description.value.trim(),
      conditionValue = e.target.productCondition;
    let condition;
    //regex value
    const imageUrlRegex = /^https:\/\//i;

    for (let singleCondition of conditionValue) {
      if (singleCondition.checked) {
        condition = singleCondition.value;
      }
    }

    if (title.length < 2) {
      setErr("Title Charecter length must be greater then 2");
      return;
    }

    if (isNaN(price_min) || isNaN(price_max)) {
      setErr("Please enter valid prices");
      return;
    }

    if (price_min <= 0 || price_max <= 0) {
      setErr("Price must be greater than 0");
      return;
    }

    if (price_min >= price_max) {
      setErr("Min Price must be less then Max Price");
      return;
    }

    if (!imageUrlRegex.test(image)) {
      setErr("Image URL must start with https://");
      return;
    }

    const product = {
      title,
      price_min,
      price_max,
      category,
      usage_time,
      image,
      location,
      seller_contact,
      description,
      condition,
      status,
    };
    setLoading(true);
    axiosSecureInstance
      .patch(`/products/${_id}`, product)
      .then((res) => {
        if (res.data.modifiedCount) {
          refreshProducts();
          Swal.fire({
            title: "Your Product has been updated.",
            icon: "success",
            timer: 1500,
          });
          closeModal();
        } else {
          Swal.fire({
            title: "All data are same!",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Failed to update data.",
          icon: "error",
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <div
      onClick={closeModal}
      className="w-full h-full fixed top-0 left-0 flex items-center justify-center backdrop-blur-2xl bg-white/30 py-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm sm:max-w-110 md:max-w-170 lg:max-w-220 bg-white p-5 rounded-xl shadow-sm border border-gray-200 overflow-hidden animating relative"
      >
        <h1 className="font-bold text-4xl text-center mb-5 px-8">
          Update <span className="gradient-text">Product</span>
        </h1>
        {err && (
          <span className=" text-red-500 mb-5 px-8 bg-red-200/70 h-10 flex items-center justify-center border border-red-200 rounded-md">
            {err}
          </span>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 md:col-span-6">
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
                <label htmlFor="title">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <Type className="w-5 shrink-0" />
                  </div>
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={title}
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
                  required
                  type="number"
                  name="min_price"
                  id="min_price"
                  defaultValue={price_min}
                  placeholder="Min Price"
                  className="outline-none w-full px-2.5 h-full"
                />
              </div>
              <div className="flex gap-3">
                <label
                  for="brand_new"
                  className="flex justify-between items-center gap-6 rounded-sm px-2.5 h-10 ring-1 ring-gray-300/70  hover:bg-gray-100 has-checked:text-gray-800 has-checked:ring-gray-600 w-full"
                >
                  Brand New
                  <input
                    id="brand_new"
                    className="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-gray-600 checked:ring-gray-600"
                    type="radio"
                    value="Brand New"
                    name="productCondition"
                    defaultChecked={condition === "Brand New"}
                  />
                </label>
                <label
                  for="used"
                  className="flex justify-between items-center gap-6 rounded-sm px-2.5 h-10 ring-1 ring-gray-300/70 hover:bg-gray-100 has-checked:text-gray-800 has-checked:ring-gray-600 w-full"
                >
                  used
                  <input
                    id="used"
                    className="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding ring-1 ring-gray-950/20 outline-none checked:border-gray-600 checked:ring-gray-600"
                    type="radio"
                    value="used"
                    name="productCondition"
                    defaultChecked={condition === "used"}
                  />
                </label>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
                <label htmlFor="category">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <LayoutGrid className="w-5 shrink-0" />
                  </div>
                </label>
                <select
                  name="category"
                  className="w-full outline-none px-1"
                  id="category"
                  defaultValue={category}
                >
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
                  required
                  type="number"
                  name="max_price"
                  id="max_price"
                  required
                  placeholder="Max Price"
                  defaultValue={price_max}
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
                  required
                  type="text"
                  name="usage_time"
                  id="usage_time"
                  defaultValue={usage_time}
                  placeholder="Product Usage Time (e.g. 1 year 3 month)"
                  className="outline-none w-full px-2.5 h-full"
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                <label htmlFor="product_image">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <Link className="w-5 shrink-0" />
                  </div>
                </label>
                <input
                  required
                  type="text"
                  name="product_image"
                  id="product_image"
                  defaultValue={image}
                  placeholder="Product Image Url (e.g. https://...)"
                  className="outline-none w-full px-2.5 h-full"
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                <label htmlFor="status">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <ListTodo className="w-5 shrink-0" />
                  </div>
                </label>
                <select
                  name="status"
                  className="w-full outline-none px-1"
                  id="status"
                  defaultValue={status}
                >
                  <option value="Available">Available</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                <label htmlFor="location">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <MapPin className="w-5 shrink-0" />
                  </div>
                </label>
                <input
                  required
                  type="text"
                  name="location"
                  id="location"
                  defaultValue={location}
                  placeholder="City, Country"
                  className="outline-none w-full px-2.5 h-full"
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden">
                <label htmlFor="seller_phone">
                  <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                    <Phone className="w-5 shrink-0" />
                  </div>
                </label>
                <input
                  required
                  type="tel"
                  name="seller_phone"
                  id="seller_phone"
                  required
                  defaultValue={seller_contact}
                  placeholder="Seller Phone"
                  className="outline-none w-full px-2.5 h-full"
                />
              </div>
            </div>
            <div className="col-span-12">
              <textarea
                className="border outline-none border-gray-300/70 w-full rounded-sm overflow-hidden py-2 px-3 mb-3"
                name="description"
                id="description"
                defaultValue={description}
                placeholder="Product Description... "
                required
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="gradient text-white font-medium px-4 py-2 rounded-lg w-full cursor-pointer flex items-center justify-center gap-2"
          >
            Update Product
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

export default UpdateProduct;
