import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import Cookie from 'universal-cookie';
import { connect } from 'react-redux'
import './App.css';
import { userKeepLogin,cookieChecker } from './redux/actions';

import Navbar from "./views/components/Navbar/Navbar";
import Home from "./views/screens/Home/Home";
import AuthLogin from "./views/screens/Auth/AuthLogin";
import AuthRegister from "./views/screens/Auth/AuthRegister";
import "bootstrap/dist/css/bootstrap.css";

const cookiesObject = new Cookie();

class App extends React.Component {
  componentDidMount() {
    let cookiesResult = cookiesObject.get("authData")
    console.log(cookiesResult)
    if (cookiesResult) {
      this.props.userKeepLogin(cookiesResult)
    } else {
    this.props.cookieChecker();
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/authlogin" component={AuthLogin} />
          <Route exact path="/authregister" component={AuthRegister} />

        </Switch>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  userKeepLogin,
  cookieChecker,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));