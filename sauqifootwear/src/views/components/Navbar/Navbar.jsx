import React from "react";
import Axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons/";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import { Link } from "react-router-dom";
import ButtonUI from "../Button/Button.tsx";
import "./Navbar.css";
import logoJapan from "../../../assets/images/Showcase/LogoJapanFair.jpeg"
import { logoutHandler, SearchAndFilterHandler, qtyCartHandler } from "../../../redux/actions";
import { connect } from "react-redux";

const API_URL = `http://localhost:8080`;


const CircleBg = ({ children }) => {
  return <div className="circle-bg">{children}</div>;
};

class Navbar extends React.Component {
  state = {
    searchBarIsFocused: false,
    searchBarInput: "",
    dropdownOpen: false,
    cartData: [],
  };



  onFocus = () => {
    this.setState({ searchBarIsFocused: true });
  };

  onBlur = () => {
    this.setState({ searchBarIsFocused: false });
  };

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  logoutBtnHandler = () => {
    this.props.onLogout();
  };

  render() {
    return (
      <>
        <div className="navbar navbar-expand-md navbar-light bg-light pt-0" >
          <div className="col-2 logo-text" style={{ "text-align": "center" }}>
            <Link style={{ textDecoration: "none", color: "inherit", color: "black" }} to=""> <img style={{ "border": "1px solid silver ", "border-radius": "50%" }} src={logoJapan} height="50px" /> JETRO.ID </Link>
          </div>

          <div className="collapse navbar-collapse w-100 " id="navbarCollapse" >

            <form className="form-inline ml-auto">
              <div className="input-group">
                {/* <input
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  className={`search-bar ${this.state.searchBarIsFocused ? "active" : null}`}
                  type="text"
                  placeholder="Search ..."
                /> */}
              </div>
            </form>

            <ul className="navbar-nav ml-auto medium mb-2 mb-md-0" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>


              {this.props.user.id ? (
                <>
                {this.props.user.role === 'user' ? (
                  <Link
                    className="d-flex flex-row pt-2"
                    to="/userCart"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faShoppingCart}
                      style={{ fontSize: 24 }}
                    />
                    <CircleBg>
                      <small style={{ color: "#3C64B1", fontWeight: "bold" }}>
                      {this.props.user.cartItemsCount}
                      </small>
                    </CircleBg>
                  </Link>
                ) : null }


                  <Dropdown toggle={this.toggleDropdown} isOpen={this.state.dropdownOpen}>
                    <DropdownToggle tag="div" className="pl-3 d-flex pt-1">
                      <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} className="pt-2" />
                      <p className="small ml-3 mr-4 mt-2">{this.props.user.username}</p>
                    </DropdownToggle>


                    <DropdownMenu className="mt-2" style={{ border: "1px solid silver" }}>
                      {this.props.user.role === 'admin' ? (
                        <>
                          <DropdownItem>
                            <Link
                              style={{ color: "inherit", textDecoration: "none" }}
                              to="/admin/products"
                            >
                              Products
                            </Link>
                          </DropdownItem>

                          <DropdownItem>
                            <Link
                              style={{ color: "inherit", textDecoration: "none" }}
                              to="/admin/members"
                            >
                              Members
                            </Link>
                          </DropdownItem>
                          <DropdownItem>
                            <Link
                              style={{ color: "inherit", textDecoration: "none" }}
                              to="/admin/payments"
                            >
                              Payments
                            </Link>
                          </DropdownItem>
                          <DropdownItem>
                            <Link
                              style={{ color: "inherit", textDecoration: "none" }}
                              to="/admin/reports"
                            >
                              Reports
                            </Link>
                          </DropdownItem>
                        </>
                      ) : (
                          <>
                            <DropdownItem>
                              <Link
                                style={{ color: "inherit", textDecoration: "none" }}
                                to="/user/profile"
                              >
                                Profile
                                 </Link>
                            </DropdownItem>
                            <DropdownItem>
                              <Link
                                style={{ color: "inherit", textDecoration: "none" }}
                                to="/UserHistory"
                              >
                                History
                               </Link>
                            </DropdownItem>
                            <DropdownItem>
                              <Link
                                style={{ color: "inherit", textDecoration: "none" }}
                                to="/wishlist"
                              >
                                Wishlist
                              </Link>
                            </DropdownItem>
                          </>
                        )}
                    </DropdownMenu>
                  </Dropdown>
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to="/"
                  >
                    <li className="nav-item active" className="mt-2 ml-2 mr-2 pb-2" onClick={this.logoutBtnHandler} >
                      <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: 15 }} /><a>Logout</a>
                    </li>
                  </Link>
                </>
              ) : (
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to="/authlogin"
                  >
                    <li className="nav-item active" className="mt-2 ml-2 mr-2 mb-3">
                      <FontAwesomeIcon icon={faSignInAlt} style={{ fontSize: 15 }} /> Sign in
                    </li>
                  </Link>
                )}

            </ul>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = {
  onLogout: logoutHandler,
  onQtyCartHandler: qtyCartHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);