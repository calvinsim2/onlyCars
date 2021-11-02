import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Grid, LinearProgress } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import axios from 'axios';
import { Box } from '@mui/system';
import { CarCard } from '../globalComponents/CarCard';
import { UserCard } from '../globalComponents/UserCard';
import { NavLink } from 'react-router-dom';



function Main() {
  let make = ["Mazda", "Honda"]
  let model = ["Mx5", "Integra"]

  const carURL = "/api/cars/";
  const userURL = "/api/users";

  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const fetchCar = async () => {
      setStatus("loading");
      const res = await axios.get(carURL);
      console.log(res.data)
      setCars(res.data);
      setStatus("resolved");
    };
    const fetchUser = async () => {
      const res = await axios.get(userURL);
      console.log(res.data)
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
      )
    }
  })

  const userCardArrayRender = users?.map((eachUser, index) => {
    if (index < 3) {
      return (
        // <Grid item xs={4} key={`userCard${eachUser._id}`}>
        <UserCard userInfo={eachUser} key={`userCard${eachUser._id}`} />
        // </Grid>
      )
    }
  })

  return (
    <>
      <Grid container>
        <Grid item xs={12} sx={{align: "center"}}>
          <Typography>Welcome to onlyCars. Check out our top picks below or click "search cars" to refine your search!</Typography>
          <NavLink to="/cars/" style={{textDecoration: 'none'}}>
            <Button variant="contained">Search Cars</Button>
          </NavLink>
        </Grid>
        <Typography>
          <strong>Top Picks:</strong>
        </Typography>
        <Grid item container >
          <Box className="rowStyle">
            {status === "resolved" ? carsCardArrayRender : <LinearProgress />}
          </Box>
        </Grid>

        <Typography>
          <strong>Top Users:</strong>
        </Typography>
        <Grid item container >
          <Box className="rowStyle">
            {status === "resolved" ? userCardArrayRender : <LinearProgress />}
          </Box>
        </Grid>
      </Grid>
    </>
  );


}

export default Main;
