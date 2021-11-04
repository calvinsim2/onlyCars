import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import { Box } from '@mui/system';
import {useContext} from "react";
import { DataContext } from "../App";
import axios from "axios"
import { Link } from 'react-router-dom';
import {parseISO} from "date-fns";
import format from "date-fns/format";


export const RentalCard = ({rentalEvent, rentalEvents, setRentalEvents}) => {
    
    const { user, setUser } = useContext(DataContext);
    const carInfo = rentalEvent.car_rented;
    const carOwner = rentalEvent?.original_owner?._id;
    const carOwnerAvatar = rentalEvent?.original_owner?.display_picture;
    const thisIsMyCar = carOwner === user._id;
    const confirmedRental = rentalEvent.owner_confirmation;

    const handleDeleteEvent = async () => {
        const URL = `/api/carRentalEvents/${rentalEvent._id}`;
        const res = await axios.delete(URL);
        const data = res.data;
        console.log(data);
        console.log(rentalEvents);
        const newRentalEvents = rentalEvents.filter(arrayStep => arrayStep._id !== rentalEvent._id);
        // console.log(newRentalEvents);
        setRentalEvents(newRentalEvents);
    }

    const handleConfirmEvent = async () => {
        const URL = `/api/carRentalEvents/${rentalEvent._id}`
        const res = await axios.put(URL, {...rentalEvent, owner_confirmation: true});
        const data = res.data;
        console.log("data", data);


        const foundIndex = rentalEvents.findIndex(arrayStep => arrayStep._id === rentalEvent._id);
        console.log(foundIndex);
        const dupeRentalEvents = [...rentalEvents];
        dupeRentalEvents[foundIndex].owner_confirmation = true;
        console.log(dupeRentalEvents);
        setRentalEvents(dupeRentalEvents);
    }

    const unconfirmedButtons = [
        <Box className="rowStyle" sx={{m:"1em"}}>
            { rentalEvent.user === user._id 
            ?
            <Button onClick={handleDeleteEvent} variant="contained">Cancel</Button> 
            : null}
            { thisIsMyCar 
            ?
            <>
            <Button onClick={handleConfirmEvent} variant="contained">Confirm</Button>
            <Button onClick={handleDeleteEvent} variant="contained" color="error">Reject</Button>
            </> 
            : null}

        </Box>
    ]


    const confirmedButtons = [
        <Box className="rowStyle" sx={{m:"1em"}}>
            { rentalEvent.user === user._id 
            ?
            null 
            : 
            null}

            { thisIsMyCar 
            ?
            <>
            <Button onClick={handleDeleteEvent} variant="contained" color="error">End Loan</Button>
            </> 
            : null}

        </Box>
    ]
    return (
        <Box className="colStyle" sx={thisIsMyCar ? {backgroundColor: "lightgreen", ml:"0.5em", mr:"0.5em"} : {ml:"0.5em", mr:"0.5em"}}>
        <Card sx={{ width: "20em", m:"0.5em"}} key={`card-${carInfo?._id}`}>
            <Box sx={{position: "relative"}}>
                <Link to={`/cars/${carInfo._id}`}>
                <CardMedia
                component="img"
                height="140px"
                image={carInfo?.images[0]}
                sx={{position: "relative"}}
                alt="Picture of the damn car"
                />
                </Link>
                <Link to={`/users/${carOwner}`}>
                 <img className="user_avatar_floating" src={`${carOwnerAvatar}`} />
                </Link>
            </Box>
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {carInfo?.brand} {carInfo?.model}
            </Typography>
            <Box className="colStyle">
                {/* <Button onClick={()=>console.log(rentalEvent)}>log</Button>
                <Button onClick={()=>console.log(rentalEvents)}>rentalEvents</Button> */}
            <Typography gutterBottom variant="h7">
                {confirmedRental ? "Loan Duration:" : "Proposed Rent Date:"}
            </Typography>
            <Typography gutterBottom variant="h7">
                Start: {format(parseISO(rentalEvent.start_date), "eee, dd/MM/yyyy, xxxxx O...OOO")}
            </Typography>
            <Typography gutterBottom variant="h7">
                End: {rentalEvent.end_date}
            </Typography>
            </Box>
            </CardContent>
            <CardActions>
                {confirmedRental ? confirmedButtons : unconfirmedButtons}
            </CardActions>
        </Card>
        </Box>
    )
}
