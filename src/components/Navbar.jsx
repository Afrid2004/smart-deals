import React, { use, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import Avatar from "./Avatar";
import useAuth from "../Hooks/AuthContextHook";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [subMenu, setSubMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleLogout = () => {
    setSubMenu(false);
    logout();
  };

  const profileMenu = (
    <>
      <NavLink to="/my-bids" className="hover:text-teal-600">
        My Bids
      </NavLink>
      <NavLink to="/my-products" className="hover:text-teal-600">
        My Products
      </NavLink>
    </>
  );
  const menus = (
    <>
      <NavLink to="/" className="hover:text-teal-600">
        Home
      </NavLink>
      <NavLink to="/all-products" className="hover:text-teal-600">
        All Products
      </NavLink>
      <NavLink to="/create-product" className="hover:text-teal-600">
        Create Product
      </NavLink>
    </>
  );
  const handleSubMenu = () => {
    setSubMenu(!subMenu);
  };
  const authMenu = (
    <>
      {user?.emailVerified ? (
        <>
          {user && (
            <div className="relative">
              <div className="cursor-pointer" onClick={handleSubMenu}>
                <Avatar />
              </div>
              <div
                className={`border shadow-sm min-w-70 border-gray-300/70 p-3 bg-white rounded-sm absolute top-[calc(100%+1rem)] right-0 ${subMenu ? "translate-y-0 duration-150 opacity-100 pointer-events-auto" : "translate-y-20 duration-150 opacity-0 pointer-events-none"} hidden md:block`}
              >
                <div
                  onClick={() => setSubMenu(false)}
                  className="mobilemenus flex flex-col gap-3"
                >
                  {profileMenu}
                  <div className="bg-gray-200/70 border border-gray-200 p-2 rounded-sm">
                    <p className="font-medium">{user?.displayName}</p>
                    <p className="text-sm">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 cursor-pointer py-2 border rounded-sm hover:bg-teal-950 hover:text-white duration-300"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="px-4 md:hidden cursor-pointer py-2 border hover:bg-teal-950 hover:text-white duration-300"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="px-4 py-2 border hover:bg-teal-950 hover:text-white duration-300 text-center"
          >
            Login
          </Link>
          <Link
            className="px-6 py-2 text-white  gradient text-center"
            to="/register"
          >
            Register
          </Link>
        </>
      )}
    </>
  );

  const mobileMenuModal = (
    <div
      onClick={() => setMobileMenu(false)}
      className={`bg-black/50  duration-150 ${mobileMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} fixed top-0 left-0 w-full h-full`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute right-0 border-l-3 border-gray-300 duration-300 bg-white h-full w-full max-w-sm overflow-y-auto  ${mobileMenu ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"}`}
      >
        <div className="sidebar-header flex items-center justify-between gap-3 p-3 border-b border-gray-200">
          {/* left logo */}
          <Link to="/">
            <div className="w-30">
              <img
                src="/images/logo.png"
                className="w-full"
                alt="smart-deals"
              />
            </div>
          </Link>
          {/* left logo */}
          <div
            className="w-9 h-9 flex items-center justify-center rounded-sm border border-gray-300 cursor-pointer hover:bg-gray-200 duration-75"
            onClick={handleMobileMenu}
          >
            <X className="w-6 shrink-0" />
          </div>
        </div>
        <div className="sidebar-body p-3" onClick={() => setMobileMenu(false)}>
          <div className="flex flex-col mobilemenus gap-3 mb-3">
            {menus}
            {profileMenu}
          </div>
          <div className="flex flex-col gap-3">{authMenu}</div>
        </div>
      </div>
    </div>
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
          <div className="hidden md:flex gap-3">
            <div className="flex items-center gap-3 font-medium text-primary hover:text-secondary mobilemenus">
              {menus}
            </div>
            {/* right auth button */}
            <div className="hidden md:flex">
              <div className="flex items-center gap-3">{authMenu}</div>
            </div>
            {/* right auth button */}
          </div>
          {/* middle desktop menu */}

          {/* mobile menu */}
          <div className="md:hidden">
            <div
              className="w-9 h-9 flex items-center justify-center rounded-sm border border-gray-300 cursor-pointer hover:bg-gray-200 duration-75"
              onClick={handleMobileMenu}
            >
              <Menu className="w-6 shrink-0" />
            </div>
            {mobileMenuModal}
          </div>
          {/* mobile menu */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
