import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import axios from 'axios';


function Main({ addCharfn }) {
  let make = ["Mazda", "Honda"]
  let model = ["Mx5", "Integra"]

  const URL = "/api/cars/";

  const [cars, setCars] = useState([]);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      const res = await axios.get(URL);
      console.log(res.data)
      setCars(res.data);
      setStatus("resolved");
    };
    fetchData();
  }, []);

  return (
    <>
      <Typography>Find Cars:</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={make}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Make" />}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={model}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Model" />}
          />
        </Grid>
      </Grid>
      <Typography>
        Top Picks:
      </Typography>
      <Grid container>
        {/* can run a loop or a map or whatever later on */}
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://images.unsplash.com/photo-1561043855-7bfc2149641a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2940&q=80"
              alt="Picture of the damn car"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Mazda Mx5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Some info about the damn car
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Show More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://images.unsplash.com/photo-1561043855-7bfc2149641a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2940&q=80"
              alt="Picture of the damn car"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Mazda Mx5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Some info about the damn car
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Show More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://images.unsplash.com/photo-1561043855-7bfc2149641a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2940&q=80"
              alt="Picture of the damn car"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Mazda Mx5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Some info about the damn car
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Show More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Typography>
        Top Users:
      </Typography>
      <Grid container>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2940&q=80"
              alt="Picture of the damn car"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Mazda Mx5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Some info about the damn car
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">See Profile</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2940&q=80"
              alt="Picture of the damn car"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Mazda Mx5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Some info about the damn car
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">See Profile</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2940&q=80"
              alt="Picture of the damn car"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Mazda Mx5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Some info about the damn car
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">See Profile</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );


}

export default Main;