import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <header className="text-gray-600 body-font shadow-md sticky top-0 bg-white z-10">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img
            src="deal.gif"
            alt=""
            className="ml-4 w-11 h-11 text-indigo-900 bg-white-500"
          />
          <Link to="/home">
            <span className="ml-3 text-2xl">Real Estate</span>
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
              {(() => {
                console.log("uid", user?._id);
                if (user?._id === "650b0d9532d958c9727bea89") {
                  console.log("Admin side");
                  return (
                    <Link
                      className="mr-5 hover:text-gray-900 font-semibold"
                      to="/adminPage"
                    >
                      Admin
                    </Link>
                  );
                }
              })()}
              <Link
                className="mr-5 hover:text-gray-900 font-semibold"
                to="/explore"
              >
                Explore
              </Link>
              <Link
                className="mr-5 hover:text-gray-900 font-semibold"
                to="/profile"
              >
                Profile
              </Link>
              {(() => {
                console.log("uid", user?._id);
                if (user?._id === "650b0d9532d958c9727bea89") {
                  console.log("chats admin");
                  return (
                    <Link
                      className="mr-5 hover:text-gray-900 font-semibold"
                      to="/chatadmin"
                    >
                      Chats
                    </Link>
                  );
                } else {
                  return (
                    <Link
                      className="mr-5 hover:text-gray-900 font-semibold"
                      to="/chatadmin"
                    >
                      Chat with Admin
                    </Link>
                  );
                }
              })()}
              <Link
                className="mr-5 hover:text-gray-900 font-semibold"
                onClick={logout}
                to="/signup"
              >
                Logout({user?.username})
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
