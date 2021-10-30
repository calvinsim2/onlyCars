import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import { Box } from '@mui/system';

export const CarCard = ({carInfo}) => {
    return (
        <Card sx={{ width: "15em", m:"0.5em"}} key={`card-${carInfo?._id}`}>
            <CardMedia
            component="img"
            height="140px"
            image={carInfo?.images[0]}
            alt="Picture of the damn car"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {carInfo?.brand} {carInfo?.model}
            </Typography>
            <Box>
                {carInfo?.key_features?.map((eachFeature) => {
                return (
                    <Chip label={eachFeature} key={`${eachFeature}${carInfo?._id}`}/>
                )
                })}
            </Box>
            </CardContent>
            <CardActions>
            <Button size="small">Show More</Button>
            </CardActions>
        </Card>
    )
}
