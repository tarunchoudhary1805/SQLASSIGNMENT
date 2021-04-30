import React from "react";
import { Route, Switch } from "react-router-dom";
import Questions from "./Questions";
import Upload from "./Upload";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Questions} />
      <Route exact  path="/upload" component={Upload} />
    </Switch>
  );
};

export default Routes;
