import { Typography } from "@mui/material";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";

function Main({ addCharfn }) {
  return (
    <>
      <h1>这个是 Main Page!</h1>
      <AppBar>
        <Toolbar>
          <Typography>
          <strong>onlyCars</strong>
          </Typography>
          
          <Typography>Hello</Typography>
        </Toolbar>
      </AppBar>
      <Typography>
          First typo
      </Typography>

    </>
  );
}

export default Main;