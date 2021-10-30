import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { LinearProgress, Typography } from "@mui/material";
import { CarCard } from "../globalComponents/CarCard";

function AllCars() {

  const [fetchState, setFetchState] = useState("loading");
  const [cars, setCars] = useState([]);
  
  useEffect(() => {
    const fetchAllCars = async () => {
      let isSubscribed = true;
      const URL = `/api/cars/`;
      try {
        setFetchState("loading");
        const data = await axios.get(URL);
        console.log("data", data.data);
        setFetchState("complete");
        isSubscribed ? setCars(data.data) : console.log("fetch cancelled because of component unmount");
      }
      catch (error) {
        setFetchState("error");
        console.log("error situation");
        history.replace("/");
      }
      return () => isSubscribed = false;
    }
    fetchAllCars();
  }, []);
  
  const carsCardArrayRender = cars?.map((eachCar) => {
    return (
      <CarCard carInfo={eachCar} key={`cardCard${eachCar._id}`}/>
    )
  })

  return (
    <>
      <Box sx={{width:"80%", margin:"auto"}}>
      <h1>Allcars.jsx (INDEX)</h1>
      <NavLink to={"/"}>
        <Typography variant="h5" >Back to Main Page</Typography>
      </NavLink>
        <h1>List of All Cars:</h1>
        <Box className="rowStyle">
          {fetchState === "complete" ? carsCardArrayRender : <LinearProgress /> }
          <h1>{JSON.stringify(cars)}</h1>
        </Box>

      
      </Box>
    </>
  );
}

export default AllCars;
