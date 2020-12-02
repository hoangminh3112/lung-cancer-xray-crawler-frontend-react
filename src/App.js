import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css'
import HomePage from "./Components/pages/HomePage";
import Error404Page from "./Components/pages/Error404Page";


const App = () => {


  return <BrowserRouter>
    <Switch>
      <Route exact path={"/"} render={(routeProps) => <HomePage{...routeProps}/>}/>
      <Route
          render={routeProps => <Error404Page {...routeProps}/>}
      />
    </Switch>
  </BrowserRouter>
}

export default App;
