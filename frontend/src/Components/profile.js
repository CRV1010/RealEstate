import React, { useEffect, useState } from "react";
import "./Profile.css";
import ProfileImg from "./../Images/focus.jpg";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function (props) {
  var user = localStorage.getItem("user");
  var _id = JSON.parse(user)._id;
  const navigate = useNavigate();

  const [UserDetails, setUserDetails] = useState();
  const [propertyDetails, setPropertyDetails] = useState([]);

  useEffect(() => {
    getUserData();
    getPropertyData();
  }, []);

  async function getUserData() {
    const result = await fetch("http://localhost:5000/getUserDetails", {
      method: "post",
      body: JSON.stringify({ _id }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    var data = await result.json();
    if (!data) {
      console.log("token expire");
      toast.error("Your Token has expired... Login again", {
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
      setUserDetails(data);
    }
    // console.log("ud",UserDetails);
  }

  async function getPropertyData() {
    const result = await fetch("http://localhost:5000/getPropertyDetails", {
      method: "post",
      body: JSON.stringify({ sellerId: _id }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    var data = await result.json();
    if (!data) {
      //  console.log("token expire");
      //  toast.error("Your Token has expired... login again", {
      //    position: "top-right",
      //    autoClose: 5000,
      //    hideProgressBar: false,
      //    closeOnClick: true,
      //    rtl: false,
      //    pauseOnHover: true,
      //    draggable: true,
      //    progress: undefined,
      //    theme: "light",
      //  });
      setTimeout(() => {
        localStorage.clear();
        navigate("/login");
      }, 7000);
    } else {
      setPropertyDetails(data);
    }
    // console.log(data);
  }

  const deleteProperty = async (id) => {
    toast.success("Property Deleted Successfully...", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      rtl: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    let data = await fetch(`http://localhost:5000/property/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    data = await data.json();
    if (data) {
      // alert("Record Deleted")
      getPropertyData();
    } else {
      console.log("token expire");
      toast.error("Your Token has expired... Login again", {
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
    }
  };

  const getNewPro = (keyId) => {
    localStorage.setItem("pressCard", keyId);
  };

  const updateProperty = async (id) => {
    const result = await fetch(`http://localhost:5000/getPropertyDetails`, {
      method: "post",
      body: JSON.stringify({ _id: id }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    var data = await result.json();
    if (!data) {
      toast.error("Your Token has expired... Login again", {
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
      let pd = data[0];

      console.log("data", data);
      console.log("md", pd.modified);

      if (pd.modified == 1) {
        toast.warning("Apologies to Say You Reach Maximum Limit of Updation...", {
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
      } else {
        console.log("chid", id);
        navigate(`/updateProperty1/${id}`);
      }
    }
  };

  //add like
  var user = localStorage.getItem("user");
  const user_id = JSON.parse(user)._id;

  async function Increse_Likes(e) {
    var imageId = e.target.value;
    const result = await fetch("http://localhost:5000/like", {
      method: "put",
      body: JSON.stringify({ user_id, imageId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await result.json();

    let temp = [];
    temp = propertyDetails.map((item) => {
      if (item._id == imageId) return data;
      return item;
    });

    setPropertyDetails(temp);

    toast.success("Thank You! For Your Interest...", {
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
  }

  const userUpdate = () => {
    navigate(`/updateUser/${_id}`);
  };
  function fallbackImage() {
    // This function is called when the primary image fails to load.
    // You can update the 'src' attribute to the URL of your fallback image.
    document.getElementById("myImage").src = { ProfileImg };
  }

  return (
    <>
      <div
        className="py-6"
        style={{
          background:
            "linear-gradient(to bottom, rgb(129, 143, 147) 200px,rgb(228, 229, 229)  0)",
        }}
      >
        <div>
          {UserDetails ? (
            <div className="mainProfile shadow-2xl">
              <div className="left-section lsbackground py-8 h-96">
                <img
                  src={require(`../Images/${UserDetails?.image}`)}
                  onerror="fallbackImage()"
                  // alt={ProfileImg}
                  alt=""
                  className="roundImg roundImageHover"
                />
                <h1 id="proUName" className="proUNameTextColor">
                  <strong>{UserDetails.username}</strong>
                </h1>
                <div className="  mx-40 h-1 w-20 mb-3 bg-indigo-700 rounded"></div>
                <h2 id="proField" className="proFieldHover">
                  <strong>
                    Email:{" "}
                    <input
                      type="text"
                      value={UserDetails.email}
                      id="proEmail"
                      disabled
                    />
                  </strong>
                </h2>
                <h2 id="proField" className="proFieldHover">
                  <strong>Phone: {UserDetails.phone}</strong>
                </h2>
                <h2 id="proField" className="proFieldHover">
                  <strong>
                    Birthdate: {UserDetails?.dob?.substring(0, 10)}
                  </strong>
                </h2>
                <div id="proUpdate">
                  <button id="proUpdateBtn" onClick={userUpdate}>
                    {" "}
                    Update{" "}
                  </button>
                </div>
              </div>

              <div className="right-section py-4">
                <div className="my-4">
                  <h1
                    id="proHeading"
                    className="sm:text-3xl text-2xl font-medium title-font mb-3 text-gray-900"
                  >
                    Your Properties To Sell{" "}
                  </h1>
                  <div
                    id="profileHeadingBorder"
                    className="mx-auto h-1 w-20 bg-indigo-500 rounded"
                  ></div>
                </div>

                <div
                  className="overflow-y-auto"
                  style={{ maxHeight: "570px" }}
                >
                  <div className="mainExplore" style={{ maxWidth: "90%" }}>
                    <ul
                      className="cardsExplore"
                      style={{
                        "grid-template-columns":
                          "repeat(auto-fill, minmax(calc(50% - 3rem), 1fr))",
                        gap: "2.5rem",
                      }}
                    >
                      {propertyDetails
                        ? propertyDetails.map((ArrayOfObjects, index) => {
                            const imageNames = ArrayOfObjects.image[0];
                            const keyId = `${ArrayOfObjects._id}`;
                            return (
                              <li
                                className="cards_item_explore"
                                key={ArrayOfObjects._id}
                              >
                                <div className="card" tabindex="0">
                                  <h2 className="card_title_explore">
                                    {" "}
                                    {ArrayOfObjects.propertyFor} &#x2022;
                                    &#8377;
                                    {ArrayOfObjects.price}{" "}
                                  </h2>

                                  <Link
                                    to="/sellPropInfo"
                                    onClick={() =>
                                      getNewPro(ArrayOfObjects._id)
                                    }
                                    key={ArrayOfObjects._id}
                                  >
                                    <div className="card_image_explore">
                                      {ArrayOfObjects.image &&
                                      ArrayOfObjects.image.length > 0 ? (
                                        <img
                                          src={require(`../Images/${ArrayOfObjects.image[0]}`)}
                                          key={ArrayOfObjects.image[0]}
                                          alt="not fetched"
                                        />
                                      ) : (
                                        "Sorry No Data"
                                      )}
                                    </div>
                                  </Link>
                                  <div className="card_content_explore">
                                    <div className="card_text_explore">
                                      <div className="likes">
                                        <button
                                          onClick={Increse_Likes}
                                          value={ArrayOfObjects._id}
                                          disabled={
                                            ArrayOfObjects.likes &&
                                            ArrayOfObjects.likes.some(
                                              (objectId) => objectId == user_id
                                            )
                                          }
                                        >
                                          {ArrayOfObjects.likes &&
                                          ArrayOfObjects.likes.some(
                                            (objectId) => objectId == user_id
                                          ) ? (
                                            <i
                                              className="fa-solid fa-heart"
                                              style={{ color: "red" }}
                                            ></i>
                                          ) : (
                                            <i
                                              className="fa-regular fa-heart"
                                              style={{ color: "red" }}
                                              value={ArrayOfObjects._id}
                                            ></i>
                                          )}
                                          &nbsp;
                                          <span
                                            style={{
                                              color: "#b4fee7",
                                              "font-weight": "600",
                                            }}
                                          >
                                            {ArrayOfObjects.likes &&
                                              ArrayOfObjects.likes.length}{" "}
                                          </span>{" "}
                                          Interested
                                        </button>
                                      </div>
                                      <p>
                                        {" "}
                                        <strong> Property Type: </strong>
                                        {ArrayOfObjects.type}{" "}
                                      </p>
                                      <p>
                                        {" "}
                                        <strong>Location: </strong>{" "}
                                        {ArrayOfObjects.society},{" "}
                                        {ArrayOfObjects.zone},{" "}
                                        {ArrayOfObjects.City},{" "}
                                        {ArrayOfObjects.State}.{" "}
                                      </p>
                                      <p>
                                        {" "}
                                        <strong>Pincode: </strong>{" "}
                                        {ArrayOfObjects.pincode}{" "}
                                      </p>{" "}
                                      <br />
                                      <p className="facility_explore">
                                        {" "}
                                        <strong>Facility: </strong>{" "}
                                        {ArrayOfObjects.rooms} BHK <br />{" "}
                                        <strong>Land Area: </strong>{" "}
                                        {ArrayOfObjects.area}
                                        <span>
                                          {" "}
                                          m<sup>2</sup>
                                        </span>{" "}
                                      </p>
                                      <div id="propertyBtn">
                                        <button
                                          onClick={() =>
                                            updateProperty(ArrayOfObjects._id)
                                          }
                                          className="profilePropertyBtn"
                                          style={{
                                            backgroundColor: "green",
                                          }}
                                        >
                                          {" "}
                                          Update{" "}
                                        </button>
                                        <button
                                          onClick={() =>
                                            deleteProperty(ArrayOfObjects._id)
                                          }
                                          className="profilePropertyBtn"
                                          style={{ backgroundColor: "red" }}
                                        >
                                          {" "}
                                          Delete{" "}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })
                        : ""}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div> Keep wait! Data Fetching is in Processing... </div>
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
    </>
  );
}
