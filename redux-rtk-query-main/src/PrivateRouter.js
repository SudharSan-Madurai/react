// PrivateRoute.js

import React from 'react';
import { Route, Redirect, Outlet } from 'react-router-dom';
import Login from './Login/Login';

const PrivateRoute = () => {
    let isLogin=localStorage.getItem("isLogin")

console.log(isLogin);
  return (
<div>
    if(isLogin != true){
        <Route path="/Login" element={<Login />} />
    }else{

<Outlet />
    }
</div>
  );
};

export default PrivateRoute;
