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
import { useContext } from "react";
import { DataContext } from "../App";
import axios from "axios";
import { Box } from "@mui/system";

import { AdminUserCard } from "../globalComponents/AdminUserCard";
import { useHistory } from "react-router-dom";

function Admin() {
  const allUserURL = "/api/users";
  const { user } = useContext(DataContext);

  const history = useHistory();

  if (!!user.is_admin === false) {
    history.push("/");
  }

  const [allUsers, setAllUsers] = useState([]);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const fetchAllUsers = async () => {
      setStatus("loading");
      const res = await axios.get(allUserURL);
      console.log("data fetched for admin is:", res.data);
      setAllUsers(res.data);
      setStatus("resolved");
    };
    fetchAllUsers();
  }, []);

  // delete function
  const deleteUser = async (id) => {
    // send delete request to backend
    const deleteURL = `/api/users/${id}`;
    await axios.delete(deleteURL);

    // re-render page to show remaining users
    setAllUsers(allUsers.filter((h) => h._id !== id));
  };

  const userShow = allUsers.map((element) => {
    return (
      <>
        <AdminUserCard
          userInfo={element}
          deleteUser={deleteUser}
          key={`userCard${element._id}`}
        />
      </>
    );
  });

  return (
    <>
      <Grid container>
        <Grid item container>
          <Box className="rowStyle">
            {status === "resolved" ? userShow : <LinearProgress />}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Admin;
