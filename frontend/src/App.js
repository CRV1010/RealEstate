import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import ContactUs from "./Components/ContactUs";
import PrivateComponent from "./Components/PrivateComponent";
import Navbar from "./Components/Navbar";
import ForgotPassword from "./Components/ForgotPassword";
import ConfirmOTP from "./Components/ConfirmOTP";
import ChangePassword from "./Components/ChangePassword";
import ChatAdmin from "./Components/ChatAdmin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/home" element={<h1>Home Page</h1>} />
            <Route path="/about" element={<h1>About Page</h1>} />
            <Route path="/contact" element={<ContactUs/>} />
            <Route path="/confirmotp" element={<ConfirmOTP />} />
            <Route path="/changepass" element={<ChangePassword />} />

            <Route path="/forgotpass/" element={<ForgotPassword />} />
            <Route path="/forgotpass/:email" element={<ForgotPassword />} />
            <Route path="/chatadmin" element={<ChatAdmin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
