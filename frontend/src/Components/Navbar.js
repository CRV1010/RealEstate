import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <header className="text-gray-600 body-font shadow-md">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img
            src="deal.gif"
            alt=""
            className=" w-12 h-12 text-indigo-900  bg-indigo-500"
          />
          <Link to="/home">
            <span className="ml-3 text-xl">Real Estate</span>
          </Link>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link className="mr-5 hover:text-gray-900 font-semibold" to="/home">
            Home
          </Link>

          <Link className="mr-5 hover:text-gray-900 font-semibold" to="/about">
            About Us
          </Link>
          <Link
            className="mr-5 hover:text-gray-900 font-semibold"
            to="/contact"
          >
            Contact Us
          </Link>
          {user ? (
            // <Link class="mr-5 hover:text-gray-900 font-semibold" to="/login">Logout</Link>
            <span>
              {" "}
              <Link
                className="mr-5 hover:text-gray-900 font-semibold"
                to="/chatadmin"
              >
                Chat with Admin
              </Link>
              <Link
                className="mr-5 hover:text-gray-900 font-semibold"
                onClick={logout}
                to="/signup"
              >
                Logout({JSON.parse(user).username})
              </Link>
            </span>
          ) : (
            <span>
              <Link
                className="mr-5 hover:text-gray-900 font-semibold"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="mr-5 hover:text-gray-900 font-semibold"
                to="/signup"
              >
                Sign Up
              </Link>
            </span>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
