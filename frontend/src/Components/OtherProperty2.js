import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./explore.css";
// import "./Profile.css";

export default function () {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/login");
    }
  }, []);
  const [database, setdatabase] = useState([]);

  useEffect(() => {
    getData();
  }, []);

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
  if (propertyFor == "Sell") {
    Data = JSON.parse(localStorage.getItem("CombinedData"));
    State = Data.state;
    City = Data.cities;
    type = Data.property;
    zone = Data.area;
    var rtype = Data.type;
    rooms = parseInt(rtype.substring(0, 1));
    var pri = localStorage.getItem("Budget");
    price = parseInt(pri.substring(10));
    console.log(rooms, price);
  } else {
    Data = JSON.parse(localStorage.getItem("RentCombinedData"));
    State = Data.rentState;
    City = Data.rentCities;
    type = Data.rentProperty;
    zone = Data.rentArea;
    var rtype = Data.rentType;
    rooms = parseInt(rtype.substring(0, 1));
    var pri = localStorage.getItem("RentBudget");
    price = parseInt(pri.substring(7));
    console.log(rooms, price);
    // console.log("rent");
  }

  async function getData() {
    const result = await fetch("http://localhost:5000/search-property-three", {
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
      },
    });
    var data = await result.json();
    setdatabase(data);
  }
//   const nextPage = async () => {
//     navigate("/otherproperty2");
//   };

  return (
    <>
      <h1 id="headingExplore"> Properties you may also like </h1>
      <div className="mainExplore" style={{ maxWidth: "80%" }}>
        <ul className="cardsExplore">
          {database
            ? database.map((ArrayOfObjects, index) => {
                const imageNames = ArrayOfObjects.image[0];
                return (
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
                            {ArrayOfObjects.area}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
      {/* <div className="text-center">
        <button
          onClick={nextPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          {" "}
          More Properties{" "}
        </button>
      </div> */}
    </>
  );
}
