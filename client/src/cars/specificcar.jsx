import React from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import axios from "axios"
import { useEffect, useState, useRef, useContext } from "react";
import { Box } from "@mui/system";
import { Button,LinearProgress, Typography } from "@mui/material";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { utils } from 'react-modern-calendar-datepicker';
import { seedTime } from "../seeds/seedTime";
import { DataContext } from "../App";
import { CarDetails } from "./components/CarDetails";



const SpecificCar = () => {
  const history = useHistory();

  const { user, setUser } = useContext(DataContext);
  // console.log("user", user);
  
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

  
  const selectChange = (event) => {
    console.log("changed");
    const time = event.target.value;
    setSelectedTime(time);
  }

  const handleBook = async () => {
    if (!(!!user._id)) alert("Please log in first to be able to book cars!");
    if (!(!!selectedDay.from)) alert("Please Select a date.");
    const fromDate = `${selectedDay.from?.month} ${selectedDay.from?.day} ${selectedDay.from?.year}`;
    const toDate = `${selectedDay.to?.month} ${selectedDay.to?.day} ${selectedDay.to?.year}`;
    const dateFrom = new Date(`${fromDate} ${selectedTime}`);
    // console.log (dateFrom);
    const dateTo = new Date(`${toDate} ${selectedTime}`);
    // console.log(dateTo);

    const newRentalEvent = {
      start_date: dateFrom,
      end_date: dateTo,
      user: user?._id,
      car_rented: thisCar?._id,
      original_owner: thisCar?.original_owner?._id,
    }
    // console.log(newRentalEvent);
    const URL = "/api/carRentalEvents/new"
    const res = await axios.post(URL, newRentalEvent);
    console.log(res.data);
    history.push(`/users/${user._id}`);

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
          <CarDetails thisCar={thisCar} />
          

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