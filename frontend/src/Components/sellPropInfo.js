import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./sellPropInfo.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileImg from "./../Images/focus.jpg";

export default function () {
  const [database, setDatabase] = useState();
  const [zoneData, setZoneData] = useState();
  const [budgetData, setBudgetData] = useState();
  const [seller, setSeller] = useState();
  const [isPremium, setIsPremium] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [dob, setDOB] = useState();
  const [photo, setPhoto] = useState();

  const [modal1Open, setModal1Open] = useState(false);

  var sid = "";

  const navigate = useNavigate();

  const openModal = (propertyFor) => {
    localStorage.setItem("propertyFor", propertyFor);
    setModal1Open(true);
  };

  const closeModal1 = () => {
    setModal1Open(false);
  };

  const onlycloseModal1 = () => {
    setModal1Open(false);
  };

  useEffect(() => {
    const auth = localStorage.getItem("user");
    // console.log("inside use")
    if (!auth) {
      navigate("/login");
    } else getData();
  }, []);

  async function getData() {
    const result = await fetch("http://localhost:5000/get-data", {
      method: "get",
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
      var id = localStorage.getItem("pressCard");

      var temp1 = data.filter((item) => item?._id === id);
      console.log("curr", temp1[0]);
      setDatabase(temp1[0]);
      setIsPremium(temp1[0].premium);

      var zone = temp1[0].zone;
      var temp2 = data.filter((item) => item.zone === zone && item?._id !== id);

      setZoneData(temp2);

      var budget = temp1[0].price;
      var temp3 = data.filter(
        (item) =>
          item.price >= budget - 100000 &&
          item.price <= budget + 100000 &&
          item._id !== id
      );
      setBudgetData(temp3);
    }
  }

  const getNewPro = (keyId) => {
    localStorage.setItem("pressCard", keyId);
    window.location.reload();
  };

  async function getSeller() {
    const result = await fetch("http://localhost:5000/get-seller", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    var data = await result.json();
    // console.log("token", data);
    if (!data) {
      console.log("Something went Wrong");
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
      // console.log(data);
      var temp1 = data.filter((item) => item._id === sid);
      setSeller(temp1[0].username);
      setPhone(temp1[0].phone);
      setEmail(temp1[0].email);
      setDOB(temp1[0].dob);
      setPhoto(temp1[0]);
    }
  }

  function fallbackImage() {
    document.getElementById("myImage").src = { ProfileImg };
  }

  //add like
  var user = localStorage.getItem("user");
  const user_id = JSON.parse(user)?._id;
  async function Increse_Likes() {
    var imageId = localStorage.getItem("pressCard");
    const result = await fetch("http://localhost:5000/like", {
      method: "put",
      body: JSON.stringify({ user_id, imageId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await result.json();

    // console.log("sell page like", data);
    setDatabase(data);

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

  const chatwithseller = async (id) => {
    console.log("chat making")
    let res = await fetch("http://localhost:5000/conversations", {
      method: "POST",
      body: JSON.stringify({
        senderId: user_id,
        receiverId: id,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    let result = await res.json();
    // console.log(result);
    navigate("/chatadmin");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <br /> <br />
      <div className="container px-5 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div className="p-4 lg:w-full">
            <div className="rounded-lg">
              {database ? (
                <>
                  <input type="hidden" value={(sid = database.sellerId)} />
                  <div className="flex justify-between items-center">
                    <div>
                      <div className=" text-center">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                          Property Image:
                        </h1>
                        <div className="h-1 w-28 bg-indigo-500 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <Slider {...settings} style={{ height: "550px" }}>
                    {database.image && database.image.length > 0
                      ? database.image.map((imageName) => {
                          return (
                            <div
                              className="w-full"
                              key={imageName}
                              style={{ height: "550px" }}
                            >
                              <h3
                                className="proType"
                                style={{
                                  backgroundColor: "rgb(181, 220, 142)",
                                }}
                              >
                                <span style={{ color: "green" }}>
                                  {" "}
                                  &#x2022;{" "}
                                </span>
                                {database.propertyFor}
                              </h3>
                              <img
                                src={require(`../Images/${imageName}`)}
                                key={imageName}
                                alt="Sorry"
                                className="proImg w-full rounded-lg object-cover cursor-pointer"
                              />
                            </div>
                          );
                        })
                      : ""}
                  </Slider>

                  <div className="proAuthdetails flex">
                    <div className="proDetail">
                      <h1 className="proPrice">
                        {" "}
                        <span className=" text-red-500"> ₹ </span>
                        {database.price}{" "}
                      </h1>
                      <p className="proAddress">
                        {" "}
                        {database.society}, {database.zone}, {database.City},{" "}
                        {database.State}.{" "}
                      </p>
                      <p className="proPin">
                        {" "}
                        {database.State} - {database.pincode}{" "}
                      </p>{" "}
                      <br />
                      <div className="likes">
                        <button
                          onClick={Increse_Likes}
                          value={database && database._id}
                          disabled={
                            database.likes &&
                            database.likes.some(
                              (objectId) => objectId === user_id
                            )
                          }
                        >
                          {database.likes &&
                          database.likes.some(
                            (objectId) => objectId === user_id
                          ) ? (
                            <i
                              className="fa-solid fa-heart hover:scale-125"
                              style={{ color: "red", fontSize: "20px" }}
                            ></i>
                          ) : (
                            <i
                              className="fa-regular fa-heart hover:scale-125"
                              style={{ color: "red", fontSize: "20px" }}
                            ></i>
                          )}
                          &nbsp;
                          <span style={{ color: "blue", "font-weight": "600" }}>
                            {database.likes && database.likes.length}{" "}
                          </span>{" "}
                          Interested
                        </button>
                      </div>{" "}
                      <br /> <br />
                      <div className="proFacility">
                        <p className="proFacItem pfiBg">
                          {" "}
                          <i className="fa fa-house-user favicon"></i> &nbsp;{" "}
                          {database.type}{" "}
                        </p>
                        <p className="proFacItem pfiBg">
                          {" "}
                          <i className="fa fa-landmark favicon"></i> &nbsp;{" "}
                          {database.rooms} BHK{" "}
                        </p>
                        <p className="proFacItem pfiBg">
                          {" "}
                          <i className="fa fa-chart-area favicon"></i> &nbsp;{" "}
                          {database.area} m<sup>2</sup>{" "}
                        </p>
                        <p className="proFacItem pfiBg">
                          {" "}
                          <i className="fa fa-money-bill-trend-up favicon"></i>{" "}
                          &nbsp; &#8377;{" "}
                          {Math.floor(database.price / database.area)}/m
                          <sup>2</sup>{" "}
                        </p>
                        <p className="proFacItem pfiBg">
                          <i className="fa fa-clock favicon"></i> &nbsp;Built in{" "}
                          {database.build}
                        </p>
                        <p className="proFacItem pfiBg">
                          <i className="fa fa-handshake favicon"></i>
                          &nbsp; &#8377;
                          {database.propertyFor === "Sell"
                            ? Math.floor(database.price * 0.15) + " DWPY"
                            : database.price * 3 + " Deposit"}{" "}
                        </p>
                      </div>{" "}
                      <br /> <br /> <br />
                      <div>
                        <div>
                          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                            Properties Make Best:
                          </h1>
                          <div className="h-1 w-28 bg-indigo-500 rounded"></div>
                        </div>
                        {/* <h1 className="sellProHead"> Properties Make Best: </h1>
                        <hr className="underLine underLineBG" /> */}
                        <p className="special">
                          {" "}
                          Gorgeous {database.rooms} bedroom townhome loaded with
                          updates in the heart of Saint Louis Park. The foyer
                          welcomes you with soaring ceilings, tons of natural
                          light & a floor to ceiling stone surround electric
                          fireplace in the living room. Hard surface flooring
                          throughout the living spaces and all new carpet
                          upstairs. Enjoy a fully remodeled kitchen with all new
                          cabinets offering ample storage, granite countertops &
                          high-end appliances. Gather in the large formal dining
                          room that overlooks the living room. Upstairs you will
                          find {database.rooms} spacious bedrooms including a
                          primary bedroom with private bath and a massive
                          walk-in closet with custom organizers. All{" "}
                          {database.rooms} bathrooms have been updated. Step
                          outside to your private patio overlooking the park.
                          Enjoy a game of tennis, an in-ground pool, relaxing in
                          the sauna, & a private party room - all included with
                          your HOA membership. Schedule your private showing
                          today!{" "}
                        </p>
                      </div>{" "}
                      <br /> <br /> <br />
                      {zoneData ? (
                        zoneData.length === 0 ? (
                          ""
                        ) : (
                          <>
                            <div className="lg:w-1/2 w-full mb-6">
                              <h1 className="sellProHead">
                                {" "}
                                Visit Nearest House:{" "}
                              </h1>
                              <hr
                                className="underLine underLineBG"
                                style={{ width: "40%" }}
                              />
                            </div>
                            <div className="flex flex-nowrap overflow-x-scroll overflow-y-hidden">
                              {zoneData.map((ArrayOfObjects, index) => {
                                const keyId = `${ArrayOfObjects._id}`;
                                return (
                                  <div
                                    className="p-4 flex-none"
                                    style={{ maxWidth: "40%" }}
                                  >
                                    <Link
                                      to="/sellPropInfo"
                                      onClick={() => getNewPro(keyId)}
                                      key={ArrayOfObjects._id}
                                    >
                                      <div className="cards_item_explore">
                                        <div className="card" tabindex="0">
                                          <h2 className="card_title_explore">
                                            {" "}
                                            {ArrayOfObjects.propertyFor}{" "}
                                            &#x2022; &#8377;
                                            {ArrayOfObjects.price}{" "}
                                          </h2>
                                          <div className="card_image_explore">
                                            {ArrayOfObjects.image &&
                                            ArrayOfObjects.image.length > 0 ? (
                                              <img
                                                src={require(`../Images/${ArrayOfObjects.image[0]}`)}
                                                key={ArrayOfObjects.image[0]}
                                                alt="not fetched"
                                              />
                                            ) : (
                                              ""
                                            )}
                                          </div>

                                          <div className="card_content_explore">
                                            <div className="card_text_explore">
                                              <div className="likes">
                                                <button
                                                  onClick={Increse_Likes}
                                                  value={
                                                    database && database._id
                                                  }
                                                  disabled={
                                                    database.likes &&
                                                    database.likes.some(
                                                      (objectId) =>
                                                        objectId === user_id
                                                    )
                                                  }
                                                >
                                                  {database.likes &&
                                                  database.likes.some(
                                                    (objectId) =>
                                                      objectId === user_id
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
                                                      "font-weight": "600",
                                                    }}
                                                  >
                                                    {database.likes &&
                                                      database.likes
                                                        .length}{" "}
                                                  </span>{" "}
                                                  Interested
                                                </button>
                                              </div>
                                              <p>
                                                {" "}
                                                <strong>
                                                  {" "}
                                                  Property Type:{" "}
                                                </strong>
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
                                                {ArrayOfObjects.rooms} BHK{" "}
                                                <br />{" "}
                                                <strong>Land Area: </strong>{" "}
                                                {ArrayOfObjects.area}{" "}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                );
                              })}
                            </div>{" "}
                            <br /> <br /> <br /> <br />
                          </>
                        )
                      ) : (
                        "Not Found"
                      )}
                      {budgetData ? (
                        budgetData.length === 0 ? (
                          ""
                        ) : (
                          <>
                            <div>
                              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                                Get House On Your Budget:
                              </h1>
                              <div className="h-1 w-28 bg-indigo-500 rounded"></div>
                            </div>
                            <div className="flex flex-nowrap overflow-x-scroll overflow-y-hidden">
                              {budgetData.map((ArrayOfObjects, index) => {
                                const keyId = `${ArrayOfObjects._id}`;
                                return (
                                  <div
                                    className="p-4 flex-none"
                                    style={{ maxWidth: "40%" }}
                                  >
                                    <Link
                                      to="/sellPropInfo"
                                      onClick={() => getNewPro(keyId)}
                                      key={ArrayOfObjects._id}
                                    >
                                      <div className="cards_item_explore">
                                        <div className="card" tabindex="0">
                                          <h2 className="card_title_explore">
                                            {" "}
                                            {ArrayOfObjects.propertyFor}{" "}
                                            &#x2022; &#8377;
                                            {ArrayOfObjects.price}{" "}
                                          </h2>
                                          <div className="card_image_explore">
                                            {ArrayOfObjects.image &&
                                            ArrayOfObjects.image.length > 0 ? (
                                              <img
                                                src={require(`../Images/${ArrayOfObjects.image[0]}`)}
                                                key={ArrayOfObjects.image[0]}
                                                alt="not fetched"
                                              />
                                            ) : (
                                              ""
                                            )}
                                          </div>

                                          <div className="card_content_explore">
                                            <div className="card_text_explore">
                                              <div className="likes">
                                                <button
                                                  onClick={Increse_Likes}
                                                  value={
                                                    database && database._id
                                                  }
                                                  disabled={
                                                    database.likes &&
                                                    database.likes.some(
                                                      (objectId) =>
                                                        objectId === user_id
                                                    )
                                                  }
                                                >
                                                  {database.likes &&
                                                  database.likes.some(
                                                    (objectId) =>
                                                      objectId === user_id
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
                                                      "font-weight": "600",
                                                    }}
                                                  >
                                                    {database.likes &&
                                                      database.likes
                                                        .length}{" "}
                                                  </span>{" "}
                                                  Interested
                                                </button>
                                              </div>
                                              <p>
                                                {" "}
                                                <strong>
                                                  {" "}
                                                  Property Type:{" "}
                                                </strong>
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
                                                {ArrayOfObjects.rooms} BHK{" "}
                                                <br />{" "}
                                                <strong>Land Area: </strong>{" "}
                                                {ArrayOfObjects.area}{" "}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                );
                              })}
                            </div>{" "}
                            <br /> <br />
                          </>
                        )
                      ) : (
                        "Not Found"
                      )}
                    </div>

                    <div className="authDetails py-0 my-6">
                      <div className="stickyDiv stickyHover bg-gray-200">
                        <h1 className="contactSeller text-red-500">
                          {" "}
                          KNOW YOUR SELLER{" "}
                        </h1>
                        <div className="h-px w-68 bg-gray-400 rounded"></div>
                        <input
                          className="sellerName cursor-pointer"
                          onClick={() => {
                            openModal("Sell");
                          }}
                          onLoad={getSeller()}
                          value={seller}
                          readOnly
                        />{" "}
                        <br />
                        {modal1Open && (
                          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg w-2/3">
                              <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                                <span className="text-2xl text-white flex px-15 justify-center align-items-center font-medium flex-grow">
                                  Seller Details
                                </span>
                                <button
                                  onClick={onlycloseModal1}
                                  className="text-white font-bold text-xl px-3"
                                >
                                  {" "}
                                  ✕ &nbsp;{" "}
                                </button>
                              </div>
                              <div className="flex justify-between">
                                <div className="justify-center px-16 py-6 w-3/4">
                                  <div className="flex mb-4 mt-4">
                                    <div className="sm:col-span-3">
                                      <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-indigo-500 leading-6 text-gray-900"
                                        style={{
                                          fontSize: "1.5em",
                                          textTransform: "uppercase",
                                        }}
                                      >
                                        Name :- &ensp;
                                      </label>
                                    </div>
                                    <div className="flex-grow">
                                      <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="block w-full border-0 text-gray-900 bg-white uppercase font-medium text-lg"
                                        value={seller}
                                        disabled
                                      />
                                    </div>
                                  </div>
                                  <div className="flex mb-5">
                                    <div className="sm:col-span-3">
                                      <label
                                        htmlFor="email"
                                        className="block text-sm text-indigo-500 font-medium leading-6 text-gray-900"
                                        style={{
                                          fontSize: "1.5em",
                                          textTransform: "uppercase",
                                        }}
                                      >
                                        Email Id :- &ensp;
                                      </label>
                                    </div>
                                    <div className="flex-grow">
                                      <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        className="block w-full font-medium text-lg border-0 text-gray-900 bg-white"
                                        value={email}
                                        disabled
                                      />
                                    </div>
                                  </div>
                                  <div className="flex mb-5">
                                    <div className="sm:col-span-3">
                                      <label
                                        htmlFor="phone"
                                        className="block text-sm text-indigo-500 font-medium leading-6 text-gray-900"
                                        style={{
                                          fontSize: "1.5em",
                                          textTransform: "uppercase",
                                        }}
                                      >
                                        Phone No. :- &ensp;
                                      </label>
                                    </div>
                                    <div className="flex-grow">
                                      <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        className="block font-medium text-lg w-full border-0  text-gray-900 bg-white uppercase"
                                        value={phone}
                                        disabled
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="w-1/4 mr-5">
                                  <img
                                    src={require(`../Images/${photo?.image}`)}
                                    onerror="fallbackImage()"
                                    alt=""
                                    className="w-45 h-48 mt-2 p-3  hover:shadow-md sellerImg"
                                  />
                                </div>
                              </div>
                              <div className="px-20 pb-6">
                                {isPremium ? (
                                  <button
                                    onClick={() => {
                                      chatwithseller(database.sellerId);
                                    }}
                                    className="bg-indigo-500 text-white font-semibold px-5 mr-6 py-2 rounded hover:bg-indigo-700"
                                  >
                                    <i className="fa-solid fa-comments"></i>
                                    &nbsp; Chat With Seller
                                  </button>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        {isPremium ? (
                          <button
                            className="chatSeller"
                            onClick={() => {
                              chatwithseller(database.sellerId);
                            }}
                          >
                            {" "}
                            <i className="fa-solid fa-comments"></i> &nbsp; Chat
                            with Seller{" "}
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                "Sorry ! not find"
              )}
            </div>
          </div>
        </div>
      </div>{" "}
      <br /> <br />
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
