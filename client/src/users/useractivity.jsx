import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardMedia, CardContent, Grid, Typography, CardActions } from '@mui/material';
import { Button } from "@mui/material";
import axios from "axios";

function UserActivity() {

  const params = useParams()

  const userURL = `/api/users/${params.id}`;
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(userURL);
      console.log(res.data)
      setUser(res.data);
    };
    fetchUser();
  }, []);

  console.log(user)

  const renderCarsForRent = () => {
    if (user.cars_for_rent !== undefined) {
      return (
        user.cars_for_rent.map((car, i) => (
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
            </CardActions>
          </Card>
          </Grid >
        )
        )
      )
}
  }


return (
  <>
    <h1>这个是 UserActivity Page!</h1>
    <Grid container>
      <Grid item xs={12}>
        <Typography>
          {user.username}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          {user.displayname}
        </Typography>
      </Grid>
      <h2>Cars For Rent:</h2>
      <Grid item container xs={12} spacing={3}>
        {renderCarsForRent()}
      </Grid>
    </Grid>
    <NavLink to={"/cars/new"}>
      <p>Want to list a new car?</p>
    </NavLink>
    <div className="useractivity"></div>
  </>
);
}

export default UserActivity;
