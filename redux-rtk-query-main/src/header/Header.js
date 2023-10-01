import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export default function Header() {
    const navigate=useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const logout=()=>{
      localStorage.removeItem("isLogin");
      navigate('/Login')
    }
  return (
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>
    
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <a class="navbar-brand mt-2 mt-lg-0" href="">
            <img
              src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
              height="15"
              alt="MDB Logo"
              loading="lazy"
            />
          </a>
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          <li class="nav-item">
              <a class="nav-link" href="" onClick={()=>navigate("/")}>Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="" onClick={()=>navigate("/Login")}>login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="" onClick={()=>navigate("/Signup")}  >signup</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="" onClick={()=>navigate("/Userdashboard")} >Dashboard</a>
            </li>
          </ul>
        </div>
    
        <div class="d-flex align-items-center">
          <a class="text-reset me-3" href="">
            <i class="fas fa-shopping-cart"></i>
          </a>
    

          <Dropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle caret>
        <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                class="rounded-circle"
                height="25"
                alt="Black and White Portrait of a Man"
                loading="lazy"
              /></DropdownToggle>
        <DropdownMenu >
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem onClick={()=>logout()}>Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>


    
      
        </div>
      </div>
    </nav>
    </div>
  )
}
