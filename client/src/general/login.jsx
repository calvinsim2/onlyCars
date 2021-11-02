import React from "react";
import { NavLink } from "react-router-dom";

import { useState, useContext } from "react";
import { DataContext } from "../App";
import axios from "axios";

import "../App.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login() {
  const URL = "/api/sessions/new";

  const [name, setName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { user, setUser } = useContext(DataContext);

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
    setUser(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    logIn();
  };

  // mui related.
  const wordStyle = {
    color: "primary.main",
  };

  // RENDER
  if (user) {
    return <div>{`${user?.username} is logged in!`}</div>;
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
