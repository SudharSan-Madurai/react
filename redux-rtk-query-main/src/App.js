import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import AddProducts from "./crud/addproducts";

import ProductUpdates from "./crud/ProductUpdates";
import Dashboard from "./crud/Dashboard1";
import Header from "./header/Header";
import Signup from "./signup/Signupr";
import Login from "./Login/Login";
import Otp from "./otp/Otp";
import Userdashboard from "./userdashboard/Userdashboard";

function App() {

  let isLogin=localStorage.getItem("isLogin")
  return (
    <div className="App">
      <BrowserRouter>

        <Header></Header>

        <Routes>
          {isLogin === "true" && 
           <>
            <Route path="/" element={<Home />} />
          {/*-------------- crud--------------------------  */}
          <Route path="/Addproducts" element={<AddProducts />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/ProductsUpdate/:id" element={<ProductUpdates />} />
           {/* ----------------------------crud end----------- */}
           <Route path="/Userdashboard" element={<Userdashboard/>} />
          </>
          }
         

        {/* ------------------form------------------------------ */}
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />

          {/* ------------------form end------------------------------ */}
          <Route path="/Otp" element={<Otp />} />

        </Routes>
        {/* <div className="footer">
          <Footer />
        </div> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
