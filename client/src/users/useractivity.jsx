import { NavLink } from "react-router-dom";

function UserActivity() {
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
