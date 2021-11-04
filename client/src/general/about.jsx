import { NavLink } from "react-router-dom";
import { useContext } from "react";
import Typography from "@mui/material/Typography";
import { DataContext } from "../App";
import { Button } from "@mui/material";

function About() {
  const { user } = useContext(DataContext);

  // mui related.
  const wordStyle = {
    color: "primary.main",
  };

  return (
    <>
      <h1>这个是 About Page!</h1>
      <NavLink to={"/"}>
        <Button variant="contained" sx={{mb:"1em"}}>Back to Main Page</Button>
      </NavLink>
      <Typography variant="h5" sx={{ ...wordStyle }}>
        Hello {user?.username}!
      </Typography>
      <div className="about">
        <p>
          Welcome to onlyCars, ever thought of owning a car but COE in Singapore
          it's too god damn expensive? Well fret not, onlyCars can help you ease
          the pain (well... part of)
        </p>
        <p>
          In onlyCars, you can choose to rent a car to your liking, or if you
          have your own car you would like to rent out, onlyCars is the solution
          for you as well!
        </p>
      </div>
    </>
  );
}

export default About;
