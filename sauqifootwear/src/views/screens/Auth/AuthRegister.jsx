import React from "react"
import TextField from "../../components/TextField/TextField"
import ButtonUI from "../../components/Button/Button"
import { RegisterHandler } from '../../../redux/actions'
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
            fullname: "",
            password: "",
            repassword: "",
            email: "",
            address: "",
            showPassword: false,
            users: [],
        }
    }

    inputHandler = (e, field, form) => {
        const { value } = e.target

        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            }
        })
    }

    postDataHandler = () => {
        const { username, fullname, password, email, address } = this.state.registerForm
        const userData = {
            username,
            password,
            fullname,
            email,
            address,
        };
        this.props.onRegister(userData)
        this.state.registerForm.username = ""
        this.state.registerForm.password = ""
        this.state.registerForm.fullname = ""
        this.state.registerForm.email = ""
        this.state.registerForm.address = ""
        this.setState({ errMsg: "" })
    }

    componentDidUpdate() {
        if (this.props.user.id) {
            cookiesObject.set("authData", JSON.stringify(this.props.user), {path:"/"})
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
                                    value={this.state.registerForm.fullname}
                                    onChange={(e) => this.inputHandler(e, "fullname", "registerForm")}
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
                        {this.props.user.errMsg ? (
                            <div className="alert alert-danger mt-3 small">
                                {this.props.user.errMsg}
                            </div>
                        ) : null}
                    </div>
                    <div className="d-flex justify-content-center">
                        <ButtonUI
                            onClick={this.postDataHandler}
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

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    onRegister: RegisterHandler,
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRegister)