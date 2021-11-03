import { React, useContext } from "react";
import { NavLink } from "react-router-dom";
import { DataContext } from "../App";

function Payment() {
  const { user } = useContext(DataContext);

  if (!!!user._id) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <h1>这个是 Payment Page!</h1>
      <NavLink to={"/cars/:id"}>
        <p>Back to Selected Car Details</p>
      </NavLink>
      <div className="payment"></div>
    </>
  );
}

export default Payment;
