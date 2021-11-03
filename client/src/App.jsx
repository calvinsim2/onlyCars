import { useState } from "react";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createContext } from "react";

// Import general routes
import Main from "./general/mainpage.jsx";
import About from "./general/about.jsx";
import Login from "./general/login.jsx";
import SignUp from "./general/signup.jsx";
import Payment from "./general/payment.jsx";
// Import car routes
import AllCars from "./cars/allcars.jsx";
import SpecificCar from "./cars/specificcar.jsx";
import ListCars from "./cars/listcars.jsx";
import EditCar from "./cars/editcar.jsx";
import NewCar from "./cars/newcar.jsx";
import NavigationBar from "./general/appbar.jsx";

// Import user routes
import UserActivity from "./users/useractivity.jsx";
import UserEdit from "./users/useredit.jsx";
import "./App.css";
import { Box } from "@mui/system";
import { Notifications } from "./users/Notifications.jsx";

// Context
export const DataContext = createContext();

function App() {
  // stores current logged in User!
  const [user, setUser] = useState({});
  console.log("PAGE RELOADED!");
  //

  return (
    <>
      <DataContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <NavigationBar />
          <Box sx={{width:"90vw", margin:"auto"}}>

            <Switch>
              {/* Car Related Routes */}
              <Route exact path="/cars">
                <AllCars />
              </Route>
              <Route path="/cars/new">
                <NewCar />
              </Route>
              <Route path="/cars/:id/edit">
                <EditCar />
              </Route>
              <Route path="/cars/:id">
                <SpecificCar />
              </Route>
              {/* User Related Routes */}
              <Route path="/users/edit/:id">
                <UserEdit />
              </Route>
              <Route path="/users/:id">
                <UserActivity />
              </Route>

              {/* General Routes */}

              <Route path="/about">
                <About />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/payment">
                <Payment />
              </Route>
              <Route path="/notifications">
                <Notifications />
              </Route>
              <Route exact path="/">
                <Main />
              </Route>
            </Switch>
          </Box>
        </BrowserRouter>
      </DataContext.Provider>
    </>
  );
}

export default App;
