import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import Cookie from 'universal-cookie';
import { connect } from 'react-redux'
import './App.css';
import { userKeepLogin,cookieChecker } from './redux/actions';

import Navbar from "./views/components/Navbar/Navbar";
import NavbarBot from "./views/components/Navbar/NavbarBot"
import Home from "./views/screens/Home/Home";
import AuthLogin from "./views/screens/Auth/AuthLogin";
import AuthRegister from "./views/screens/Auth/AuthRegister";
import ProductDetails from "./views/screens/ProductDetails/ProductDetails";
import UserProfile from './views/screens/User/UserProfile/UserProfile';
import UserReset from "./views/screens/User/UserReset/UserReset";
import UserResetPassword from "./views/screens/User/UserReset/UserResetPassword"
import UserCart from "./views/screens/User/UserCart/UserCart"
import UserHistory from "./views/screens/User/UserHistory/UserHistory"
import "bootstrap/dist/css/bootstrap.css";

import PageNotFound from "./views/screens/Pagenotfound/PageNotFound"
import AdminProducts from "./views/screens/Admin/AdminProducts/AdminProducts";
import AdminMembers from "./views/screens/Admin/AdminMembers/AdminMembers";
import AdminPayments from "./views/screens/Admin/AdminPayments/AdminPayments";
import AdminReports from "./views/screens/Admin/AdminReports/AdminReports";


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

  renderAdminRoutes = () => {
    if(this.props.user.role === 'admin'){
      return (
        <Switch>
        <Route exact path="/admin/products" component={AdminProducts} />
        <Route exact path="/admin/members" component={AdminMembers}/>
        <Route exact path="/admin/payments" component={AdminPayments}/>
        <Route exact path="/admin/reports" component={AdminReports}/>
        </Switch>
      )
    }else{
      return (
      <Switch>
      <Route exact path="/*" component={PageNotFound} />
      </Switch>
      )
    } 
  }

  render() {
    if (this.props.user.cookieChecked) {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/authlogin" component={AuthLogin} />
          <Route exact path="/authregister" component={AuthRegister} />
          <Route exact path="/user/profile" component={UserProfile} />
          <Route exact path="/products/:productId" component={ProductDetails} />
          <Route exact path="/resetPassword" component={UserReset} />
          <Route exact path="/resetPassword/:user_id/:userVerif" component={UserResetPassword}/>
          <Route exact path="/userCart" component={UserCart}/>
          <Route exact path="/userHistory" component={UserHistory}/>
          {this.renderAdminRoutes()}
        </Switch>
        <NavbarBot />
      </>
    );
    }else{
      return <div>Loading....</div>
    }
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