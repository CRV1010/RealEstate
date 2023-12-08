import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./explore.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  const navigate = useNavigate();
  var user = localStorage.getItem("user");
  const user_id = JSON.parse(user)._id;

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/login");
    }
  }, []);

  const [database, setdatabase] = useState([]);
  var Data;
  var propertyFor = localStorage.getItem("propertyFor");
  console.log(propertyFor);
  // var propertyFor = "Sell";
  var type;
  var State;
  var City;
  var zone;
  var rooms;
  var price;
  
  if (propertyFor === "Sell") {
    Data = JSON.parse(localStorage.getItem("CombinedData"));

    State = Data.state;
    City = Data.cities;
    type = Data.property;
    zone = Data.area;
    var rtype = Data.type;
    rooms = parseInt(rtype.substring(0, 1));
    var pri = localStorage.getItem("Budget");
    let x = pri.indexOf("-");
    price = parseInt(pri.substring(x + 1));
  } else {
    Data = JSON.parse(localStorage.getItem("RentCombinedData"));
    State = Data.rentState;
    City = Data.rentCities;
    type = Data.rentProperty;
    zone = Data.rentArea;
    rtype = Data.rentType;
    rooms = parseInt(rtype.substring(0, 1));
    pri = localStorage.getItem("RentBudget");
    let x = pri.indexOf('-')
    price = parseInt(pri.substring(x+1));
  }

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const result = await fetch("http://localhost:5000/search-property", {
      method: "post",
      body: JSON.stringify({
        propertyFor,
        type,
        State,
        City,
        zone,
        rooms,
        price,
      }),
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
         }
         else{
           setdatabase(data);
         }
  }

  const nextPage = async () => {
    navigate("/otherproperty");
  };

  return (
    <>
      <h1 id="headingExplore"> Properties That Matches Your Requirements </h1>
      <div className="mainExplore" style={{ maxWidth: "80%" }}>
        <ul className="cardsExplore">
          {database ? (
            database.map((ArrayOfObjects, index) => {
              const imageNames = ArrayOfObjects?.image[0];
              const keyId = `${ArrayOfObjects._id}`;
              return (
                <Link
                  to="/sellPropInfo"
                  onClick={() => localStorage.setItem("pressCard", keyId)}
                  key={ArrayOfObjects._id}
                >
                  <li className="cards_item_explore" key={ArrayOfObjects._id}>
                    <div className="card" tabindex="0">
                      <h2 className="card_title_explore">
                        {" "}
                        {ArrayOfObjects.propertyFor} &#x2022; &#8377;
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
                          {/* {console.log(ArrayOfObjects)} */}
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
                                "font-weight": "600",
                              }}
                            >
                              {ArrayOfObjects.likes &&
                                ArrayOfObjects.likes.length}{" "}
                            </span>
                            Interested
                          </button>
                          <p>
                            {" "}
                            <strong> Property Type: </strong>
                            {ArrayOfObjects.type}{" "}
                          </p>
                          <p>
                            {" "}
                            <strong>Location: </strong> {ArrayOfObjects.society}
                            , {ArrayOfObjects.zone}, {ArrayOfObjects.City},{" "}
                            {ArrayOfObjects.State}.{" "}
                          </p>
                          <p>
                            {" "}
                            <strong>Pincode: </strong> {ArrayOfObjects.pincode}{" "}
                          </p>{" "}
                          <br />
                          <p className="facility_explore">
                            {" "}
                            <strong>Facility: </strong> {ArrayOfObjects.rooms}{" "}
                            BHK <br /> <strong>Land Area: </strong>{" "}
                            {ArrayOfObjects.area}
                            <span>
                              {" "}
                              m<sup>2</sup>
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </Link>
              );
            })
          ) : (
            <li>No Properties Available Within Your Searching Requirements.</li>
          )}
        </ul>
      </div>
      <div className="text-center">
        <button
          onClick={nextPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          {" "}
          Other Properties You May Like{" "}
        </button>
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
