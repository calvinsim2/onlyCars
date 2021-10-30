import React from "react";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";

function Login() {
  const inputUserDetails = useRef();
  const inputPasswordDetails = useRef();
  const [login, setLogin] = useState({ username: "", password: "" });
  const handleSubmit = (event) => {
    event.preventDefault();
    // const title = event.target.title.value;
    // console.log("title", title)

    console.log(inputUserDetails.current.value);
    console.log(inputPasswordDetails.current.value);
  };
  return (
    <>
      <h1>这个是 Login Page!</h1>
      <NavLink to={"/"}>
        <p>Back to Main Page</p>
      </NavLink>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Insert Username"
            ref={inputUserDetails}
          />
          <input
            name="password"
            placeholder="Insert Password"
            ref={inputPasswordDetails}
          />
          <button>Log In</button>
        </form>
      </div>
    </>
  );
}

export default Login;
