import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Grid, LinearProgress } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { CarCard } from "../globalComponents/CarCard";
import { UserCard } from "../globalComponents/UserCard";
import { NavLink } from "react-router-dom";

function Admin() {
  const allUserURL = "/api/users";

  const [allUsers, setAllUsers] = useState([]);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const fetchAllUsers = async () => {
      setStatus("Loading");
      const res = await axios.get(allUserURL);
      console.log("data fetched for admin is:", res.data);
      setAllUsers(res.data);
      setStatus("Resolved");
    };
    fetchAllUsers();
  });
}

export default Admin;
