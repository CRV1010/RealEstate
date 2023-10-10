import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./addProperty.css";
import axios from "axios";

export default function (props) {
  //hooks
  const location = useLocation();
  const totalAmount = location.state ? location.state.totalAmount : null;

  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const navigate = useNavigate();

  const [sellPro, setProp] = useState(true);
  const propertyDetails = JSON.parse(localStorage.getItem("PropertyDetails"));
  const {
    selectedValue,
    type,
    State,
    City,
    society,
    zone,
    pincode,
    area,
    price,
    rooms,
    sellerId,
    owner,
  } = propertyDetails;

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    console.log("url", newImageUrls);
    setImageURLs(newImageUrls);
  }, [images]);

  //functions
  const onImageChange = (e) => {
    if (totalAmount == 999 && images.length == 3) {
      alert("Sorry You Have Max Limit of images is 3");
    } else if (totalAmount == 1999 && images.length == 5) {
      alert("Sorry You Have Max Limit of images is 5");
    } else {
      setImages([...images, e.target.files[0]]);
      console.log("y", images.length);
      if (images.length >= 0) setProp(false);
      else setProp(true);
    }
  };

  const onaddImages = async (e) => {
    e.preventDefault(); //this can be useful when: Clicking on a "Submit" button, prevent it from submitting a form.

    const formData = new FormData();
    images.map((image) => {
      formData.append("image", image);
    });

    //to insert the image in my images folder and get te images names to store in database
    const result = await axios.post(
      "http://localhost:5000/upload-image", //this is api call here
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log("Image Uploaded...");
    const imageName = result.data;

    //inserting information to database
    const data = await fetch("http://localhost:5000/upload-database", {
      method: "post",
      body: JSON.stringify({
        selectedValue,
        type,
        State,
        City,
        society,
        zone,
        pincode,
        area,
        price,
        rooms,
        sellerId,
        imageName,
        owner,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Data Inserted Successfully...");

    navigate("/explore")
  };

  const deleteImage = (e) => {
    var del = e.target.id;
    setImages(images.filter((_, index) => index != del));
    setImageURLs(imageURLs.filter((_, index) => index != del));
    // console.log(images.length);
    if (images.length > 1) setProp(false);
    else setProp(true);
  };

  return (
    <div id="mainPropImage" style={{ backgroundColor: "rgb(145, 209, 188)" }}>
      <div className="mainBlock">
        <div id="sellImageForm">
          <div className="title">
            <i className="fas fa-photo-film text-imgPropIcon"></i> &ensp;
            <h2 id="centerHeading"> Property Images </h2>
          </div>
          <br /> <br />
          <div className="information">
            <h1 id="markLabel"> --- View Your Images --- </h1> <br />
            <div id="imgList">
              {imageURLs.map((imageSrc, index) => (
                <div key={imageSrc} id="innerDiv">
                  <img
                    src={imageSrc}
                    className="imgShadow"
                    id="selectedImg"
                    alt="not found"
                  />
                  <input
                    type="button"
                    className="deleteBtn"
                    value={"Delete"}
                    id={index}
                    onClick={deleteImage}
                  />
                </div>
              ))}
            </div>
            <br /> <br />
            <div id="formData">
              <label htmlFor="">Upload Images:* &nbsp; </label>
              <input
                accept="image/*"
                type="file"
                onChange={onImageChange}
                name="image"
                multiple
              />
            </div>
            <br /> <br /> <br />
            {console.log(sellPro)}
            <button
              id="sellPropBtn"
              className={sellPro ? "notSell" : "sell"}
              disabled={sellPro}
              onClick={onaddImages}
            >
              {" "}
              Sell Property{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
