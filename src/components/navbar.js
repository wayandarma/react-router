// IMPORTANT PACKAGE
import React from "react";
import "./styles.css";
import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav>
        <Link to={"/"} className="logo-nav">
          Git Explorer
        </Link>

        <div className="link-cont">
          <Link to={"/"}>Repos</Link>
          <Link to={"/about"}> About</Link>
          <Link to={"/search"}> Search</Link>
          <Link to={"/users"}> Users</Link>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
