import React, { useEffect, useState } from "react";
import "./addProperty.css";
//first do this :  npm i axios
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  //hooks
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  var prodetail = JSON.parse(localStorage.getItem("propDetails"));
  var imags = [];

  const navigate = useNavigate();

  const imageFiles = [];

  const fetchAndCreateImageFile = (imageName) => {
    return new Promise((resolve, reject) => {
      // Fetch the image using its name or URL
      const img = new Image();
      img.src = require(`../Images/${imageName}`);

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0);
      console.log("image type", canvas);

      //  const base64Data = canvas.toDataURL("image/jpeg");
      //  const blob = new Blob([base64Data], { type: "image/jpeg" });

      //  const imga = new File([blob], imageName, { type: "image/jpeg" });
      //  imageFiles.push(imga);
      //  // Check the size of the created image file
      //  console.log("Image file size:", imga.size, "bytes");

      //  resolve(imga)
      // Convert the canvas content to a Blob
      canvas.toBlob(
        (blob) => {
          var imga = new File([blob], imageName, {
            type: "image/jpeg", // Adjust the type as needed
          });
          console.log("my imga", imga);
          imageFiles.push(imga);
          resolve(imga);
        },
        "image/jpeg",
        1.0
      );
    });
  };

  useEffect(async () => {
    console.log("name");

    var imageNames = prodetail.image;
    let promises = imageNames.map((imageName) =>
      fetchAndCreateImageFile(imageName)
    );

    Promise.all(promises)
      .then(() => {
        setImages(imageFiles);
        console.log("Image files created:", imageFiles);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const [sellPro, setProp] = useState(true);
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
  } = JSON.parse(localStorage.getItem("PropertyDetails"));

  useEffect(() => {
    console.log("ii", images);
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => {
      const blob = new Blob([image], { type: "image/png" });
      console.log(blob);

      if (prodetail.image.includes(image.name)) {
        newImageUrls.push(
          require(`../Images/${image.name}`)
        );
      } else {
        newImageUrls.push(URL.createObjectURL(blob));
      }
      console.log("url", newImageUrls);
    });

    setImageURLs(newImageUrls);
  }, [images]);

  //functions
  const onImageChange = (e) => {
    setImages([...images, e.target.files[0]]);
    console.log("tar", e.target.files[0]);
    images.forEach((img) => {
      console.log("My", img);
    });
    console.log("y", images.length);
    if (images.length >= 0) setProp(false);
    else setProp(true);
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
    console.log("img name", imageName);
    //Updating information to database
    let data = await fetch(
      `http://localhost:5000/update-database/${prodetail._id}`,
      {
        method: "put",
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
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    data = await data.json();
    if (data) {
      toast.success("Property Updated Successfully...", {
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
    }
    console.log("Data updated Successfully...");
    setImages([]);
    setImageURLs([]);
    // window.location.href = "/profile";
    navigate("/profile");
  };

  const deleteImage = (e) => {
    var del = e.target.id;
    setImages(images.filter((_, index) => index != del));
    setImageURLs(imageURLs.filter((_, index) => index != del));
    console.log(images.length);
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
              <label htmlFor="">Upload Images:<span className="red">*</span> &nbsp; </label>
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
              Update Property{" "}
            </button>
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
        </div>
      </div>
    </div>
  );
}
