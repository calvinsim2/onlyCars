import React from "react";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";

function ListCars() {
  return (
    <>
      <h1>Listing Car Page (Create)</h1>
      <NavLink to={"/cars"}>
        <p>Back to All Cars Page</p>
      </NavLink>
    </>
  );
}

export default ListCars;
