import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import './App.css';
import Navbar from "./views/components/Navbar/Navbar";
import Home from "./views/screens/Home/Home";
import "bootstrap/dist/css/bootstrap.css";

class App extends React.Component {

  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </>
    );
  }

}

export default App;
