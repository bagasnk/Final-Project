import React from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";
import {Form,Button,Card} from "react-bootstrap";
import swal from "sweetalert";

const API_URL = `http://localhost:8080`;

class UserResetPassword extends React.Component {
  state = {
    notfound: false,
    userReset: {},
    newPassword: {
      password: "",
    },
  };

  componentDidMount() {
    this.getUserActive();
  }
  getUserActive = () => {
    Axios.post(`${API_URL}/users/reset/${this.props.match.params.user_id}`)
    // id: this.props.match.params.user_id,
    // verifyToken: this.props.match.params.verify_token,

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
        console.log("id" + this.props.match.params.user_id )
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
        swal("Request Success", "Your password has been reseted", "success");
        this.setState({ newPassword: { password: "" } });
        console.log(res.data);
      })
      .catch((err) => {
        alert("error");
        console.log(err);
      });
  };

  render() {
    // if (this.state.notfound != true) {
    //   alert("Link not valid");
    //   return <Redirect to="/" />;
    // } else {
      return (
        <>
          <div className="container mt-4 ">
            <div className="d-flex align-items-center justify-content-center">
              <Card className="w-30 text-center p-4">
                <h5>ENTER YOUR NEW PASSWORD</h5>
                <Form.Control
                  className="my-2"
                  placeholder="Enter New Password"
                  value={this.state.newPassword.password}
                  onChange={(e) => this.inputHandler(e)}
                />
                <Form.Check
                  className="text-left my-2"
                  type="checkbox"
                  label="Show Password"
                />
                <Button
                  onClick={this.updateNewPassword}
                  className="btn btn-danger mt-2"
                >
                  RESET PASSWORD
                </Button>
              </Card>
            </div>
          </div>
        </>
      );
    }
  }
// }
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(UserResetPassword);