import React from "react";
import { Routes, useNavigate, Route } from "react-router-dom";
import {Login} from "./components"
import Home from "./container/Home"
import { GoogleOAuthProvider } from "@react-oauth/google";
export default function App() {
  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
   
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
    </GoogleOAuthProvider>
  );
}