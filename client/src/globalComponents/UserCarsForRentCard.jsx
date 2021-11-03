import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Typography, Grid } from "@mui/material";
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';

export const UserCarsForRentCard = ({car,i,usersCars,handleDelete}) => {
    console.log(car)
    return (
        <Grid item xs={3} key={i}>
        <Card>
          <CardMedia
            component="img"
            height="140px"
            image={car.images[0]}
            alt="Picture of the damn car"
          />
          <CardContent>
            {car.brand} {car.model}
          </CardContent>
          <CardActions>
            <NavLink to={`/cars/${car?._id}/edit`}>
              <Button>Edit</Button>
            </NavLink>
            <Button onClick={() => handleDelete(usersCars[i]?._id)}>
              Delete
            </Button>

          </CardActions>
        </Card>
      </Grid>
    )
}
