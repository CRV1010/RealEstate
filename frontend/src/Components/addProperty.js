import React, { useEffect, useState } from 'react'

//first do this :  npm i axios
import axios from "axios";

export default function (props) {

  //hooks
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const { selectedValue, type, State, City, society, zone, pincode, area, price, rooms } = JSON.parse(localStorage.getItem('PropertyDetails'));

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
    setImageURLs(newImageUrls);
  }, [images]);


  //functions
  const onImageChange = (e) => {
    setImages([...images, e.target.files[0]])
  }

  const onaddImages = async (e) => {
    e.preventDefault()   //this can be useful when: Clicking on a "Submit" button, prevent it from submitting a form.

    const formData = new FormData();
    images.map((image) => {
      formData.append("image", image)
    })

    //to insert the image in my images folder and get te images names to store in database
    const result = await axios.post(
      "http://localhost:5000/upload-image",    //this is api call here
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
      body: JSON.stringify({ selectedValue, type, State, City, society, zone, pincode, area, price, rooms,imageName}),
      headers: {
        "Content-Type": "application/json",
      }
    });
    console.log("Data Inserted Successfully...")

  };

  const deleteImage = (e) => {
    var del = e.target.id;
    setImages(images.filter((_, index) => index != del));
    setImageURLs(imageURLs.filter((_, index) => index != del));
  }

  return (
    <div>

      {imageURLs.map(
        (imageSrc, index) =>
          <div key={imageSrc}>
            <img src={imageSrc} style={{ 'width': '120px', 'height': '100px' }} alt='Sorry' />
            <input type='button' value={'Delete'} style={{ 'width': '60px', 'height': '30px', 'backgroundColor': 'red' }} id={index} onClick={deleteImage} />
          </div>
      )}
      <br />
      Let's upload image
      <input accept="image/*" type='file' onChange={onImageChange} name="image" multiple />
      <input type="submit" style={{ 'width': '100px', 'height': '50px', 'backgroundColor': 'blue' }} value={'Continue'} onClick={onaddImages} />

      <br /><br /><br />


    </div >
  )
}
