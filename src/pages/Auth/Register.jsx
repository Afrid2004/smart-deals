import { Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";
import React, { use, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const { user, setUser, creteUser, emailVerify, updateUser, logout } =
    use(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
  const spin = (
    <div className="w-4 h-4 border-2 border-white border-t-white/30 border-r-white/30 rounded-full animate-spin"></div>
  );

  const handleShow = () => {
    setShow(!show);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError("");
    setSuccess("");
    // error valodation
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required. Please fill out the form.");
      return;
    }

    //check user name length is greater than or equal to 2
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters long.");
      return;
    }

    //email validate
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    //password validate
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters and include uppercase, lowercase, a number, and a special character.",
      );
      return;
    }

    setLoading(true);

    creteUser(email, password)
      .then((result) => {
        updateUser({
          displayName: name,
        }).then((result) => {
          setUser({ ...result.user, displayName: name });
          emailVerify();
          return logout();
        });
      })
      .then(() => {
        e.target.reset();
        setSuccess(
          "Account created successfully. Please check your email address.",
        );
      })
      .catch((err) => {
        if (err.code == "auth/email-already-in-use") {
          setError(
            "This email is already registered. Please use a different one.",
          );
        } else {
          setError("Something went wrong. Please try again later.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="error w-full mb-3 px-4 py-2 rounded-sm bg-red-200/70 text-red-900 border border-red-300/50">
                    <p className="w-full text-center text-sm">{error}</p>
                  </div>
                )}
                {success && (
                  <div className="error w-full my-3 px-4 py-2 rounded-sm bg-green-500/20 text-green-900 border border-green-300/70">
                    <p className="w-full text-center text-sm">{success}</p>
                  </div>
                )}
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
                    type={show ? "text" : "password"}
                    name="password"
                    id="password"
                    required
                    placeholder="****************"
                    className="outline-none w-full px-2.5 h-full"
                  />
                  <div className="flex items-center justify-center pr-2">
                    {show ? (
                      <EyeOff
                        onClick={handleShow}
                        className="w-5 shrink-0 text-secondary cursor-pointer"
                      />
                    ) : (
                      <Eye
                        onClick={handleShow}
                        className="w-5 shrink-0 text-secondary cursor-pointer"
                      />
                    )}
                  </div>
                </div>

                <button className="py-2 px-4 cursor-pointer bg-teal-900 hover:bg-teal-950 duration-75 text-white w-full rounded-md mb-3 flex items-center justify-center gap-2">
                  Register {loading && spin}
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
