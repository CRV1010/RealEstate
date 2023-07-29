import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const clickHandler = async () => {
    let data = await fetch("http://localhost:5000/signup", {
      method: "post",
      body: JSON.stringify({ username, email, phone, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    data = await data.json();
    console.log(data);
    if (data.token) {
      localStorage.setItem("user", JSON.stringify(data.result));
      localStorage.setItem("token", JSON.stringify(data.token));
      console.log(data);
    }
    setUsername("")
    setEmail("")
    setPassword("")
    setPhone("")
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <label>Username : </label>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <div></div>
      <label>Email : </label>
      <input
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <div></div>
      <label>Phone No. : </label>
      <input
        type="Number"
        placeholder="Enter phone no."
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />
      <div></div>
      <label>Password : </label>
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <div></div>
      <button onClick={clickHandler}>Sign Up</button>
      <p>Already register ? <Link to={"/login"} >Login here</Link></p>
    </div>
  );
};

export default SignUp;
