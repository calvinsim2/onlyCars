import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login() {
  const URL = "/api/sessions/new";
  const [name, setName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [status, setStatus] = useState();

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
    if (data.username) {
      sessionStorage.setItem("user", data);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const title = event.target.title.value;
    // console.log("title", title)
    logIn();
  };

  // check if there is a user already logged in.
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setStatus(foundUser);
    }
  }, []);

  const handleLogout = () => {
    setName("");
    setInputPassword("");
    setStatus();
  };

  // mui related.
  const wordStyle = {
    color: "primary.main",
  };

  if (status) {
    console.log("This is status: ", status);
    return (
      <div>
        {`${status?.username} is logged in!`}
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    );
  }

  return (
    <div className="login-page">
      <Typography variant="h3" sx={{ ...wordStyle }}>
        这个是 Login Page!
      </Typography>
      <NavLink to={"/"}>
        <p>Back to Main Page</p>
      </NavLink>
      <div className="login">
        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            name="username"
            size="small"
            placeholder="Insert Username"
            onChange={typeUsername}
          />
          <TextField
            name="password"
            size="small"
            placeholder="Insert Password"
            onChange={typePassword}
          />
          <Button type="submit">Log In</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;

// function Login() {
//   const URL = "/api/sessions/new";
//   const [name, setName] = useState("");
//   const [inputPassword, setInputPassword] = useState("");
//   const [status, setStatus] = useState();

//   const typeUsername = (event) => {
//     setName(event.target.value);
//   };
//   const typePassword = (event) => {
//     setInputPassword(event.target.value);
//   };

//   const logIn = async () => {
//     const loginDetails = {
//       username: !!name ? name : null,
//       password: !!inputPassword ? inputPassword : null,
//     };

//     const res = await axios.post(URL, loginDetails);
//     const data = res.data;
//     console.log("this is what we get from server: ", data);
//     setStatus(data);
//     return data;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // const title = event.target.title.value;
//     // console.log("title", title)
//     logIn();
//   };
//   if (status) {
//     console.log("This is status: ", status);
//     return <div>{`${status?.username} is logged in!`}</div>
//   }

//     return (
//       <>
//         <h1>这个是 Login Page!</h1>
//         <NavLink to={"/"}>
//           <p>Back to Main Page</p>
//         </NavLink>
//         <div className="login">
//           <form onSubmit={handleSubmit}>
//             <input
//               name="username"
//               placeholder="Insert Username"
//               onChange={typeUsername}
//             />
//             <input
//               name="password"
//               placeholder="Insert Password"
//               onChange={typePassword}
//             />
//             <button>Log In</button>
//           </form>
//         </div>
//       </>
//     );

// }

// export default Login;
