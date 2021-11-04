import React from "react";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Box } from "@mui/system";
import { Button, LinearProgress, Typography } from "@mui/material";
import { CarCard } from "../globalComponents/CarCard";

function AllCars() {

  const [fetchState, setFetchState] = useState("loading");
  const [cars, setCars] = useState([]);
  const history = useHistory();
  const isSubscribed = useRef(true);
  
  useEffect(() => {
    const fetchAllCars = async () => {
      const URL = `/api/cars/`;
      try {
        setFetchState("loading");
        const data = await axios.get(URL);
        console.log("data", data.data);
        if (!isSubscribed) {
          console.log("subscription cancelled because of component unmount");
          return null;
        }
        setCars(data.data);
        setFetchState("complete");
      }
      catch (error) {
        setFetchState("error");
        console.log("error situation", error);
        history.replace("/");
      }
    }
    fetchAllCars();
    return () => {
      isSubscribed.current = false;
    }
  }, []);
  
  const carsCardArrayRender = cars?.map((eachCar) => {
    return (
      <CarCard carInfo={eachCar} key={`cardCard${eachCar._id}`}/>
    )
  })

  return (
    <>
      
      {/* <h1>Allcars.jsx (INDEX)</h1> */}

      <div style={{marginTop:"2em"}}></div>
      <NavLink to={"/"}>
      <Button variant="contained">Back to Main Page</Button>
      </NavLink>
        <h1>List of All Cars:</h1>
        <Box className="rowStyle">
          {fetchState === "complete" ? carsCardArrayRender : <LinearProgress /> }
        </Box>

      
    </>
  );
}

export default AllCars;
