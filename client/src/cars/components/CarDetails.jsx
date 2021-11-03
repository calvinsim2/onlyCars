import React from 'react'
import { Box } from '@mui/system'
import { Button, Chip, Divider, LinearProgress, Typography } from "@mui/material";
import ImageGallery from 'react-image-gallery';

export const CarDetails = ({thisCar}) => {

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
        <Box width="50vw"  sx={{ml:"0.5em", mr:"0.5em"}}>
            
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
    )
}
