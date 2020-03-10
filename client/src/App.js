import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import UserProvider from "./contexts/UserProvider";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MenuBar from "./components/menus/MenuBar";

const App = () => {
  return (
    <Router history={history}>
      <UserProvider>
        <MenuBar />
        <Route path="/profile" component={Profile} />
      </UserProvider>
      <Route path="/" exact component={Home} />
    </Router>
  );
};

export default App;