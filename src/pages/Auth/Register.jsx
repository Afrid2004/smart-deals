import { Eye, Lock, Mail, UserRound } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Register = () => {
  return (
    <div className="bg-gray-100">
      <div className="container">
        <div className="flex items-center justify-center py-15">
          <div className="bg-white p-7 w-full max-w-100 shadow-sm rounded-xl shadow-gray-200">
            <div className="topper flex flex-col items-center justify-center gap-3 mb-5">
              <h2 className="font-bold text-2xl">Register</h2>
              <p>
                Already have an Account?{" "}
                <Link
                  to="/login"
                  className="gradient-text font-medium hover:underline"
                >
                  Login Now
                </Link>
              </p>
            </div>
            <div>
              <form>
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
                    required
                    placeholder="Your Name"
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
                    required
                    placeholder="example@gmail.com"
                    className="outline-none w-full px-2.5 h-full"
                  />
                </div>

                <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-4">
                  <label htmlFor="password">
                    <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                      <Lock className="w-5 shrink-0" />
                    </div>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    placeholder="****************"
                    className="outline-none w-full px-2.5 h-full"
                  />
                  <div className="flex items-center justify-center pr-2">
                    <Eye className="w-5 shrink-0 text-secondary cursor-pointer" />
                  </div>
                </div>

                <button className="py-2 px-4 cursor-pointer gradient text-white w-full rounded-md mb-3">
                  Register
                </button>

                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="border-t border-gray-300 grow"></div>
                  <span>OR</span>
                  <div className="border-t border-gray-300 grow"></div>
                </div>

                <button className="py-2 px-4 cursor-pointer border border-gray-200/70 w-full rounded-md bg-gray-200/80 hover:bg-gray-300/70 duration-75 flex  items-center justify-center gap-2">
                  <div className="w-5">
                    <img
                      src="/images/google.png"
                      alt="google"
                      className="w-full shrink-0"
                    />
                  </div>
                  Continue with Google
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
