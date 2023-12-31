import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../App";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
//auth
import HomeScreen from "../screens/auth/Home";
import AddRestaurantScreen from "../screens/auth/AddRestaurant";
import AddMenuScreen from "../screens/auth/AddMenu";
//unauth
import LoginScreen from "../screens/unauth/Login";
import SignupScreen from "../screens/unauth/Signup";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
      </Route>
      {/* private routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="restaurant" element={<AddRestaurantScreen />} />
        <Route path="addmenu" element={<AddMenuScreen />} />
      </Route>
      <Route path="*" element={<h1>404 Component</h1>} />
    </Route>
  )
);
