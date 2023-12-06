import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <header className="text-gray-600 body-font shadow-md sticky top-0 bg-white z-50">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img
            src="deal.gif"
            alt=""
            className="ml-4 w-12 h-12 text-indigo-900 bg-white-500"
          />
          <Link to="/home">
            <span className="ml-3 text-3xl text-indigo-500">𝓡eal</span>
            <span className="ml-3 text-3xl">Estate</span>
          </Link>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-lg justify-center">
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
            <>
              <span>
                {" "}
                {(() => {
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
                {(() => {
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
                        Chats
                      </Link>
                    );
                  }
                })()}
              </span>
              <div
                className="dropdown relative mr-8 hover:border-blue-500"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={require(`../Images/${user?.image}`)}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                {showDropdown && (
                  <div className="dropdown-menu absolute bg-white rounded-md shadow-md mt-2">
                    <div className="dropdown-item py-1 px-4">
                      <Link className="font-semibold" to="/profile">
                        Profile
                      </Link>
                    </div>
                    <hr />
                    <div className="dropdown-item py-2 px-4">
                      <Link
                        className="font-semibold"
                        onClick={logout}
                        to="/signup"
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </>
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
