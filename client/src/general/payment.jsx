import { NavLink } from "react-router-dom";

function Payment() {
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
