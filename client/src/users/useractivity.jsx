import { React, useContext } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { DataContext } from "../App";

import axios from "axios";

function UserActivity() {
  const { user } = useContext(DataContext);

  if (!user) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <h1>这个是 UserActivity Page!</h1>
      <NavLink to={"/cars/new"}>
        <p>Want to rent out your car?</p>
      </NavLink>
      <NavLink to={"/cars/:id/edit"}>
        <p>Amend Listed Car Details</p>
      </NavLink>
      <div className="useractivity"></div>
    </>
  );
}

export default UserActivity;
