import React, { useEffect, useState } from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/NavbarComp";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar></Navbar>
      <div className="container my-3 ">
        <Outlet></Outlet>
      </div>
    </>
  );
}
