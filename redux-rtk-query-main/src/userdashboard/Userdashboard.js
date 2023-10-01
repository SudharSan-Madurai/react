import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Userdashboard() {
  const navigate=useNavigate();

let data = JSON.parse(localStorage.getItem("CurrentUser"));
console.log(data);
  return (
    <div>
      <div class="container">
        <div class="row">
          {/* ------------------user details after login---------------------------- */}
          <h5>username:{data[0].username || ""}</h5>
          <h5>useremail:{data[0].email || ""}</h5>


        </div>
      </div>
      <div class="container">
        <div class="row">
          <div className='col-md-4'>
            <div className='card'>
              {/* ------------------------add item------------------------------- */}
              <button type="button" class="btn btn-success" onClick={()=>navigate("/Addproducts")}  > Add products</button></div>
          </div>
          <div className='col-md-4'>
            <div className='card'>
              {/* -----------------------------list table----------------------------------------- */}
              <button type="button" class="btn btn-info"  onClick={()=>navigate("/Dashboard")} >Your cart</button>

            </div>
          </div>

        </div>
      </div>








    </div>
  )
}
