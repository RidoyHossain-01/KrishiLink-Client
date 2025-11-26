import { useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUser } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleRegister = (e) => {
    setError("");
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 6 characters long and contain at least one uppercase and one lowercase letter."
      );
      return;
    }

   
// toast, navigate available in your component

createUser(email, password)
  .then((userCredential) => {
    // userCredential contains the created user
    const user = userCredential.user;

    // updateUser returns a Promise (usually resolves to void)
    // return it so the chain waits for it
    return updateUser({ displayName: name, photoURL: image })
      .then(() => user); // pass `user` forward to next .then
  })
  .then((user) => {
    // Now user is available here (from createUser)
    // Save user to your backend (optional)
    return axios.post("http://localhost:3000/users", {
      email: user.email,
      name: name,
      photoURL: image,
    });
  })
  .then(() => {
    
     
    toast.success("Registration successful!");
    navigate("/");
  })
  .catch((err) => {
    // catches createUser, updateUser or axios errors
    setError(err?.message || err?.code || "Registration failed");
  });

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

          <form onSubmit={handleRegister}>
            {/* Name */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                className="input input-bordered"
                required
              />
            </div>

            {/* Image URL */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                name="image"
                type="text"
                placeholder="Image URL"
                className="input input-bordered"
                required
              />
            </div>

            {/* Email */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email@example.com"
                className="input input-bordered"
                required
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
                  required
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

            {/* Error */}
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            {/* Register Button */}
            <button type="submit" className="btn btn-primary w-full mt-2">
              Register
            </button>
          </form>
          <p className="text-center text-sm mt-3">
            Already have an account?{" "}
            <Link to={"/login"} className="text-primary font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
