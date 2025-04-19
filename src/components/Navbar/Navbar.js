import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Random Recipes
      </NavLink>
      <NavLink to="/planner" className={({ isActive }) => (isActive ? "active" : "")}>
        Weekly Planner
      </NavLink>
    </nav>
  );
}

export default Navbar;
