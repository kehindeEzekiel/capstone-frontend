import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/common/header";
import Footer from "../component/common/footer";
import "./layout.css";

const Layout = () => {
  return (
    <div className="">
      <Header />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
