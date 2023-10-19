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
import About from "./Components/About";
import Sell from "./Components/sell";
import AddProperty from "./Components/addProperty";
import Explore from "./Components/explore";

import Carousel from "./Components/Home/Carousel";
import Searchbar from "./Components/Home/Searchbar";
import SearchMap from "./Components/Home/SearchMap";
import SellBuyRent from "./Components/Home/SellBuyRent";
import PopularProperty from "./Components/Home/PopularProperty";
import HowWork from "./Components/Home/HowWork";
import Comment from "./Components/Home/Comment";
import Footer from "./Components/Footer";

import SearchedProperty from "./Components/SearchedProperty";
import Profile from "./Components/profile";
import OtherProperty from "./Components/OtherProperty";
import UpdateProperty1 from "./Components/UpdateProperty1";
import UpdateProperty2 from "./Components/UpdateProperty2";
import OtherProperty2 from "./Components/OtherProperty2";
import UpdateUser from "./Components/UpdateUser";
import AdminPage from "./Components/AdminPage";
import AdminUsers from "./Components/AdminUsers";
import AdminProperty from "./Components/AdminProperty";
import Premium from "./Components/Premium";
import SellPropInfo from "./Components/sellPropInfo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route
              path="/"
              element={
                <>
                  <Carousel />
                  <SellBuyRent />
                  <PopularProperty />
                  <HowWork />
                  <Comment />
                  <Footer />
                </>
              }
            />
            <Route
              path="/home"
              element={
                <>
                  {/* <Searchbar /> */}
                  <Carousel />
                  <SellBuyRent />
                  <PopularProperty />
                  <HowWork />
                  <Comment />
                  <Footer />
                </>
              }
            />
            <Route path="/searchmap" element={<SearchMap />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/home" element={<Carousel />} /> */}
            <Route
              path="/contact"
              element={
                <>
                  <ContactUs />
                  <Footer />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <About />
                  <Footer />
                </>
              }
            />
            <Route path="/confirmotp" element={<ConfirmOTP />} />
            <Route path="/changepass" element={<ChangePassword />} />
            <Route
              path="/addProperty"
              element={
                <>
                  <AddProperty />
                  <Footer />
                </>
              }
            />
            <Route
              path="/sell"
              element={
                <>
                  <Sell />
                  <Footer />
                </>
              }
            />
            <Route
              path="/explore"
              element={
                <>
                  <Explore />
                  <Footer />
                </>
              }
            />
            <Route path="/searchProperty" element={<SearchedProperty />} />
            <Route
              path="/profile"
              element={
                <>
                  <Profile />
                  <Footer />
                </>
              }
            />
            <Route path="/otherproperty" element={<OtherProperty />} />
            <Route path="/otherproperty2" element={<OtherProperty2 />} />
            <Route path="/updateProperty1/:id" element={<UpdateProperty1 />} />
            <Route path="/updateProperty2" element={<UpdateProperty2 />} />
            <Route path="/updateUser/:id" element={<UpdateUser />} />
            <Route
              path="/adminpage"
              element={
                <>
                  <AdminPage />
                  <Footer />
                </>
              }
            />
            {/* <Route path="/adminuser" element={<AdminUsers />} />
            <Route path="/adminProperty" element={<AdminProperty />} /> */}

            <Route path="/forgotpass/" element={<ForgotPassword />} />
            <Route path="/forgotpass/:email" element={<ForgotPassword />} />
            <Route path="/chatadmin" element={<ChatAdmin />} />
            <Route
              path="/login"
              element={
                <>
                  <Login />
                  <Footer />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <SignUp />
                  <Footer />
                </>
              }
            />
            <Route path="/premium" element={<Premium />} />
            <Route path="/sellPropInfo" element={<SellPropInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
