import React from 'react';
import axios from "axios";
import { useEffect, useState, useContext, useRef } from 'react';
import { Redirect, useHistory } from 'react-router';
import { DataContext } from "../App";
import { CarCard } from '../globalComponents/CarCard';
import { Box } from '@mui/system';
import { Button, LinearProgress, Typography } from '@mui/material';
import { RentalCard } from '../globalComponents/RentalCard';

export const Notifications = () => {
    
    const history = useHistory();
    const { user, setUser } = useContext(DataContext);
    if (!!user?._id === false) {
        return <Redirect to="/login" />;
    }
    
    const [rentalEvents, setRentalEvents] = useState([]);
    const [fetchState, setFetchState] = useState("pending"); 
    const isSubscribed = useRef(true);

    useEffect(() => {
        const fetchRentalEvents = async () => {
            try {
                setFetchState("loading");
                const URL = `/api/carRentalEvents/find/${user._id}`;
                const res = await axios.get(URL);
                const data = res.data;
                console.log("fetched data", data);
                if (!isSubscribed) {
                    console.log("subscription cancelled because of component unmount");
                    return null;
                }
                setRentalEvents(data);
                setFetchState("complete");
            }
            catch (error) {
                setFetchState("error");
                console.log("error situation", error);
                history.replace("/");
            }
        }
        fetchRentalEvents();
        return () => {
          isSubscribed.current = false;
        }
    }, [])

    
    return (
        <>
        <h1>Notifications.jsx</h1>
        <button onClick={() => console.log(rentalEvents)}>rentalEvents</button>
        <h2>Loans Awaiting Confirmation:</h2>
        {fetchState === "complete" ? 
        <>
        <Box className="rowStyle">
            {rentalEvents?.map((thisREvent) => {
                // console.log("REvent", thisREvent);
                const carOwner = thisREvent?.original_owner?._id;
                const thisIsMyCar = carOwner === user._id;
                if (thisREvent.owner_confirmation === false) return (
                    <RentalCard key={`${user._id}keyloan${thisREvent._id}`} rentalEvent={thisREvent} setRentalEvents={setRentalEvents} rentalEvents={rentalEvents}/>

                )
            })}
        </Box>
        <h2>Current Loans:</h2>  
        <Box className="rowStyle">
            {rentalEvents?.map((thisREvent) => {
                const carOwner = thisREvent?.original_owner?._id;
                const thisIsMyCar = carOwner === user._id;
                if (thisREvent.owner_confirmation === true) return (
                    <RentalCard key={`${user._id}keyloan${thisREvent._id}`} rentalEvent={thisREvent} setRentalEvents={setRentalEvents} rentalEvents={rentalEvents}/>
                )
            })}
        </Box>
        </>
        : <LinearProgress />
        }          
        </>
    )
}
