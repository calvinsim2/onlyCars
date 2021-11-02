import React from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import axios from "axios"
import { useEffect, useState, useRef } from "react";
import { Box } from "@mui/system";
import { Chip, LinearProgress } from "@mui/material";
import ImageGallery from 'react-image-gallery';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';



const SpecificCar = () => {
  const history = useHistory();
  
  let carId = useParams()?.id;
  const URL = `/api/cars/${carId}`;
  
  const [fetchState, setFetchState] = useState("pending");
  const [thisCar, setThisCar] = useState({})
  const isSubscribed = useRef(true);
  const [calDate, setCalDate] = useState(new Date());
  
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
  const carDescription = thisCar?.description;
  const range = thisCar?.estimated_range;
  const mileage = thisCar?.mileage;
  const horsepower = thisCar?.horsepower;
  const manual = thisCar?.manual ? "Manual" : "Auto";
  const fuelType = thisCar?.fuelType;
  const keyFeatures = thisCar?.key_features;
  const rentalRate = thisCar?.rental_rate;
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
              <h3 style={{display:"inline"}}>${rentalRate} per day</h3>
            </Box>
            {/* description about car | hosted by: user */}
            <h2>About {ownerName}'s Car:</h2>
            <p>{carDescription}</p>

            <Box>
              <Chip color="success" label={`Range: ${range}`} /> 
              <Chip color="success" label={`Horsepower: ${horsepower}`} /> 
              <Chip color="success" label={`Mileage: ${mileage}`} /> 
              <Chip color="success" label={`Drive: ${manual}`} /> 
              <Chip color="success" label={`Fuel: ${fuelType}`} />
            </Box>

            <h2>Key Features:</h2>
            <Box>
              {keyFeatures?.map((eachFeature) => {
                return (
                  <Chip key={`${thisCar._id}${eachFeature}`} color="success" label={eachFeature} />
                )
              })}
            </Box>

            <h2>Reviews:</h2>
          </Box>
          

          <Box width="30vw" sx={{ml:"0.5em", mr:"0.5em"}}>
            <h1>testright</h1>
            {/* //! RIGHT PANEL */}
            {/* BOOK BRAND AND MODEL */}
            <Calendar
            onChange={setCalDate}
            showWeekNumbers
            value={calDate}
          />
            
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