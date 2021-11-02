import React from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import axios from "axios"
import { useEffect, useState, useRef } from "react";
import { Box } from "@mui/system";
import { Button, Chip, Divider, LinearProgress, Typography } from "@mui/material";
import ImageGallery from 'react-image-gallery';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { utils } from 'react-modern-calendar-datepicker';
import { seedTime } from "../seeds/seedTime";



const SpecificCar = () => {
  const history = useHistory();
  
  let carId = useParams()?.id;
  const URL = `/api/cars/${carId}`;
  
  const [fetchState, setFetchState] = useState("pending");
  const [thisCar, setThisCar] = useState({})
  const isSubscribed = useRef(true);
  const [selectedDay, setSelectedDay] = useState(
    {
      from: null,
      to: null,
    });
  const [selectedTime, setSelectedTime] = useState("09:30"); 
  
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
  
  const selectChange = (event) => {
    console.log("changed");
    const time = event.target.value;
    setSelectedTime(time);
  }

  const handleBook = () => {
    if (!(!!selectedDay.from)) alert("Please Select a date.");
    const fromDate = `${selectedDay.from?.month} ${selectedDay.from?.day} ${selectedDay.from?.year}`;
    const toDate = `${selectedDay.to?.month} ${selectedDay.to?.day} ${selectedDay.to?.year}`;
    const dateFrom = new Date(`${fromDate} ${selectedTime}`);
    // console.log (dateFrom);
    const dateTo = new Date(`${toDate} ${selectedTime}`);
    // console.log(dateTo);

  }
  return (
    <>
      <h1>specificcar.jsx</h1>
      <NavLink to={"/cars"}>
        <Button variant="contained">Back to All Cars Page</Button>
      </NavLink>
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
            <h1>Rent this Car:</h1>
            {/* <button onClick={()=>console.log(selectedDay)}>log day</button> */}
            <Box className="colStyle" sx={{margin:"2em", alignItems:"center"}}>
              <h5>On these dates: </h5>
                <DatePicker value={selectedDay} onChange={setSelectedDay} inputPlaceholder="Select a date" shouldHighlightWeekends minimumDate={utils().getToday() } renderFooter={() => (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 2rem' }}>
                  <button type="button" onClick={() => {
                      setSelectedDay({
                        from: null,
                        to: null,
                      })
                    }} style={{
                      border: '#0fbcf9',
                      color: 'white',
                      backgroundColor: "black",
                      borderRadius: '0.5rem',
                      padding: '1rem 2rem',
                    }}
                  >Reset</button>
                </div>
              )}/>
              <Typography variant="caption" display="block">You can select a range of dates.</Typography>
              <h5>Starting at: </h5>
              <select className="DatePicker__input" value={selectedTime} onChange={selectChange}>
                {seedTime.map((timeString) => {
                  return (
                    <option key={`seedTime${timeString}`} value={timeString}>{timeString}</option>
                  )
                })}
              </select>
              <Button onClick={handleBook} sx={{mt:"1em"}} variant="contained">Book Now!</Button>
            </Box>
          </Box>
        </Box>
      : <LinearProgress/>
      }


      
    </>
  );
}

export default SpecificCar;