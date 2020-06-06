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

class AuthRegister extends React.Component {
    state = {
        registerForm: {
            username: "",
            fullName: "",
            password: "",
            repassword: "",
            email: "",
            address: "",
            showPassword: false,
            users: [],
        }
    }

    render() {
        return (
            <div className="container">
                <div className="justify-content-around row mt-5">
                    <div className="col-6 borderMenu">
                        <div className="d-flex flex-row">
                            <div className="mt-4">
                                <h3>Personal Information</h3>
                                <p className="linebutton pt-1" />

                                <TextField
                                    value={this.state.registerForm.username}
                                    onChange={(e) => this.inputHandler(e, "username", "registerForm")}
                                    placeholder="Username"
                                    className="mt-2"
                                />
                                <TextField
                                    value={this.state.registerForm.fullName}
                                    onChange={(e) => this.inputHandler(e, "fullName", "registerForm")}
                                    placeholder="Full Name"
                                    className="mt-2"
                                />
                                <TextField
                                    value={this.state.registerForm.email}
                                    onChange={(e) => this.inputHandler(e, "email", "registerForm")}
                                    placeholder="Email"
                                    className="mt-2"
                                />
                                <TextField
                                    value={this.state.registerForm.address}
                                    onChange={(e) => this.inputHandler(e, "address", "registerForm")}
                                    placeholder="Address"
                                    className="mt-2 mb-3"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="borderMenu p-3">
                            <div className="d-flex flex-row">
                                <div className="mt-3">
                                    <h3>Login Information</h3>
                                </div>
                            </div>
                            <p className="linebutton pt-1" />
                            <TextField
                                value={this.state.registerForm.password}
                                onChange={(e) => this.inputHandler(e, "password", "registerForm")}
                                placeholder="Password"
                                className="mt-2"
                            />
                            <TextField
                                value={this.state.registerForm.repassword}
                                onChange={(e) => this.inputHandler(e, "repassword", "registerForm")}
                                placeholder="Repassword"
                                className="mt-2"
                            />
                            
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                                <ButtonUI
                                    type="contained"
                                    className="mt-4 btn-block"
                                >
                                    Register
                            </ButtonUI>
                            </div>
                </div>
            </div>
        );
    }
}

export default AuthRegister;