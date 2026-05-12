import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import React, { use, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import useAuth from "../../Hooks/AuthContextHook";

const Login = () => {
  const { user, setUser, login, signInWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const spin = (
    <div className="w-4 h-4 border-2 border-white border-t-white/30 border-r-white/30 rounded-full animate-spin"></div>
  );

  const handleShow = () => {
    setShow(!show);
  };

  const handleSubmit = (e) => {
    setError("");
    setSuccess("");
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email.trim() || !password.trim()) {
      setError("All fields are required. Please fill out the form.");
      return;
    }
    setLoading(true);
    login(email, password)
      .then((result) => {
        if (!result.user.emailVerified) {
          setError("Please verify your email first.");
          setLoading(false);
          return;
        }
        setUser(result.user);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        if (err.code == "auth/invalid-credential") {
          setError("The email or password you entered is incorrect.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogle = () => {
    signInWithGoogle().then((result) => {
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => navigate(from, { replace: true }))
        .catch((err) => {
          setError(err.message);
        });
    });
  };

  const handleResetPassword = () => {
    setError("");
    setSuccess("");
    const emailValue = ref.current.value.trim();
    if (!emailValue) {
      setError("Please enter your email.");
      ref.current.focus();
      return;
    }
    resetPassword(emailValue)
      .then((result) => {
        setSuccess("A password reset link sent to your email.");
      })
      .catch((error) => {
        if (error.code == "auth/invalid-email") {
          setError("The email you entered is incorrect.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
      });
  };

  return (
    <div className="bg-gray-100">
      <div className="container">
        <div className="flex items-center justify-center py-15">
          <div className="bg-white p-7 w-full max-w-100 shadow-sm rounded-xl shadow-gray-200">
            <div className="topper flex flex-col items-center justify-center gap-3 mb-5">
              <h2 className="font-bold text-2xl">Login</h2>
              <p>
                Don't have an Account?{" "}
                <Link
                  to="/register"
                  className="gradient-text font-medium hover:underline"
                >
                  Register Now
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
                  <label htmlFor="email">
                    <div className="h-full flex items-center justify-center bg-gray-200 px-2.5">
                      <Mail className="w-5 shrink-0" />
                    </div>
                  </label>
                  <input
                    type="email"
                    ref={ref}
                    name="email"
                    id="email"
                    required
                    placeholder="example@gmail.com"
                    className="outline-none w-full px-2.5 h-full"
                  />
                </div>

                <div className="flex border border-gray-300/70 h-10 rounded-sm overflow-hidden mb-3">
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

                <div className="mb-3">
                  <span
                    onClick={handleResetPassword}
                    className="text-sm text-gray-500 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </span>
                </div>

                <button
                  type="submit"
                  className="py-2 px-4 cursor-pointer bg-teal-900 hover:bg-teal-950 duration-75 text-white w-full rounded-md flex items-center justify-center gap-2 mb-3"
                >
                  Login {loading && spin}
                </button>

                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="border-t border-gray-300 grow"></div>
                  <span>OR</span>
                  <div className="border-t border-gray-300 grow"></div>
                </div>

                <button
                  onClick={handleGoogle}
                  className="py-2 px-4 cursor-pointer border border-gray-200/70 w-full rounded-md bg-gray-200/80 hover:bg-gray-300/70 duration-75 flex  items-center justify-center gap-2"
                >
                  <div className="w-5">
                    <img
                      src="/images/google.png"
                      alt="google"
                      className="w-full shrink-0"
                    />
                  </div>
                  login with Google
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
