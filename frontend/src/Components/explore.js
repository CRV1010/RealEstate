import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./explore.css";

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

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const result = await fetch("http://localhost:5000/get-data", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    var data = await result.json();
    setdatabase(data);
  }

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let data = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          mode: "no-cors",
        },
      });
      if (data) {
        data = await data.json();
        setdatabase(data);
      } else {
        console.log("I dont no ke");
      }
    } else {
      getData();
    }
  };

  return (
    <>
      <h1 id="headingExplore"> Properties for Explore </h1>
      <div className="mainExplore" style={{ maxWidth: "80%" }}>
        <div class="flex w-full justify-center my-7 items-end">
          <div class="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
            <input
              type="text"
              id="hero-field"
              name="hero-field"
              placeholder="Search Property"
              className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={searchHandle}
            />
          </div>
          <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Button
          </button>
        </div>
        <ul className="cardsExplore">
          {database
            ? database.map((ArrayOfObjects, index) => {
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
                              src={require(`../Images/${ArrayOfObjects?.image[0]}`)}
                              key={ArrayOfObjects.image[0]}
                              alt="not fetched"
                            />
                          ) : (
                            <div>Sorry no image</div>
                          )}
                        </div>

                        <div className="card_content_explore">
                          <div className="card_text_explore">
                            {console.log(ArrayOfObjects)}
                            <button value={ArrayOfObjects._id} disabled>
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
                              <strong>Location: </strong>{" "}
                              {ArrayOfObjects.society}, {ArrayOfObjects.zone},{" "}
                              {ArrayOfObjects.City}, {ArrayOfObjects.State}.{" "}
                            </p>
                            <p>
                              {" "}
                              <strong>Pincode: </strong>{" "}
                              {ArrayOfObjects.pincode}{" "}
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
                  </Link>
                );
              })
            : "Not found"}
        </ul>
      </div>
    </>
  );
}

// For all image
{
  /* <div key={ArrayOfObjects._id}>
{
    ArrayOfObjects.image[0] ?
        ArrayOfObjects.image.map((imageName) => {
            return (
                <img src={require(`../Images/${imageName}`)} key={imageName} style={{ 'width': '220px', 'height': '100px' }} alt='Sorry' />
            )
        })
    : ""
}
</div> */
}
