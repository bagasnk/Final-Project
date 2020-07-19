import React from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";
import { Form, Button, Card } from "react-bootstrap";
import swal from "sweetalert";
import TextField from "../../../components/TextField/TextField"


const API_URL = `http://localhost:8080`;

class UserResetPassword extends React.Component {
  state = {
    // notfound: false,
    userReset: {},
    newPassword: {
      password: "",
      showPassword: false,
    },
  };

  componentDidMount() {
    this.getUserActive();
  }
  getUserActive = () => {
    Axios.post(`${API_URL}/users/reset/${this.props.match.params.user_id}/${this.props.match.params.userVerif}`)
      .then((res) => {
        console.log("init rest.data" + res.data);
        this.setState({
          userReset: res.data,
        });
        console.log(this.state.userReset);
      })
      .catch((err) => {
        this.setState({ notfound: true });
        console.log(err);
        console.log("id" + this.props.match.params.user_id)
        console.log("token" + this.props.match.params.verify_token)
      });
  };

  inputHandler = (e) => {
    const { value } = e.target;
    this.setState({
      newPassword: {
        password: value,
      },
    });
  };

  updateNewPassword = () => {
    const { newPassword, userReset } = this.state;
    let userData = { ...userReset, ...newPassword };
    console.log(userData);
    console.log(userReset);

    Axios.put(`${API_URL}/users/resetpassword`, userData)
      .then((res) => {
        console.log("berhasil");
        swal("Success", "Your password has been reset successfully", "success");
        this.setState({ newPassword: { password: "" }, notfound: true });
        console.log(res.data);
      })
      .catch((err) => {
        alert("error");
        console.log(err);
      });
  };

  checkboxHandler = (e, form) => {
    const { checked } = e.target
    this.setState({
      [form]: {
        ...this.state[form],
        showPassword: checked,
      }
    })
  }

  render() {
    const { password } = this.state.newPassword;
    if (this.state.notfound == true) {
      return <Redirect to="/" />;
    } else {
      return (
        <>
          <div className="container mt-4 ">
            <div className="d-flex align-items-center justify-content-center">
              <Card className="w-30 text-center p-4">
                <h5>ENTER YOUR NEW PASSWORD</h5>
                <TextField
                  className="my-2"
                  placeholder="New Password"
                  value={this.state.newPassword.password}
                  onChange={(e) => this.inputHandler(e)}
                  type={this.state.newPassword.showPassword ? "text" : "password"}
                />

                <input type="checkbox" onChange={(e) => this.checkboxHandler(e, 'newPassword')} className="mt-3" name="showPasswordRegister" />{" "}
                    Show Password

                    {password ? (
                  <Button
                    onClick={this.updateNewPassword}
                    className="btn btn-danger mt-2"
                  >
                    RESET PASSWORD
                  </Button>

                ) : (
                    <button
                      disabled
                      onClick={this.updateNewPassword}
                      className="btn btn-danger mt-2"
                    >
                      RESET PASSWORD
                    </button>

                  )}
              </Card>
            </div>
          </div>
        </>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(UserResetPassword);