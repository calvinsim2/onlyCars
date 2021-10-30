import { useState } from "react";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import NavigationBar from "./general/appbar.jsx";
// Import user routes
import UserActivity from "./users/useractivity.jsx";
import UserEdit from "./users/useredit.jsx";
import "./App.css";

function App() {
  return (
    <>
    <NavigationBar/>
      <BrowserRouter>
        <Switch>
          {/* Car Related Routes */}
          <Route path="/cars">
            <AllCars />
          </Route>
          <Route path="/cars/new">
            <ListCars />
          </Route>
          <Route path="/cars/:id/edit">
            <EditCar />
          </Route>
          <Route path="/cars/:id">
            <SpecificCar />
          </Route>
          {/* User Related Routes */}
          <Route path="/users">
            <UserActivity />
          </Route>
          <Route path="/users/:id/edit">
            <UserEdit />
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
          <Route exact path="/">
            <Main />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
