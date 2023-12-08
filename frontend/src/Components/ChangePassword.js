import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const clickHandler = async () => {
    if (password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        let email = JSON.parse(localStorage.getItem("email"));
        console.log(email);
        let data = await fetch(
          `http://localhost:5000/update_password/` + email,
          {
            method: "put",
            body: JSON.stringify({ password }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        function successNoty() {
          toast.success("Password change successfully. You may proceed for login...", {
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

        data = await data.json();
        console.log(data);
        if (data) {
          navigate("/login");
          localStorage.clear();
          setTimeout(successNoty, 1000);
        } else {
          toast.error("Oops! Changing password is failed...", {
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
      } else {
        toast.warning("Attention! Password didn't match...", {
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
    } else {
      toast.error("Error: Password must be filled...", {
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
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5  md:py-24 sm:py-15 mx-auto flex flex-wrap items-center">
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md: mx-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium  text-2xl title-font mb-5 text-center">
              Change Password
            </h2>
            <form onSubmit={handleSubmit(clickHandler)}>
              <div className="relative mb-4">
                <label
                  for="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  New Password :<span className="red text-lg">*</span>
                </label>
                <div className="flex w-full bg-white rounded border border-gray-300 hover:border-indigo-500 hover:ring-2 hover:ring-indigo-200 outline-none px-3 transition-colors duration-200">
                  <input
                    type={show ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    className="w-full text-base outline-none text-gray-700 my-1 leading-8 duration-200"
                    value={password}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 4,
                        message: "Password must be more than 4 characters",
                      },
                      maxLength: {
                        value: 10,
                        message:
                          "Password cannot exceed more than 10 characters",
                      },
                    })}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <div
                    className="mr-3 mt-1 toggle-button"
                    onClick={() => setShow(!show)}
                  >
                    {show ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </div>
                </div>
                <p class="text-sm text-red-500">{errors.password?.message}</p>
              </div>
              <div className="relative mb-4">
                <label
                  for="confirmPassword"
                  className="leading-7 text-sm text-gray-600"
                >
                  Confirm Password :<span className="red text-lg">*</span>
                </label>
                <div className="flex w-full bg-white rounded border border-gray-300 hover:border-indigo-500 hover:ring-2 hover:ring-indigo-200 outline-none px-3 transition-colors duration-200">
                  <input
                    type={visible ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Enter Confirm Password"
                    className="w-full text-base outline-none text-gray-700 my-1 leading-8 duration-200"
                    value={confirmPassword}
                    {...register("confirmPassword", {
                      required: "Password is required",
                      minLength: {
                        value: 4,
                        message: "Password must be more than 4 characters",
                      },
                      maxLength: {
                        value: 10,
                        message:
                          "Password cannot exceed more than 10 characters",
                      },
                    })}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <div
                    className="mr-3 mt-1 toggle-button"
                    onClick={() => setVisible(!visible)}
                  >
                    {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </div>
                </div>
                <p class="text-sm text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              </div>
              <button
                className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                // onClick={clickHandler}
              >
                Update Password
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
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangePassword;
