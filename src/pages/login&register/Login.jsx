import React, { use, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AuthContext from "../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signInUser, googleLogIn, setLoading, resetPassword } =
    use(AuthContext);
  const handleGoogleSignIn = () => {
    googleLogIn()
      //     .then((result) => {
      //      console.log(result);

      .then((result) => {
        axios.post("http://localhost:3000/users", {
          email: result.user.email,
          name: result.user.displayName,
          photoURL: result.user.photoURL,
        });
        toast.success("You've logged in successfully");
        navigate(location?.state || "/");
      })
      .catch((err) => {
        setError(err.code);
        setLoading(false);
      });
  };
  const handleResetPassword = () => {
    setError("");

    let email = emailRef.current.value;

    if (!email || email.trim() === "") {
      setError("Please give a valid Email address first");
      return;
    }
    resetPassword(email)
      .then(() => {
        toast.success(
          "A password reset email has been sent to your email, please check !"
        );
        emailRef.current.value = "";
        setLoading(false);
      })
      .catch((err) => {
        setError(err.code);
        setLoading(false);
      });
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        e.target.reset();
        toast.success("Welcome Back");
        navigate(location.state || "/");
      })
      .catch((err) => {
        setError(err.code);
      });
  };

  return (
    <div>
      <div className=" flex items-center justify-center bg-base-200 px-4">
        <div className="card w-full max-w-sm shadow-xl bg-base-100">
          <div className="card-body">
            <img
              className="w-64 mx-auto"
              src="https://i.ibb.co.com/q3pMjf0N/Gemini-Generated-Image-t8my2zt8my2zt8my.png"
              alt=""
            />
            <h2 className="text-2xl font-bold text-green-700 text-center mb-4 ">
              Login
            </h2>

            <form onSubmit={handleSignIn}>
              {/* Email */}
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  ref={emailRef}
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  className="input input-bordered"
                />
              </div>

              {/* Password */}
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••"
                    className="input input-bordered w-full pr-12"
                  />

                  {/* Eye Button */}
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              <div className="mt-2">
                <a
                  onClick={handleResetPassword}
                  className="link link-hover text-sm"
                >
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="btn text-base bg-purple-500 text-lg w-full mt-2"
              >
                Login
              </button>
            </form>

            <div className="divider">OR</div>

            {/* Google Login */}
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="btn btn-outline w-full flex items-center gap-2"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            <p className="text-center text-sm mt-3">
              Don't have an account?{" "}
              <Link to={"/register"} className=" text-green-700 font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
