import React from "react";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";

function SignUp() {
  const inputUserDetails = useRef();
  const inputPasswordDetails = useRef();
  const inputDisplayNameDetails = useRef();
  const [user, setUser] = useState({
    username: "",
    password: "",
    displayName: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    // const title = event.target.title.value;
    // console.log("title", title)

    console.log(inputUserDetails.current.value);
    console.log(inputPasswordDetails.current.value);
  };
  return (
    <>
      <h1>这个是 Sign Up Page!</h1>
      <NavLink to={"/"}>
        <p>Back to Main Page</p>
      </NavLink>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Desired username"
            ref={inputUserDetails}
          />
          <input
            name="password"
            placeholder="Desired Password"
            ref={inputPasswordDetails}
          />
          <input
            name="displayname"
            placeholder="Display Name"
            ref={inputDisplayNameDetails}
          />
          <button>Create Account!</button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
