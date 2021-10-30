import React from "react";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";

function AllCars() {
  return (
    <>
      <h1>Specific car page (SHOW)</h1>
      <NavLink to={"/cars"}>
        <p>Back to All Cars Page</p>
      </NavLink>
    </>
  );
}

export default AllCars;
