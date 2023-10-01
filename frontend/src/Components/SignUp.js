import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import axios from "axios";


const SignUp = () => {
  let myimg = "focus.jpg";
  var images = new File(
    ["../Images/focus.jpg"],
    myimg,
    {
      type: "image/png",
    }
  );
  console.log(images);
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

    // const [images, setImages] = useState();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home");
    }
  });
  const clickHandler = async () => {
    if (username !== "" && email !== "" && phone !== "" && password !== "") {
      let data = await fetch("http://localhost:5000/google-check", {
        method: "post",
        body: JSON.stringify({
          username,
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await data.json();
      if(!data){
        console.log("inside data")
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

        data = await fetch("http://localhost:5000/signup", {
          method: "post",
          body: JSON.stringify({ username, email, phone, password,image }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      data = await data.json();
      console.log(data);
      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data.result));
        localStorage.setItem("token", JSON.stringify(data.token));
        navigate("/home");
        console.log(data);
      }
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");
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
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(clickHandler)}>
            {/* <div className="relative mb-4">
              <input
                accept="image/*"
                type="file"
                value="D:/Practice Program/Real Estate/frontend/src/Images/focus.jpg"
                onLoad={(e) => setImages(e.target.files[0])}
                name="image"
                hidden
              />
            </div> */}
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
              <label for="password" className="leading-7 text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={password}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be more than 4 characters",
                  },
                  maxLength: {
                    value: 10,
                    message: "Password cannot exceed more than 10 characters",
                  },
                })}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <p class="text-sm text-red-500">{errors.password?.message}</p>
            </div>
            <button
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              // onClick={clickHandler}
            >
              Sign Up
            </button>
          </form>
          <p className="mt-5 inline-flex  justify-center">
            Already register ?{" "}
            <Link className="text-indigo-500  px-3" to={"/login"}>
              Login here
            </Link>
          </p>

          <div className="my-5">
            <GoogleOAuthProvider clientId="851512856123-qb0a10uhcbtoemkhq7ma6i34lr79s0r4.apps.googleusercontent.com">
              <p className="my-5 flex items-center justify-between">
                <span className=" border-b-2  w-32  text-gray-950 bg-gray-950"></span>
                OR
                <span className=" border-b-2 w-32 text-gray-950 bg-gray-950"></span>
              </p>
              <div className="mx-auto  text-lg">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    const decode = jwt_decode(credentialResponse.credential);
                    let name = decode.name;
                    let gmail = decode.email;
                    console.log(name, gmail);

                    let data = await fetch(
                      "http://localhost:5000/google-check",
                      {
                        method: "post",
                        body: JSON.stringify({
                          username: name,
                          email: gmail,
                        }),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );

                    console.log("result :", data);
                    data = await data.json();
                    if (!data) {
                      data = await fetch("http://localhost:5000/google-login", {
                        method: "post",
                        body: JSON.stringify({
                          username: name,
                          email: gmail,
                        }),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      });

                      data = await data.json();
                    }
                    console.log(data);
                    if (data.token) {
                      localStorage.setItem("user", JSON.stringify(data.result));
                      localStorage.setItem("token", JSON.stringify(data.token));
                      navigate("/home");
                    }
                  }}
                  onError={() => {
                    console.log("Login Failed");
                    alert("something went wrong");
                  }}
                />
              </div>
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
