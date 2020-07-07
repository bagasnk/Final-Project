import React from "react";
import "./UserProfile.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import ButtonUI from "../../../components/Button/Button";
import TextField from "../../../components/TextField/TextField";
import { logoutHandler } from "../../../../redux/actions";

import swal from "sweetalert";

const API_URL = `http://localhost:8080`;

class UserProfile extends React.Component {
  state = {
    listProfile: [],
    editMember: {
      id: 0,
      username: "",
      password: "",
      fullname: "",
      role: "",
      email: "",
      address: "",
    },
    changePassword: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    modalOpen: false,
    modalOpenPassword: false,
  }


  inputHandler = (e, field, form) => {
    let { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });
  }

  getUserId = () => {
    Axios.get(`${API_URL}/users/profile/${this.props.user.id}`)
      .then(res => {
        this.setState({
          listProfile: res.data
        })
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getUserId();
  }

  editProfileHandler = () => {
    Axios.put(`${API_URL}/users/edit`, this.state.editMember)
      .then((res) => {
        swal("Success!", "Your item has been edited", "success");
        this.setState({ modalOpen: false });
        this.getUserId();
      })
      .catch((err) => {
        swal("Error!", "Your item could not be edited", "error");
        console.log(err);
      });
  }

  editBtnHandler = () => {
    this.setState({
      editMember: {
        ...this.state.listProfile,
      },
      modalOpen: true,
    });
  };

  editBtnPassword = () => {
    this.setState({
      modalOpenPassword: true,
    })
  }

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  toggleModalPassword = () => {
    this.setState({ modalOpenPassword: !this.state.modalOpenPassword })
  }

  changePasswordHandler = () => {
    const {
      oldPassword,
      newPassword,
      confirmPassword,
    } = this.state.changePassword

    if (newPassword == confirmPassword) {
      Axios.post(`${API_URL}/users/changePassword`, this.state.listProfile, {
        params: {
          oldPass: oldPassword,
          newPass: newPassword,
        },
      })
        .then((res) => {
          console.log("berhasil");
          swal(
            "Password Changed",
            "Your password has been successfully changed, please relogin",
            "success"
          );
          this.props.onLogout();
          console.log(res.data);
        })
        .catch((err) => {
          alert("GAGAL kesalahan sistem");
          console.log(err);
        });
    } else {
      alert("Password tidak cocok");
    }
  };

  render() {
    const { username, fullname, address, email } = this.state.listProfile
    if (!this.props.user.id) {
      return <Link to="/" />;
    } else {
      return (
        <>
          <div className="container mt-4 ">
            <div className="d-flex align-items-center justify-content-center">
              <Card className="w-100  p-4">
                <h5 className="text-center">Halo, {username}</h5>
                <p className="small text-center">Biodata</p>
                <div className="row">
                  <div className="col-3 text-center">
                    <img
                      style={{ width: "50%", objectFit: "contain", height: "200px" }}
                      // src={this.state.productData.image}
                      alt=""
                    />
                  </div>
                  <div className="col-3 d-flex flex-column pt-4">
                    <h6>Username</h6>
                    <h6 className="mt-2">Nama</h6>
                    <h6 className="mt-2">Address</h6>
                    <h6 className="mt-2">Email</h6>
                  </div>
                  <div className="col-6 d-flex flex-column pt-4">
                    <h6> : {username}</h6>
                    <h6 className="mt-2"> : {fullname}</h6>
                    <h6 className="mt-2"> : {address}</h6>
                    <h6 className="mt-2"> : {email}</h6>
                    <div className="row">
                      <ButtonUI
                        onClick={(_) => this.editBtnHandler()}
                        type="contained"
                        className="mt-4 ">Edit Profile</ButtonUI>

                      <ButtonUI
                        onClick={(_) => this.editBtnPassword()}
                        type="text"
                        className="mt-4">Change Password</ButtonUI>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>


          <Modal
            toggle={this.toggleModalPassword}
            isOpen={this.state.modalOpenPassword}
            className="edit-modal">
            <ModalHeader toggle={this.toggleModalPassword}>
              <caption>
                <h3>Edit Password</h3>
              </caption>
            </ModalHeader>
            <ModalBody>
              <TextField
                value={this.state.changePassword.oldPassword}
                onChange={(e) =>
                  this.inputHandler(
                    e,
                    "oldPassword",
                    "changePassword"
                  )
                }
                placeholder="Enter Old Password"
              />

              <TextField
                value={this.state.changePassword.newPassword}
                onChange={(e) =>
                  this.inputHandler(
                    e,
                    "newPassword",
                    "changePassword"
                  )
                }
                placeholder="Enter New Password"
              />

              <TextField
                value={
                  this.state.changePassword.confirmPassword
                }
                onChange={(e) =>
                  this.inputHandler(
                    e,
                    "confirmPassword",
                    "changePassword"
                  )
                }
                placeholder="Confirm New Password"
              />
              <div className="d-flex flex-row py-5">
                <div className="col-5  offset-1">
                  <ButtonUI
                    className="w-100"
                    onClick={this.toggleModalPassword}
                    type="outlined"
                  >
                    Cancel
                </ButtonUI>
                </div>
                <div className=" col-5 ">
                  <ButtonUI
                    className="w-100"
                    onClick={this.changePasswordHandler}
                    type="contained"
                  >
                    Update
                </ButtonUI>
                </div>
              </div>
            </ModalBody>

          </Modal>


          <Modal
            toggle={this.toggleModal}
            isOpen={this.state.modalOpen}
            className="edit-modal"
          >
            <ModalHeader toggle={this.toggleModal}>
              <caption>
                <h3>Edit Profile</h3>
              </caption>
            </ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col-8">
                  <TextField
                    value={this.state.editMember.fullname}
                    placeholder="Full Name"
                    onChange={(e) => this.inputHandler(e, "fullname", "editMember")}
                  />
                </div>
                <div className="col-4">
                  <TextField
                    value={this.state.editMember.username}
                    placeholder="Username"
                    onChange={(e) =>
                      this.inputHandler(e, "username", "editMember")
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6 mt-3">
                  <TextField
                    value={this.state.editMember.email}
                    placeholder="E-mail"
                    onChange={(e) => this.inputHandler(e, "email", "editMember")}
                  />
                </div>
                <div className="col-6 mt-3">
                  <TextField
                    placeholder="New Password"
                    onChange={(e) =>
                      this.inputHandler(e, "password", "editMember")
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 mt-3">
                  <TextField
                    value={this.state.editMember.address}
                    placeholder="Address"
                    onChange={(e) => this.inputHandler(e, "address", "editMember")}
                  />
                </div>
              </div>
              <div className="d-flex flex-row py-5">
                <div className="col-3 mt-3 offset-1">
                  <ButtonUI
                    className="w-100"
                    onClick={this.toggleModal}
                    type="outlined"
                  >
                    Cancel
                </ButtonUI>
                </div>
                <div className=" col-3 mt-3">
                  <ButtonUI
                    className="w-100"
                    onClick={this.editProfileHandler}
                    type="contained"
                  >
                    Save
                </ButtonUI>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  onLogout: logoutHandler,
};


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
