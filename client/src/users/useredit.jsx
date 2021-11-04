import { React, useContext, useState, useEffect } from "react";
import { NavLink, useParams, Redirect, useHistory } from "react-router-dom";
import { Grid, Typography, Button, TextField } from "@mui/material";

import { useFormik } from "formik";
import * as yup from "yup";
import { DataContext } from "../App";
import axios from "axios";

function UserEdit() {
  const { user } = useContext(DataContext);
  const history = useHistory();
  const params = useParams();
  const URL = `/api/users/${params.id}`;

  // initialize state
  const [currentUser, setCurrentUser] = useState({
    username: "",
    displayname: "",
    password: "",
    display_picture: "",
    cars_for_rent: "",
    rented_cars: "",
    is_admin: false,
    location: "",
    reviews: ["n/a"],
  });
  //==================== FETCH AND SEND DATA PORTION ===================
  // axios request to get CURRENT USER DATA
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await axios.get(URL);
      setCurrentUser(res.data);
    };
    fetchCurrentUser();
  }, []);
  // console.log("Working on this currentUser ", currentUser);

  // axios request to UPDATE the current USER DATA
  const updatecurrentUser = async (info) => {
    console.log("Change to this!:", info);
    const res = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    const data = await res.json();
    // console.log("WHAT WE GET AFTER UPDATE", data);
  };

  //==================== FORMIK RELATED ======================
  const validationSchema = yup.object({
    displayname: yup.string("Enter your Name").required("Name is required"),
    display_picture: yup
      .string("Enter display picture")
      .required("Display picture is required"),
    password: yup
      .string("Enter Password")
      .required(
        "Enter your new password (reenter if you don't want to change.)"
      ),
  });

  const formik = useFormik({
    // this enables the initialvalues to be loaded with pre-defined values
    enableReinitialize: true,
    initialValues: {
      username: currentUser?.username,
      displayname: currentUser?.displayname,
      password: currentUser?.password,
      display_picture: currentUser?.display_picture,
      cars_for_rent: currentUser?.cars_for_rent,
      rented_cars: currentUser?.rented_cars,
      is_admin: currentUser?.is_admin,
      location: {
        street: currentUser?.location.street,
        postal: currentUser?.location.postal,
      },
      reviews: currentUser?.reviews,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updatecurrentUser(values);
      history.push(`/users/${user?._id}`);
    },
  });

  // RENDER PAGE ===============================

  if (!!user?._id === false) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <h1>这个是 UserEdit Page!</h1>
      <NavLink to={`/users/${user?._id}`}>
        <Button>Cancel changes</Button>
      </NavLink>

      <Grid container>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="displayname"
            name="displayname"
            label="displayname"
            type="string"
            value={formik.values.displayname}
            onChange={formik.handleChange}
            error={
              formik.touched.displayname && Boolean(formik.errors.displayname)
            }
            helperText={formik.touched.displayname && formik.errors.displayname}
          />
          <TextField
            fullWidth
            id="display_picture"
            name="display_picture"
            label="display_picture"
            type="string"
            value={formik.values.display_picture}
            onChange={formik.handleChange}
            error={
              formik.touched.display_picture &&
              Boolean(formik.errors.display_picture)
            }
            helperText={
              formik.touched.display_picture && formik.errors.display_picture
            }
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="password"
            type="string"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            id="location.street"
            name="location.street"
            label="street"
            type="string"
            value={formik.values.location.street}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            id="location.postal"
            name="location.postal"
            label="postal"
            type="string"
            value={formik.values.location.postal}
            onChange={formik.handleChange}
          />

          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </Grid>
    </>
  );
}

export default UserEdit;
