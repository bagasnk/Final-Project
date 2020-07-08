import React from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";
import { Form, Button, Card } from "react-bootstrap";
import ButtonUI from "../../../components/Button/Button"
import TextField from "../../../components/TextField/TextField"


import swal from "sweetalert";

const API_URL = `http://localhost:8080`;

class UserReset extends React.Component {
  state = {
    formEmail: {
      email: "",
    },
  };

  inputHandler = (e, field, form) => {
    const { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });
  };

  requestResetBtnHandler = () => {
    const { formEmail } = this.state;
    console.log(formEmail);
    Axios.post(`${API_URL}/users/forgotpassword`, formEmail)
      .then((res) => {
        swal("Success","Please see your email to reset your password","success");
        console.log(res.data);
      })
      .catch((err) => {
        swal("Failed","The email you entered is incorrect or not yet registered","error");
        console.log(err);
      });
  };


  render() {
    return (
      <>
        <div className="container mt-4 ">
          <div className="d-flex align-items-center justify-content-center">
            <Card className="w-30 text-center p-4">

              <h5>ENTER YOUR EMAIL</h5>
              <p className="small text-left">
                The link to reset the password will be sent via email
              </p>
              <TextField
                onChange={(e) => this.inputHandler(e, "email", "formEmail")}
                className="my-2" placeholder="Enter Email" />

              <ButtonUI
                type="contained"
                onClick={this.requestResetBtnHandler}
                className="btn-block mt-2">RESET</ButtonUI>
            </Card>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(UserReset);