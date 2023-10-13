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
  useEffect(async () => {

    console.log("name")
    // var imga = new File(
    //   [`D:/Practice Program/Real Estate/frontend/src/Images/${image.name}`],
    //   image,
    //   {
    //     type: "image/png",
    //   }
    // );

    await fetchData().then(setInitialImg);
    //  setInitialImg();
  }, []);

  const fetchData = async () => {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var imgs = prodetail.image;
        console.log("my img name", imgs);
        imgs.forEach(async (image) => {
          const img = new Image();
          img.src = require(`D:/Practice Program/Real Estate/frontend/src/Images/${image}`);
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          console.log("count", img);
          const ctx = canvas.getContext("2d");

          ctx.drawImage(img, 0, 0);

          // Convert the canvas content to a Blob
          canvas.toBlob(function (blob) {
            var imga = new File([blob], image, {
              type: "image/png",
            });
            console.log(blob);
            console.log("imga ", imga);
            imags.push(imga);

            console.log("aaja", imags);
            //  setImages([...images,imga]);
          }, "image/png");

        });
        // setImages([...images,...imags]);
        // callback();
        resolve();
        // setInitialImg();
      }, 1000)

    });
  }
  const setInitialImg = () => {
    setImages(imags);
  }

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
      console.log("check", image);
      const blob = new Blob([image], { type: "image/png" });
      console.log(blob);
      if (blob.size < 100) {
        console.log("inside blob ", `${image.name}`)
        newImageUrls.push(
          require(`D:/Practice Program/Real Estate/frontend/src/Images/${image.name}`)
        );
      }
      else {
        newImageUrls.push(URL.createObjectURL(blob));
      }
      // newImageUrls.pop();
      console.log("url", newImageUrls);
    });

    setImageURLs(newImageUrls);
  }, [images]);

  //functions
  const onImageChange = (e) => {
    setImages([...images, e.target.files[0]]);
    console.log("tar", e.target.files[0]);
    images.forEach(img => { console.log("My", img) });
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
    let data = await fetch(`http://localhost:5000/update-database/${prodetail._id}`, {
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
    });
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