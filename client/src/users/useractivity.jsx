import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { DataContext } from "../App";
import { UserCarsForRentCard } from "../globalComponents/UserCarsForRentCard";
import NewCar from "../cars/newcar";
import { Box } from "@mui/system";

function UserActivity() {
  const { user } = useContext(DataContext);

  const params = useParams();

  const userURL = `/api/users/${params.id}`;
  const [fetchState, setFetchState] = useState("loading");
  const [thisUser, setThisUser] = useState([]);
  const [usersCars, setUsersCars] = useState([]);
  const [showState, setShowState] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(userURL);
      // console.log(res.data);
      setThisUser(res.data);
      setUsersCars(res.data.cars_for_rent);
      setFetchState("complete");
    };
    fetchUser();
  }, []);

  const addCar = (newCar) => {
    setUsersCars([...usersCars, newCar]);
  };

  const handleDelete = async (id) => {
    const url = `/api/cars/${id}`;
    const res = await axios.delete(url);
    console.log("delete route return", res);
    if (res.data === "Please close all existing loans before removing your Car from the website.") {
      alert("Please close all existing loans before removing your Car from the website.")
    } else {
      setUsersCars(usersCars.filter((h) => h._id !== id));
      console.log("userCars", usersCars);
    }
  };

  const renderNewCarPage = () => {
    if (showState !== false) {
      return (
        <Grid container>
          <Grid item>
            <Button variant="outlined" onClick={handleAddNewCarClick}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12}>
            <NewCar addCarNow={addCar} setShowState={setShowState} />
          </Grid>
        </Grid>
      );
    }
  };

  const handleAddNewCarClick = () => {
    setShowState(!showState);
  };

  const renderCarsForRent = () => {
    if (usersCars !== undefined) {
      return usersCars.map((car, i) => (
        <UserCarsForRentCard
          key={i}
          i={i}
          car={car}
          usersCars={usersCars}
          handleDelete={handleDelete}
        />
      ));
    }
  };

  const allowUserEdit = [
    <NavLink to={`/users/edit/${user?._id}`}>
      <Button>Edit Account Details</Button>
    </NavLink>,
  ];

  const allowCarAddition = [
    <Button
      sx={{ m: 2 }}
      variant="outlined"
      color="primary"
      onClick={handleAddNewCarClick}
    >
      Add a car
    </Button>,
  ];

  if (!!user?._id === false) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <h1>这个是 UserActivity Page!</h1>
      <Grid container>
        <Grid item xs={12}>
          {user?._id === thisUser?._id ? allowUserEdit : null}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h1">{thisUser.username}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">{thisUser.displayname}</Typography>
        </Grid>
        <Grid item container>
          <Grid item>{renderNewCarPage()}</Grid>
          <Grid item xs={12}>
            <h2>Cars For Rent:</h2>
          </Grid>
          <Grid item xs={4}>
            {user?._id === thisUser?._id ? allowCarAddition : null}
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={3}>
          {renderCarsForRent()}
        </Grid>
      </Grid>
    </>
  );
}

export default UserActivity;
