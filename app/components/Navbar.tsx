import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-lg md:text-2xl font-bold text-gradient">
          RESUMIN_ID
        </p>
      </Link>
      <div className="flex gap-2 justify-center items-center">
        <Link to="/upload">
          <p className="primary-button text-sm">Upload Resume</p>
        </Link>
        <Link to="/wipe" className="gradient-border py-2">
          <p className=" text-sm">Wipe Resume</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
