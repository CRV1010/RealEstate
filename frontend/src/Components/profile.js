import React, { useEffect, useState } from 'react'
import './Profile.css'
import ProfileImg from './../Images/focus.jpg';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function (props) {

  var user = localStorage.getItem("user");
  var _id = JSON.parse(user)._id;
  const navigate = useNavigate();

  const [UserDetails, setUserDetails] = useState();
  const [propertyDetails, setPropertyDetails] = useState();

  useEffect(() => {
    getUserData();
    getPropertyData();
  }, [])

  async function getUserData() {
    const result = await fetch("http://localhost:5000/getUserDetails", {
      method: "post",
      body: JSON.stringify({ _id }),
      headers: {
        "Content-Type": "application/json",
      }
    })
    var data = await result.json();
    setUserDetails(data)
    // console.log("ud",UserDetails);
  }

  async function getPropertyData() {
    const result = await fetch("http://localhost:5000/getPropertyDetails", {
      method: "post",
      body: JSON.stringify({ sellerId : _id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    var data = await result.json();
    setPropertyDetails(data);
    console.log(data)
  }

  const deleteProperty = async (id) =>{
     toast.warning("You are Deleting Property...", {
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
      // headers: {
      //   authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      // }
    });
    data = await data.json();
    if (data) {
      // alert("Record Deleted")
      getPropertyData();
    }
  }

  const updateProperty = async(id) => {
   
    const result = await fetch(`http://localhost:5000/getPropertyDetails`, {
      method: "post",
      body: JSON.stringify({ _id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    var data = await result.json();
    let pd = data[0];
    console.log("data",data)
    console.log("md",pd.modified);
    if (pd.modified==1) {
      toast.warning("You have Reached max limit of Updation...", {
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
    else {
      navigate(`/updateProperty1/${id}`);
    }
  }

  const userUpdate = () =>{
    
    navigate(`/updateUser/${_id}`);
  }
  function fallbackImage() {
    // This function is called when the primary image fails to load.
    // You can update the 'src' attribute to the URL of your fallback image.
    document.getElementById("myImage").src = {ProfileImg};
  }

  return (
    <div>
      {UserDetails ? (
        <div className="mainProfile">
          <div className="left-section lsbackground">
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
              <strong>Brithdate: {UserDetails?.dob?.substring(0, 10)}</strong>
            </h2>
            <div id="proUpdate">
              <button id="proUpdateBtn" onClick={userUpdate}>
                {" "}
                Update{" "}
              </button>
            </div>
          </div>

          <div className="right-section">
            <h1 id="proHeading">
              {" "}
              <i className="fa fa-star"></i> Your Properties To Sell{" "}
              <i className="fa fa-star"></i>{" "}
            </h1>
            <div className="mainExplore" style={{ maxWidth: "80%" }}>
              <ul
                className="cardsExplore"
                style={{
                  "grid-template-columns":
                    "repeat(auto-fill, minmax(calc(50% - 3rem), 1fr))",
                  gap: "4rem",
                }}
              >
                {propertyDetails
                  ? propertyDetails.map((ArrayOfObjects, index) => {
                      const imageNames = ArrayOfObjects.image[0];
                      return (
                        <li
                          className="cards_item_explore"
                          key={ArrayOfObjects._id}
                        >
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
                                  <strong>Location: </strong>{" "}
                                  {ArrayOfObjects.society},{" "}
                                  {ArrayOfObjects.zone}, {ArrayOfObjects.City},{" "}
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
                                  {ArrayOfObjects.area}{" "}
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
        </div>
      ) : (
        <div> Sorry ! Data is not Fetched... </div>
      )}
    </div>
  );
}