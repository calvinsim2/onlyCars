import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  CardActions,
} from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { DataContext } from "../App";
import { UserCarsForRentCard } from "../globalComponents/UserCarsForRentCard";

function UserActivity() {
  const { user } = useContext(DataContext);


  if (!(!!user._id)) {
    return <Redirect to="/login" />;
  }

  const params = useParams();

  const userURL = `/api/users/${params.id}`;
  const [fetchState, setFetchState] = useState("loading");
  const [thisUser, setThisUser] = useState([]);
  const [usersCars, setUsersCars] = useState([]);
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(userURL);
      console.log(res.data);
      setThisUser(res.data);
      setUsersCars(res.data.cars_for_rent);
      setFetchState("complete")
    };
    fetchUser();
  }, []);
  


  // console.log("thisUser ", thisUser);
  // let usersCars = thisUser.cars_for_rent;
  // console.log("userCars", usersCars)


  const handleDelete = async (id) => {
    const url = `/api/cars/${id}`;
    await axios.delete(url);
    setUsersCars(usersCars.filter((h) => h._id !== id));
    console.log("userCars", usersCars)
  };

  const renderCarsForRent = () => {
    if (usersCars !== undefined) {
      return usersCars.map((car, i) => (
       <UserCarsForRentCard i={i} car={car} usersCars={usersCars} handleDelete={handleDelete}/>
      ));
    }
  };

  return (
    <>
      <h1>这个是 UserActivity Page!</h1>
      <Grid container>
        <Grid item xs={12}>
          <Typography>{thisUser.username}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{thisUser.displayname}</Typography>
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
