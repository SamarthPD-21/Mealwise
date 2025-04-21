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
      <NavLink to="/grocery" className={({ isActive }) => (isActive ? "active" : "")}>
        Grocery List
      </NavLink>
    </nav>
  );
}

export default Navbar;