import { useState } from "react";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./general/mainpage.jsx";
import About from "./general/about.jsx";
import Login from "./general/login.jsx";
import SignUp from "./general/signup.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* General Routes */}
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/">
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
