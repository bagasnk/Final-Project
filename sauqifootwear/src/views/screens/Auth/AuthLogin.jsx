import React from "react"
import TextField from "../../components/TextField/TextField"
import ButtonUI from "../../components/Button/Button"
//import { RegisterHandler, LoginHandler } from '../../../redux/actions'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import Cookie from 'universal-cookie'
import { Redirect } from "react-router-dom";
import "./Auth.css"

const cookiesObject = new Cookie();

class AuthLogin extends React.Component {
    state = {
        loginForm: {
            username: "",
            password: "",
            showPassword: false,
        },
    }

    render() {
        return (
            <div className="container">
                <div className="justify-content-around row mt-5">
                    <div className="col-4 borderMenu">
                        <div className="d-flex flex-row">
                            <div className="mt-4">
                                <h3>Registered Customers</h3>
                                <p className="linebutton pt-1" />
                                <p className="small">
                                    If you have an account with us, please log in.</p>
                                <TextField
                                    value={this.state.loginForm.username}
                                    onChange={(e) => this.inputHandler(e, "username", "loginForm")}
                                    placeholder="Username"
                                    className="mt-2"
                                />
                                <TextField
                                    value={this.state.loginForm.password}
                                    onChange={(e) => this.inputHandler(e, "password", "loginForm")}
                                    placeholder="Password"
                                    className="mt-2"
                                />
                                
                                
                                <Link style={{ textDecoration: "none", color: "inherit" }}>
                                    <a className="nav-link mb-2 small" >Forgot Your Password?</a>
                                </Link>
                                <div className="d-flex justify-content-center ">
                                    <ButtonUI
                                        type="contained"
                                        className="mt-4 mb-3 btn-block"
                                    >
                                        Login
                                    </ButtonUI>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-8">
                        <div className="borderMenu  p-3">
                            <div className="d-flex flex-row">
                                <div className="mt-2">
                                    <h3>New Customers</h3>
                                    <p className="linebutton pt-1" />
                                    <p className="small">
                                        By creating an account with our stire, you will be able to move through the checkout process faster,
                                store multiple shipping addresses, view and track your orders in your account and more.</p>
                                </div>
                            </div>
                            <Link
                                style={{ textDecoration: "none", color: "inherit" }}
                                to="/authregister">

                                <div className="d-flex justify-content-center">
                                    <ButtonUI type="contained" className="mt-4 btn-block">
                                        Register
                                    </ButtonUI>
                                </div>

                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthLogin;