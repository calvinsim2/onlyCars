import React from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios"
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { LinearProgress, Typography } from "@mui/material";import ImageGallery from 'react-image-gallery';



const SpecificCar = () => {
  let carId = useParams()?.id;
  const URL = `/api/cars/${carId}`

  useEffect(() => {
    const fetchThisCarInfo = async () => {
      const data = await axios.get(URL)?.data;
      console.log(data);
    }

    fetchThisCarInfo();
  }, [])

  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
    },
  ];
  return (
    <>
      <h1>specificcar.jsx</h1>
      <NavLink to={"/cars"}>
        <p>Back to All Cars Page</p>
      </NavLink>
      <h1>{carId}</h1>
      <Box className="rowStyle">
        <Box width="50vw"  sx={{ml:"0.5em", mr:"0.5em"}}>
          <h1>testleft</h1>

          <ImageGallery items={images} />
        
          {/* //! LEFT PANEL */}
          {/* image gallery */}
          {/* user avatar */}
          {/* brand and model */}
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



      
    </>
  );
}

export default SpecificCar;