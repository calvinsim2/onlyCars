import { React, useContext } from "react";
import { NavLink } from "react-router-dom";
import { DataContext } from "../App";
import axios from "axios";

function UserEdit() {
  const { user } = useContext(DataContext);

  if (!user) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <h1>这个是 UserEdit Page!</h1>
      <NavLink to={"/users"}>
        <p>Back to profile</p>
      </NavLink>

      <div className="useredit"></div>
    </>
  );
}

export default UserEdit;
