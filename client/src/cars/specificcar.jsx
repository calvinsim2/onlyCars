import React from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import axios from "axios"
import { useEffect, useState, useRef } from "react";
import { Box } from "@mui/system";
import { Divider, LinearProgress, Typography } from "@mui/material";import ImageGallery from 'react-image-gallery';


const SpecificCar = () => {
  const history = useHistory();
  
  let carId = useParams()?.id;
  const URL = `/api/cars/${carId}`;
  
  const [fetchState, setFetchState] = useState("pending");
  const [thisCar, setThisCar] = useState({})
  const isSubscribed = useRef(true);
  
  useEffect(() => {
    const fetchThisCarInfo = async () => {
      try {
        setFetchState("loading");
        const res = await axios.get(URL);
        const data = res.data;
        console.log(data);
        if (!isSubscribed) {
          console.log("subscription cancelled because of component unmount");
          return null;
        }
        setThisCar(data); 
        setFetchState("complete");
      } 
      catch (error) {
        setFetchState("error");
        console.log("error situation", error);
        history.replace("/");
      }
    }
    fetchThisCarInfo();
    return () => {
      isSubscribed.current = false;
    }
  }, [])

  const carImages = [];
  thisCar?.images?.forEach((image) => {carImages.push({original: image})});
  const brand = thisCar?.brand;
  const model = thisCar?.model;
  const owner = thisCar?.original_owner;
  const ownerAvatar = owner?.display_picture;
  const ownerName = owner?.displayname;
  
  
  return (
    <>
      <h1>specificcar.jsx</h1>
      <NavLink to={"/cars"}>
        <p>Back to All Cars Page</p>
      </NavLink>
      <h1>{carId}</h1>
      { fetchState === "complete" ?
        <Box className="rowStyle">
            {/* //! LEFT PANEL */}
          <Box width="50vw"  sx={{ml:"0.5em", mr:"0.5em"}}>
            <h1>testleft</h1>
            <h1>{brand} {model}</h1>
            {!!thisCar?.images?.length ? <ImageGallery items={carImages} /> : Null }
            
            <Box>
              <img className="user_avatar" src={ownerAvatar} alt="user_avatar" />
              <h3 style={{display:"inline"}}>{ownerName}</h3>
            </Box>
            {/* description about car | hosted by: user */}

            {/* about car */}

            {/* little tags with car info? */}

            {/* key features of car */}

            {/* Rules? */}

            {/* Mileage */}
          </Box>
          

          <Box width="30vw" sx={{ml:"0.5em", mr:"0.5em"}}>
            <h1>testright</h1>
            {/* //! RIGHT PANEL */}
            {/* BOOK BRAND AND MODEL */}
            
            {/* pickup date & time */}
            {/* dropoff date & time */}

            {/* BOOK NOW BUTTON */}
          </Box>
        </Box>
      : <LinearProgress/>
      }


      
    </>
  );
}

export default SpecificCar;