import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Favorites from "./pages/Favorites";
import Tasks from "./pages/Tasks";
import Task from "./pages/Task";
import NewTask from "./pages/NewTask";
import Layout from "./pages/Layout";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Tasks}></IndexRoute>
      <Route path="task/:id" component={Task}></Route>
      <Route path="new" component={NewTask}></Route>
    </Route>
  </Router>,
app);
