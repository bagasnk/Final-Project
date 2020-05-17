import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import { Link } from "react-router-dom";
import ButtonUI from "../Button/Button.tsx";
import "./Navbar.css";
import Logo from "../../../assets/images/Showcase/LOGO.png"

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


    render() {
        return (
            <>
                <div className="navbar navbar-expand-md navbar-light bg-light" >
                    <div className="col-5 logo-text" style={{"text-align":"center"}}>
                        <Link style={{ textDecoration: "none", color: "inherit" }} to=""> <img src={Logo} height="100px" alt="Logo" /> Sauqi Footwear </Link>
                    </div>

                    <div className="collapse navbar-collapse w-100 flex-md-column mr-5" id="navbarCollapse" >
                        <ul className="navbar-nav ml-auto medium mb-2 mb-md-0 ">
                            <li className="nav-item active">
                                <Link style={{ textDecoration: "none", color: "inherit" }}>
                                    <a className="nav-link pr-4" >HOW TO ORDER</a>
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <ButtonUI className="mr-3" type="contained" style={{ "border":"1px solid", "border-radius": "25px"}}>
                                    <Link
                                        style={{ textDecoration: "none", color: "inherit" }}
                                        to="/"
                                    >
                                        Sign in / Sign Up
                                    </Link>
                                </ButtonUI>
                            </li>
                        </ul>
                    
                        <form className="form-inline ml-auto pt-3">
                            <div className="input-group pr-4">
                                <input
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                    className={`search-bar ${this.state.searchBarIsFocused ? "active" : null}`} 
                                    type="text"
                                    placeholder="Search ..."
                                />
                            </div>
                            
                            <Link
                                className="d-flex flex-row"
                                to="/"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faShoppingCart}
                                    style={{ fontSize: 24 }}
                                />
                                <CircleBg>
                                    <small style={{ color: "#3C64B1", fontWeight: "bold" }}>
                                        0
                                    </small>
                                </CircleBg>
                            </Link>

                            <Dropdown toggle={this.toggleDropdown} isOpen={this.state.dropdownOpen}>
                                    <DropdownToggle tag="div" className="pl-3 d-flex " >
                                        <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
                                        <p className="small ml-3 mr-4"></p>
                                    </DropdownToggle>

                                    <DropdownMenu
                                        className="mt-2"
                                        style={{ left: "auto", right: 0 }}>
                                        <DropdownItem>
                                            <Link
                                                style={{ color: "inherit", textDecoration: "none" }}
                                                to=""
                                            >
                                                Profile
                                </Link>
                                        </DropdownItem>

                                        <DropdownItem>
                                            <Link
                                                style={{ color: "inherit", textDecoration: "none" }}
                                                to=""
                                            >
                                                Members
                                </Link>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default Navbar;