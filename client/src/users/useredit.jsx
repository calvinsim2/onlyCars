import { React, useContext } from "react";
import { NavLink, useParams, Redirect, useHistory } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  CardActions,
} from "@mui/material";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { DataContext } from "../App";
import axios from "axios";

function UserEdit() {
  const { user } = useContext(DataContext);
  const history = useHistory();
  const params = useParams();
  const URL = `/api/users/${params.id}/edit`;

  if (!!!user._id) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <h1>这个是 UserEdit Page!</h1>
      <NavLink to={"/users"}>
        <p>Back to profile</p>
      </NavLink>

      <div className="useredit"></div>
    </>
  );
}

export default UserEdit;
