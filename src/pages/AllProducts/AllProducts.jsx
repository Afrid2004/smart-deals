import React, { useEffect, useState } from "react";
import AxiosHook from "../../Hooks/AxiosHook";
import Product from "../../components/Product";
import Loading from "../../components/Loading";
import { ArrowLeft, ArrowRight, ArrowUpDown, Search } from "lucide-react";

const AllProducts = () => {
  const axiosInstance = AxiosHook();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0); //setTotalProduct used in axios api
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  let limit = 6;
  const totalPage = Math.ceil(totalProduct / limit);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(
        `/products?limit=${limit}&skip=${currentPage * limit}&sort=${sort}&order=${order}&search=${search}`,
      )
      .then((res) => {
        setProducts(res.data.data);
        setTotalProduct(res.data.total);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setLoading(false));
  }, [axiosInstance, sort, search, order, currentPage]);

  //handle sort changes
  const handleSortChange = (e) => {
    const sortedValue = e.target.value.split("-");
    setSort(sortedValue[0]);
    setOrder(sortedValue[1]);
  };

  //handle search changes
  const handleSearchChange = (e) => {
    setSearch(e.target.value.trim());
    setCurrentPage(0);
  };

  return (
    <div className="container">
      <div className="py-10 pb-3 lg:pb-10">
        <div className="mb-5">
          <h1 className="text-center font-bold text-3xl lg:text-5xl mb-5">
            Our All <span className="gradient-text">Products</span>
          </h1>
          <div>
            <div className="bg-white py-3 border-b border-gray-200 mb-5">
              <div className="grid grid-cols-12 items-center gap-3">
                <div className="flex h-10 col-span-12 md:col-span-6 lg:col-span-4">
                  <h5 className="font-medium h-full border border-gray-300/70 rounded-sm flex items-center justify-center px-3 w-full lg:w-auto">
                    Total Products: {totalProduct}
                  </h5>
                </div>
                <div className="flex h-10 overflow-hidden col-span-12 lg:col-span-4 order-3 lg:order-0">
                  <div className="h-full flex items-center justify-center cursor-pointer border border-teal-700 bg-teal-700 text-white hover:bg-teal-800 duration-150 px-2.5 order-2 rounded-sm rounded-tl-none rounded-bl-none">
                    <Search className="w-5 shrink-0" />
                  </div>
                  <input
                    onChange={handleSearchChange}
                    type="text"
                    name="name"
                    id="name"
                    className="outline-none w-full px-2.5 h-full rounded-sm rounded-tr-none rounded-br-none  border border-gray-300/70"
                    placeholder="Search Products..."
                  />
                </div>
                <div className="flex h-10 overflow-hidden justify-end col-span-12 md:col-span-6  lg:col-span-4">
                  <label htmlFor="category">
                    <div className="h-full rounded-sm rounded-tr-none rounded-br-none flex items-center justify-center bg-gray-200 px-2.5">
                      <ArrowUpDown className="w-5 shrink-0" />
                    </div>
                  </label>
                  <select
                    onChange={handleSortChange}
                    name="category"
                    className="outline-none rounded-sm rounded-tl-none rounded-bl-none px-1 border border-gray-300/70 w-full lg:w-auto"
                    id="category"
                  >
                    <option disabled>Sort Products</option>
                    <option value="created_at-desc">Newest First</option>
                    <option value="created_at-asc">Oldest First</option>
                    <option value="price_min-asc">Price Low - High</option>
                    <option value="price_min-desc">Price High - Low</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {loading ? (
                <Loading />
              ) : products.length === 0 ? (
                <p className="text-center col-span-12">No Product Found</p>
              ) : (
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))
              )}
            </div>

            <div className="flex items-center gap-3 justify-center mt-10 py-5 border-t border-gray-200">
              {currentPage > 0 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="w-10 h-10 bg-gray-200 hover:bg-gray-300 cursor-pointer duration-150 border border-gray-300 rounded-full flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 shrink-0" />
                </button>
              )}
              <div className="flex flex-wrap justify-center items-center max-w-60 sm:max-w-sm md:max-w-140 gap-2">
                {[...Array(totalPage).keys()].map((btn, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`w-10 h-10 bg-gray-200 hover:bg-gray-300 cursor-pointer duration-150 border border-gray-300 rounded-full flex items-center justify-center ${index === currentPage && "bg-teal-700 text-white border-teal-700 hover:bg-teal-700"}`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
              {currentPage < totalPage - 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="w-10 h-10 bg-gray-200 hover:bg-gray-300 cursor-pointer duration-150 border border-gray-300 rounded-full flex items-center justify-center"
                >
                  <ArrowRight className="w-5 shrink-0" />
                </button>
              )}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default AllProducts;
