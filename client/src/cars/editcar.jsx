import React from "react";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";

function EditCar() {
  return (
    <>
      <h1>Edit Car Page (Edit)</h1>
      <NavLink to={"/cars"}>
        <p>Back to All Cars Page</p>
      </NavLink>
    </>
  );
}

export default EditCar;
