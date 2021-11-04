import * as React from "react";
import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../App";
import axios from "axios";
import { Box } from "@mui/system";
import { CarCard } from "../globalComponents/CarCard";
import { UserCard } from "../globalComponents/UserCard";
import { Link, NavLink } from "react-router-dom";

function Main() {
  const { user, setUser } = useContext(DataContext);
  const carURL = "/api/cars/";
  const userURL = "/api/users";

  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const fetchCar = async () => {
      setStatus("loading");
      const res = await axios.get(carURL);
      console.log(res.data);
      setCars(res.data);
      setStatus("resolved");
    };
    const fetchUser = async () => {
      const res = await axios.get(userURL);
      console.log(res.data);
      setUsers(res.data);
    };
    fetchCar();
    fetchUser();
  }, []);

  const carsCardArrayRender = cars?.map((eachCar, index) => {
    if (index < 3) {
      return (
        <Grid item xs={4} key={`cardCard${eachCar._id}`}>
          <CarCard carInfo={eachCar} key={`cardCard${eachCar._id}`} />
        </Grid>
      );
    }
  });

  const userCardArrayRender = users?.map((eachUser, index) => {
    if (index < 3) {
      return (
        // <Grid item xs={4} key={`userCard${eachUser._id}`}>
        <UserCard userInfo={eachUser} key={`userCard${eachUser._id}`} />
        // </Grid>
      );
    }
  });

  return (
    <>
      <Grid container>
        <Grid item xs={12} sx={{ align: "center" }}>
          <Box sx={{display:"flex", width:"80vw", alignContent:"center", alignItems:"center", justifyContent:"center", justifyItems:"center", mt:"1em"}}>
          <img src="/onlycars.png" width="500px"/>
          </Box>
          <div style={{marginLeft:"8em"}}><h1>I want to...</h1></div>
          <Box className="rowStyle" sx={{mt:"1em", mb: "1em"}}>
            <Box className="centered_div">
              <Link to="/cars/" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="success" sx={{fontSize:"3vw", width: "13vw", height:"5vw"}}>RENT</Button>
              </Link>
            </Box>
            <Box className="centered_div">
              <Link to={`/users/${user?._id}`} style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="success" sx={{fontSize:"3vw", width: "13vw", height:"5vw"}}>LIST</Button>
              </Link>
            </Box>
          </Box>
        </Grid>
        <Box sx={{margin:"auto"}}>
          <h1>
            <strong>Top Picks:</strong>
          </h1>
          <Grid item container>
            <Box className="rowStyle">
              {status === "resolved" ? carsCardArrayRender : <LinearProgress />}
            </Box>
          </Grid>

          <h1>
            <strong>Top Users:</strong>
          </h1>
          <Grid item container>
            <Box className="rowStyle">
              {status === "resolved" ? userCardArrayRender : <LinearProgress />}
            </Box>
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default Main;
