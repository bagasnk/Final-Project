import React from "react";
import "./AdminMembers.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";


import ButtonUI from "../../../components/Button/Button";
import TextField from "../../../components/TextField/TextField";

import swal from "sweetalert";

const API_URL = `http://localhost:8080`;

class AdminMembers extends React.Component {

    state = {
        memberList: [],
        activeMembers: [],
        createMember: {
            username: "",
            password: "",
            fullname: "",
            role: "admin",
            email: "",
            address: "",
        },
        editMember: {
            id: 0,
            username: "",
            password: "",
            fullname: "",
            role: "",
            email: "",
            address: "",
        },
        modalOpen: false
    }
    componentDidMount() {
        this.getMemberList()
    }

    getMemberList = () => {
        Axios.get(`${API_URL}/users/members`)
            .then((res) => {
                console.log(res);
                this.setState({
                    memberList: res.data
                })
            })
            .catch((err) => {
                console.log(err);

            })
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

    createMemberHandler = () => {
        Axios.post(`${API_URL}/users`, this.state.createMember)
            .then((res) => {
                swal("Success!", "Your item has been added to the list", "success");
                this.setState({
                    createMember: {
                        username: "",
                        password: "",
                        fullname: "",
                        role: "",
                        email: "",
                    },
                });
                this.getMemberList();
            })
            .catch((err) => {
                swal("Error!", "Your item could not be added to the list", "error");
            });
    }

    editBtnHandler = (idx) => {
        this.setState({
            editMember: {
                ...this.state.memberList[idx],
            },
            modalOpen: true,
        });
    };
    
    editMemberHandler = () => {
        Axios.put(`${API_URL}/users/edit`, this.state.editMember)
            .then((res) => {
                swal("Success!", "Your item has been edited", "success");
                this.setState({ modalOpen: false });
                this.getMemberList();
            })
            .catch((err) => {
                swal("Error!", "Your item could not be edited", "error");
                console.log(err);
            });
    }

    toggleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    };

    deleteHandler = (id) => {
        Axios.delete(`${API_URL}/users/${id}`)
            .then((res) => {
                console.log(res);
                this.getMemberList()
                swal("Delete", " ", "success")

            })
            .catch((err) => {
                console.log(err);

            })
    }

    renderMemberList = () => {
        return this.state.memberList.map((val, idx) => {
            return (
                <>
                    <tr onClick={() => {
                        if (this.state.activeMembers.includes(idx)) {
                            this.setState({
                                activeMembers: [
                                    ...this.state.activeMembers.filter((item) => item !== idx),
                                ],
                            });
                        } else {
                            this.setState({
                                activeMembers: [...this.state.activeMembers, idx],
                            });
                        }
                    }}>
                        <td>{val.id}</td>
                        <td>{val.username}</td>
                        <td>{val.fullname}</td>
                    </tr>
                    <tr className={`collapse-item ${
                        this.state.activeMembers.includes(idx) ? "active" : null
                        }`}>

                        <td colSpan={2}>
                            <div className="d-flex justify-content-around align-items-center">
                                <div className="d-flex flex-column ml-4 justify-content-center">
                                    <h4>{val.fullname}</h4>
                                    <h6 className="mt-2">Email :
                                    <span style={{ fontWeight: "normal" }}> {val.email}</span>
                                    </h6>
                                    <h6>Role :
                                    <span style={{ fontWeight: "normal" }}> {val.role}</span>
                                    </h6>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <ButtonUI
                                        onClick={(_) => this.editBtnHandler(idx)}
                                        type="contained"
                                    >
                                        Edit
                                    </ButtonUI>
                                    <ButtonUI className="mt-3" type="textual" onClick={() => this.deleteHandler(val.id)} >
                                        Delete
                                     </ButtonUI>

                                </div>
                            </div>
                        </td>
                    </tr>
                </>
            )
        })
    }
    render() {
        return (
            <div className="container py-4">
                <div className="dashboard">
                    <caption className="p-3">
                        <h2>Members</h2>
                    </caption>
                    <table className="dashboard-table">
                        <thead>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Full Name</th>
                        </thead>
                        <tbody>
                            {this.renderMemberList()}
                        </tbody>
                    </table>
                </div>
                <div className="dashboard-form-container p-4">
                    <caption className="mb-4 mt-2">
                        <h2>Add Member</h2>
                    </caption>
                    <div className="row">
                        <div className="col-6">
                            <TextField
                                value={this.state.createMember.username}
                                placeholder="Username"
                                onChange={(e) =>
                                    this.inputHandler(e, "username", "createMember")
                                }
                            />
                        </div>
                        <div className="col-6">
                            <TextField
                                value={this.state.createMember.password}
                                placeholder="Password"
                                onChange={(e) =>
                                    this.inputHandler(e, "password", "createMember")
                                }
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-8">
                            <TextField
                                value={this.state.createMember.fullname}
                                placeholder="Full Name"
                                onChange={(e) =>
                                    this.inputHandler(e, "fullname", "createMember")
                                }
                            />
                        </div>
                        <div className="col-4">
                            <select
                                value={this.state.createMember.role}
                                className="custom-text-input h-100 pl-3"
                                onChange={(e) => this.inputHandler(e, "role", "createMember")}
                            >
                                <option value="admin">admin</option>
                                <option value="user">user</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-6">
                            <TextField
                                value={this.state.createMember.email}
                                placeholder="E-mail"
                                onChange={(e) =>
                                    this.inputHandler(e, "email", "createMember")
                                }
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <ButtonUI onClick={() => this.createMemberHandler()} type="contained">
                            Create Member
                        </ButtonUI>
                    </div>
                </div>
                <Modal
                    toggle={this.toggleModal}
                    isOpen={this.state.modalOpen}
                    className="edit-modal"
                >
                    <ModalHeader toggle={this.toggleModal}>
                        <caption>
                            <h3>Edit Member</h3>
                        </caption>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-8">
                                <TextField
                                    value={this.state.editMember.username}
                                    placeholder="Username"
                                    onChange={(e) =>
                                        this.inputHandler(e, "username", "editMember")
                                    }
                                />
                            </div>
                            <div className="col-4">
                                <TextField
                                    value={this.state.editMember.fullname}
                                    placeholder="Full Name"
                                    onChange={(e) => this.inputHandler(e, "fullname", "editMember")}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 mt-3">
                                <select
                                    value={this.state.editMember.role}
                                    className="custom-text-input h-100 pl-3"
                                    onChange={(e) => this.inputHandler(e, "role", "editMember")}
                                >
                                    <option value="admin">admin</option>
                                    <option value="user">user</option>
                                </select>
                            </div>
                            <div className="col-6 mt-3">
                                <TextField
                                    value={this.state.editMember.email}
                                    placeholder="E-mail"
                                    onChange={(e) => this.inputHandler(e, "email", "editMember")}
                                />
                            </div>
                        </div>

                        <div className="d-flex flex-row py-5">
                            <div className="col-5 mt-3 offset-1">
                                <ButtonUI
                                    className="w-100"
                                    onClick={this.toggleModal}
                                    type="outlined"
                                >
                                    Cancel
                               </ButtonUI>
                            </div>
                            <div className=" col-5 mt-3">
                                <ButtonUI
                                    className="w-100"
                                    onClick={this.editMemberHandler}
                                    type="contained"
                                >
                                    Save
                             </ButtonUI>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </div >
        )
    }
}
export default AdminMembers