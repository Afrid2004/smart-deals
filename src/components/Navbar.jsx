import React, { use } from "react";
import { Link, NavLink } from "react-router";
import Avatar from "./Avatar";
import useAuth from "../Hooks/AuthContextHook";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  const menus = (
    <>
      <NavLink to="/" className="hover:text-teal-600">
        Home
      </NavLink>
      <NavLink to="/products" className="hover:text-teal-600">
        All Products
      </NavLink>
      <NavLink to="/blogs" className="hover:text-teal-600">
        Blogs
      </NavLink>
      {user?.emailVerified && (
        <>
          <NavLink to="/my-products" className="hover:text-teal-600">
            My Products
          </NavLink>
          <NavLink to="/my-bids" className="hover:text-teal-600">
            My Bids
          </NavLink>
          <NavLink to="/create-product" className="hover:text-teal-600">
            Create Product
          </NavLink>
        </>
      )}
    </>
  );
  return (
    <div className="bg-white border-b border-gray-200 py-2 sticky top-0">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* left logo */}
          <Link to="/">
            <div className="w-35">
              <img
                src="/images/logo.png"
                className="w-full"
                alt="smart-deals"
              />
            </div>
          </Link>
          {/* left logo */}

          {/* middle desktop menu */}
          <div className="hidden lg:flex">
            <div className="flex items-center gap-5 font-medium text-primary hover:text-secondary">
              {menus}
            </div>
          </div>
          {/* middle desktop menu */}

          {/* right auth button */}
          <div className="hidden lg:flex">
            <div className="flex items-center gap-3">
              {user?.emailVerified ? (
                <>
                  {user && <Avatar />}
                  <button
                    onClick={handleLogout}
                    className="px-4 cursor-pointer py-2 border hover:bg-teal-950 hover:text-white duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 border hover:bg-teal-950 hover:text-white duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    className="px-6 py-2 text-white  gradient"
                    to="/register"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          {/* right auth button */}

          {/* mobile menu */}
          <div className="lg:hidden">
            <div>bar</div>
          </div>
          {/* mobile menu */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
