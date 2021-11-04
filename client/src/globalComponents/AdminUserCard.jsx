import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

export const AdminUserCard = ({ userInfo, deleteUser }) => {
  return (
    <Card sx={{ width: "15em", m: "0.5em" }} key={`card-${userInfo?._id}`}>
      <CardMedia
        component="img"
        height="140px"
        image={userInfo?.display_picture}
        alt="Picture of the damn user"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {userInfo?.displayname}
        </Typography>
      </CardContent>
      <CardActions>
        <NavLink to={`/users/${userInfo?._id}`}>
          <Button size="small">Show Profile</Button>
        </NavLink>
        {/* Delete function at parent, admin.jsx */}
        <Button size="small" onClick={() => deleteUser(userInfo?._id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
