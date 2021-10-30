import { NavLink } from "react-router-dom";

function UserEdit() {
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
