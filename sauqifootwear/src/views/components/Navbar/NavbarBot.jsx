import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faFacebookSquare, faTwitterSquare , faInstagramSquare} from "@fortawesome/free-brands-svg-icons";
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import { Link } from "react-router-dom";
import ButtonUI from "../Button/Button.tsx";
import "./NavbarBot.css";
import logoJapan from "../../../assets/images/Showcase/LogoJapanFair.jpeg"
import { logoutHandler, SearchAndFilterHandler, qtyCartHandler } from "../../../redux/actions";
import { connect } from "react-redux";

class NavbarBot extends React.Component {


  render() {
    return (
      <div className="bg-warning p-4 mt-5 mb-0">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 cizgi">
            <div className="card bg-warning border-0">
              <div className="card-body text-light text-center">
                <h5 className="card-title text-white display-4" style={{ fontSize: "30px" }}>JETRO.ID</h5>
                <p className="d-inline lead">Bagas Yafitra Pandji © 2020
							      <a href="#" className="text-light d-block lead">Jetro Website</a>
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
            <div className="card bg-warning border-0">
              <div className="card-body text-center">
                <h5 className="card-title text-white display-4" style={{ fontSize: "30px"}}>Murah Asli</h5>
                <a className="text-light d-block lead" style={{ marginLeft: "-20px" }} href="#"><i className="fa fa-phone mr-2"></i>+62 0822 1613 0343</a>
                <a className="text-light d-block lead" href="#"><i className="fa fa-envelope mr-2"></i>admin@bagasyafitrapandji.nk.com</a>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
            <div className="card bg-warning border-0">
              <div className="card-body text-center">
                <h5 className="card-title text-white display-4 mb-4" style={{fontSize:"30px"}}>Social Media</h5>
                <a className="text-light " href="#"><FontAwesomeIcon icon={faFacebookSquare} style={{ fontSize: 40 }} /></a>
                <a className="text-light pl-4" href="#"><FontAwesomeIcon icon={faTwitterSquare} style={{ fontSize: 40 }} /></a>
                <a className="text-light pl-4" href="#"><FontAwesomeIcon icon={faInstagramSquare} style={{ fontSize: 40 }} /></a>
              </div>
            </div>
          </div>

        </div>

      </div>
    )
  }
}
export default NavbarBot;
