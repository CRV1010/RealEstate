import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const UpdateUser = () => {
     const params = useParams();
     var id = params.id;
     const auth = JSON.parse(localStorage.getItem("user"));
    const [username, setUsername] = useState(auth.username);
    const [email, setEmail] = useState(auth.email);
    const [phone, setPhone] = useState(auth.phone);
    const [dob, setDob] = useState();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };


const [images, setImages] = useState();

  const clickHandler = async (e) => {
   
    // e.preventDefault(); //this can be useful when: Clicking on a "Submit" button, prevent it from submitting a form.
    console.log(images);
    const formData = new FormData();
    formData.append("image", images);

    //to insert the image in my images folder and get te images names to store in database
    const result = await axios.post(
      "http://localhost:5000/upload-imageProfile", //this is api call here
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log("Image Uploaded...");
    const image = result.data;


    if (username !== "" && email !== "" && phone !== "" && dob !== "") {
      
      let data = await fetch(`http://localhost:5000/updateUser/${id}`, {
          method: "put",
          body: JSON.stringify({ username, email, phone, dob,image}),
          headers: {
            "Content-Type": "application/json",
          },
        });
      data = await data.json();
      console.log(data);
      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data.result));
        localStorage.setItem("token", JSON.stringify(data.token));
        navigate("/profile");
      }
    } else {
      alert("you can`t keep an empty field");
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 md:py-24 sm:py-15 mx-auto flex flex-wrap items-center">
        {/* <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 md:pr-16 w-full  h-96 lg:pr-0 pr-0  ml-auto">
          <img src="/logo192.png" alt="" />
        </div> */}
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font text-2xl mb-5 text-center">
            Update User
          </h2>
          <form onSubmit={handleSubmit(clickHandler)}>
            <div className="relative mb-4">
              <label htmlFor="" className="leading-7 text-sm text-gray-600">
                Upload Images:* &nbsp;{" "}
              </label>
              <input
                accept="image/*"
                type="file"
                onChange={(e)=>setImages(e.target.files[0])}
                name="image"
                multiple
              />
            </div>
            <div className="relative mb-4">
              <label for="name" className="leading-7 text-sm text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={username}
                {...register("name", { required: "Username is required" })}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <p className="text-sm text-red-500">{errors.name?.message}</p>
            </div>
            <div className="relative mb-4">
              <label for="email" className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={email}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "Email is not valid email",
                  },
                })}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <p className="text-sm text-red-500">{errors.email?.message}</p>
            </div>
            <div className="relative mb-4">
              <label for="phone" className="leading-7 text-sm text-gray-600">
                Phone No.
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={phone}
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[6-9]{1}[0-9]{9}$/,
                    message: "Phone number is not valid",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone no. cannot exceed more than 10 digit",
                  },
                })}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <p className="text-sm text-red-500">{errors.phone?.message}</p>
            </div>

            <div className="relative mb-4">
              <label for="dob" className="leading-7 text-sm text-gray-600">
                D.O.B
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                }}
              />
              {/* <p class="text-sm text-red-500">{errors.password?.message}</p> */}
            </div>
            <button
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              // onClick={clickHandler}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateUser;
