import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../App";
import axios from "axios";
import { Avatar } from "@mui/material";

function NavigationBar() {
  const URL = "/api/sessions";
  const { user, setUser } = useContext(DataContext);

  const handleLogout = async () => {
    const res = await axios.delete(URL);
    const data = res.data;
    console.log("this is what we get from server: ", data);
    setUser({});
  };

  const adminButton = [
    <NavLink to="/admin" style={{ textDecoration: "none" }}>
      <Button sx={{ color: "white" }}>Show All Users</Button>
    </NavLink>,
  ];

  const loggedInButtons = [
    <>
      <NavLink to="/notifications" style={{ textDecoration: "none" }}>
        <Button sx={{ color: "white" }}>Notifications</Button>
      </NavLink>
      <NavLink to="/cars/" style={{ textDecoration: "none" }}>
        <Button sx={{ color: "white" }}>Rent A Car</Button>
      </NavLink>
      <NavLink to={`/users/${user._id}`} style={{ textDecoration: "none" }}>
        <Button sx={{ color: "white" }}>List A Car</Button>
      </NavLink>
      <NavLink to={`/users/${user._id}`} style={{ textDecoration: "none" }}>
        <div className="rowStyle">
        <Button sx={{ color: "white" }}>My Account</Button>
        <Avatar alt="user_avatar" src={`${user.display_picture}`} />
        </div>
      </NavLink>
      <NavLink to="/login" style={{ textDecoration: "none" }}>
        <Button sx={{ color: "white" }} onClick={handleLogout}>
          Log Out
        </Button>
      </NavLink>
    </>,
  ];

  const loggedOutButtons = [
    <>
      <NavLink to="/signup" style={{ textDecoration: "none" }}>
        <Button sx={{ color: "white" }}>Not a user? Sign up here!</Button>
      </NavLink>
      <NavLink to="/login" style={{ textDecoration: "none" }}>
        <Button sx={{ color: "white" }}>Login</Button>
      </NavLink>
    </>,
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <img
                  src={"/onlycars.png"}
                  height="60px"
                  alt=""
                  style={{ marginTop: "0.5em" }}
                />
              </NavLink>
            </Typography>
            <NavLink to="/about" style={{ textDecoration: "none" }}>
              <Button sx={{ color: "white" }}>About</Button>
            </NavLink>
            {user?.is_admin ? adminButton : null}
            {!!user?._id === true ? loggedInButtons : loggedOutButtons}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default NavigationBar;
