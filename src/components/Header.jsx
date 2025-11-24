import { useContext } from "react";
import { NavLink } from "react-router";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";

const Header = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-crops">All Crops</NavLink>
      </li>

      {!user ? (
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
      ) : (
        <>
          <li>
            <NavLink to="/profile">My Profile</NavLink>
          </li>
          <li>
            <NavLink to="/add-crops">Add Crops</NavLink>
          </li>
          <li>
            <NavLink to="/my-posts">My Posts</NavLink>
          </li>
          <li>
            <NavLink to="/my-interests">My interest</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    //navbar component
    <div>
      <div className="navbar py-0 min-h-0 z-1 shadow-sm  glass-card max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="  font-bold text-2xl">KrishiLink</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {!user ? (
            <button className="btn btn-outline ">
              <NavLink to="/login">Log in</NavLink>
            </button>
          ) : (
            <button
              onClick={() =>
                signOutUser().then(toast.success("Signed Out Successfully"))
              }
              className="btn btn-outline "
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
