import React from "react";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";

function AllCars() {
  return (
    <>
      <h1>All car page (INDEX)</h1>
      <NavLink to={"/"}>
        <p>Back to Main Page</p>
      </NavLink>
    </>
  );
}

export default AllCars;
