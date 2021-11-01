import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const URL = "/api/sessions/new";
  const [name, setName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [status, setStatus] = useState("");

  const typeUsername = (event) => {
    setName(event.target.value);
  };
  const typePassword = (event) => {
    setInputPassword(event.target.value);
  };

  const logIn = async () => {
    const loginDetails = {
      username: !!name ? name : null,
      password: !!inputPassword ? inputPassword : null,
    };

    const res = await axios.post(URL, loginDetails);
    const data = res.data;
    console.log("this is what we get from server: ", data);
    setStatus(data);
    return data;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const title = event.target.title.value;
    // console.log("title", title)
    logIn();
  };
  if (status === "Success") {
    console.log("This is status: ", status);
    return <Redirect to={"/"} />;
  } else {
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
              onChange={typeUsername}
            />
            <input
              name="password"
              placeholder="Insert Password"
              onChange={typePassword}
            />
            <button>Log In</button>
          </form>
        </div>
      </>
    );
  }
}

export default Login;

// function Login() {
//   const inputUserDetails = useRef();
//   const inputPasswordDetails = useRef();
//   const [login, setLogin] = useState({ username: "", password: "" });
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // const title = event.target.title.value;
//     // console.log("title", title)

//     console.log(inputUserDetails.current.value);
//     console.log(inputPasswordDetails.current.value);
//   };
//   return (
//     <>
//       <h1>这个是 Login Page!</h1>
//       <NavLink to={"/"}>
//         <p>Back to Main Page</p>
//       </NavLink>
//       <div className="login">
//         <form onSubmit={handleSubmit}>
//           <input
//             name="username"
//             placeholder="Insert Username"
//             ref={inputUserDetails}
//           />
//           <input
//             name="password"
//             placeholder="Insert Password"
//             ref={inputPasswordDetails}
//           />
//           <button>Log In</button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Login;
