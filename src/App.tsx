import React from "react";
import "./styles.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Error from "./components/Error";
import Game from "./components/Game";

export default (function App() {
  return (
    <Router>
      {/* <Route exact path="/" component={Error} /> */}
      <Switch>
        <Route exact path="/:columns/:rows/:bombs" component={Game} />
        <Route exact path="/:columns/:rows/:bombs/:debug" component={Game} />
        <Route path="/" component={Error} />
      </Switch>
    </Router>
  );
});
