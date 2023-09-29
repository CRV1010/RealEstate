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
import About from "./Components/About"
import Sell from "./Components/sell";
import AddProperty from "./Components/addProperty";
import Explore from "./Components/explore";
import Carousel from "./Components/Home/Carousel";
import SellBuyRent from "./Components/Home/SellBuyRent";
import PopularProperty from "./Components/Home/PopularProperty";
import HowWork from "./Components/Home/HowWork";
import Comment from "./Components/Home/Comment"
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
          <Route path="/home" element={
            <>
            <Carousel />
            <SellBuyRent />
            <PopularProperty />
            <HowWork />
            <Comment />
            </>
            }/>
            {/* <Route path="/home" element={<Carousel />} /> */}
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<About />} />

            <Route path="/confirmotp" element={<ConfirmOTP />} />
            <Route path="/changepass" element={<ChangePassword />} />
            <Route path="/addProperty" element={<AddProperty />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/explore" element={<Explore />} />

            <Route path="/forgotpass/" element={<ForgotPassword />} />
            <Route path="/forgotpass/:email" element={<ForgotPassword />} />
            <Route path="/chatadmin" element={<ChatAdmin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
