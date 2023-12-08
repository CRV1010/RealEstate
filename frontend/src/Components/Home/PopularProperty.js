import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PopularProperty = () => {
  const [database, setDatabase] = useState([]);
  var user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?._id;
  const navigate = useNavigate();
  const advertisment = async () => {
    const result = await fetch(`http://localhost:5000/getPropertyDetail`, {
      method: "post",
      body: JSON.stringify({ premium: 1 }),
      headers: {
        "Content-Type": "application/json",
        // authorization: `bearer ${JSON.parse(
        //   localStorage.getItem("token")
        // )}`,
      },
    });
    var data = await result.json();
    // console.log("ad",data);
    if (!data && user) {
      toast.error("Your Token has expired... login again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        localStorage.clear();
        navigate("/login");
      }, 7000);
    } else {
      setDatabase(data);
    }
    // console.log("pre property",data);
  };

  useEffect(() => {
    advertisment();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-16 mx-auto ">
        <div className="lg:w-1/2 w-full mb-6">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            Popular Properties
          </h1>
          <div className="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
        <div className="flex flex-nowrap overflow-x-scroll overflow-y-hidden">
          {database ? (
            database.map((ArrayOfObjects, index) => {
              // const imageNames = ArrayOfObjects.image[0];
              const keyId = `${ArrayOfObjects._id}`;

              return (
                <Link
                  to="/sellPropInfo"
                  onClick={() => localStorage.setItem("pressCard", keyId)}
                  key={ArrayOfObjects?._id}
                >
                  <div className="p-4 flex-none w-96  hover:scale-105 ">
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:border-gray-300">
                      {ArrayOfObjects.image &&
                      ArrayOfObjects.image.length > 0 ? (
                        <img
                          className="lg:h-48 md:h-36 w-full object-cover object-center"
                          src={require(`../../Images/${ArrayOfObjects.image[0]}`)}
                          key={ArrayOfObjects.image[0]}
                          alt="not fetched"
                        />
                      ) : (
                        ""
                      )}

                      <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          {ArrayOfObjects.propertyFor}
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          Price : {ArrayOfObjects.price}
                        </h1>
                        <p className="leading-relaxed mb-3">
                          <strong>Location : </strong> {ArrayOfObjects.society},{" "}
                          {ArrayOfObjects.zone}, {ArrayOfObjects.City},{" "}
                          {ArrayOfObjects.State}.{" "}
                        </p>
                        <div className="flex items-center flex-wrap ">
                          <strong> Property Type : &nbsp;</strong>
                          {ArrayOfObjects.type}{" "}
                          <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-3 border-r-2 border-gray-200">
                            <button value={ArrayOfObjects._id} disabled>
                              {ArrayOfObjects.likes &&
                              ArrayOfObjects.likes.some(
                                (objectId) => objectId === user_id
                              ) ? (
                                <i
                                  className="fa-solid fa-heart"
                                  style={{ color: "red" }}
                                ></i>
                              ) : (
                                <i
                                  className="fa-regular fa-heart"
                                  style={{ color: "red" }}
                                ></i>
                              )}
                              &nbsp;
                              <span
                                style={{
                                  color: "#b4fee7",
                                  fontWeight: "600",
                                }}
                              >
                                {ArrayOfObjects.likes &&
                                  ArrayOfObjects.likes.length}{" "}
                              </span>
                              Interested
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div>We don't have any Popular Property.</div>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
};

export default PopularProperty;
