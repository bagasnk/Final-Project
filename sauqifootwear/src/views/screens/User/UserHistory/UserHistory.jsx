import React from "react"
import ButtonUI from "../../../components/Button/Button"
import Axios from 'axios'
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { Table } from "reactstrap";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import TextField from "../../../components/TextField/TextField";

import "./UserHistory.css";

const API_URL = `http://localhost:8080`;

class UserHistory extends React.Component {
  state = {
    transactionId: "",
    listDetail: [],
    activeProducts: [],
    activeProductsSuccess: [],
    activeProductsReject: [],
    activeProductsRejectP: [],
    status: "pending",
    selectImage: null,
    modalOpen: false,
    modalOpenCheck: false,
    buktiTrf: ""

  }

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  toggleModalCheck = () => {
    this.setState({ modalOpenCheck: !this.state.modalOpenCheck });
  };

  uploadPhotoHandler = (transactionId) => {
    this.setState({
      transactionId: transactionId,
      modalOpen: true,
    });
  };

  checkBuktiHandler = (buktiTrf) => {
    this.setState({
      buktiTrf: buktiTrf,
      modalOpenCheck: true,
    });
  };

  fileChangeHandler = (e) => {
    this.setState({ selectImage: e.target.files[0] });
  };

  getDataTransaksi = (val) => {
    Axios.get(`${API_URL}/transaction/user/${this.props.user.id}?status=${val}`)
      .then((res) => {
        console.log(res.data)
        this.setState({
          status: val,
          listDetail: res.data,
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    { this.getDataTransaksi(this.state.status) }
  }


  uploadBuktiHandler = (transactionId) => {
    let formData = new FormData();
    if (this.state.selectImage) {
      formData.append(
        "file",
        this.state.selectImage,
        this.state.selectImage.name
      );
    }

    Axios.put(`${API_URL}/transaction/uploadBukti/${transactionId}`, formData)
      .then((res) => {
        swal("Success!", "Your item has been edited", "success");
        this.setState({ modalOpen: false });
        this.getDataTransaksi(this.state.status);
      })
      .catch((err) => {
        swal("Error!", "Your item could not be edited", "error");
        console.log(err);
      });
  };

  renderDataTransaksi = () => {
    const { listDetail } = this.state
    return listDetail.map((val, idx) => {
      return (
        <>
          <tr>
            <td>{val.id}</td>
            <td><span style={{ fontWeight: "normal" }}>
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(val.totalPrice - parseInt(val.jasaPengiriman))}
            </span></td>
            <td><span style={{ fontWeight: "normal" }}>
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(val.jasaPengiriman)}
            </span></td>
            <td><span style={{ fontWeight: "normal" }}>
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(val.totalPrice)}
            </span></td>
            <td>{val.status}</td>

            <td>
              <div className="d-flex flex-column pl-4 ml-4">
                <div className="row">
                  <ButtonUI
                    onClick={() => {
                      console.log(idx, this.state.activeProducts.includes(idx))
                      console.log(val)
                      if (this.state.status == "pending") {
                        if (this.state.activeProducts.includes(idx)) {
                          this.setState({
                            activeProducts: [
                              ...this.state.activeProducts.filter((item) => item !== idx),
                            ],
                          });
                        } else {
                          this.setState({
                            activeProducts: [...this.state.activeProducts, idx],
                          });
                        }
                      } else if (this.state.status == "success") {
                        if (this.state.activeProductsSuccess.includes(idx)) {
                          this.setState({
                            activeProductsSuccess: [
                              ...this.state.activeProductsSuccess.filter((item) => item !== idx),
                            ],
                          });
                        } else {
                          this.setState({
                            activeProductsSuccess: [...this.state.activeProductsSuccess, idx],
                          });
                        }
                      } else if (this.state.status == "reject") {
                        if (this.state.activeProductsReject.includes(idx)) {
                          this.setState({
                            activeProductsReject: [
                              ...this.state.activeProductsReject.filter((item) => item !== idx),
                            ],
                          });
                        } else {
                          this.setState({
                            activeProductsReject: [...this.state.activeProductsReject, idx],
                          });
                        }
                      } else {
                        if (this.state.activeProductsRejectP.includes(idx)) {
                          this.setState({
                            activeProductsRejectP: [
                              ...this.state.activeProductsRejectP.filter((item) => item !== idx),
                            ],
                          });
                        } else {
                          this.setState({
                            activeProductsRejectP: [...this.state.activeProductsRejectP, idx],
                          });
                        }
                      }
                    }}
                  >
                    Details
                    </ButtonUI>
                  <div className="row">
                    {val.buktiTrf != "" && this.state.status != "success" ?
                      <ButtonUI
                        onClick={(_) => this.checkBuktiHandler(val.buktiTrf)}
                        type="contained">
                        Check Bukti Transfer
                    </ButtonUI> : null}


                    {this.state.status != "success" ?
                      <ButtonUI
                        onClick={(_) => this.uploadPhotoHandler(val.id)}
                        type="contained">
                        Upload Bukti Transfer
                    </ButtonUI> : null}
                  </div>
                </div>
              </div>

            </td>
          </tr>
          {val.transactionDetails.map((val, index) => {
            return (
              <tr
                className={`collapse-item 
                  ${this.state.status == "pending" ?
                    this.state.activeProducts.includes(idx) ? "active" : null
                    : this.state.status == "success" ?
                      this.state.activeProductsSuccess.includes(idx) ? "active" : null
                      : this.state.status == "reject" ?
                        this.state.activeProductsReject.includes(idx) ? "active" : null
                        : this.state.activeProductsRejectP.includes(idx) ? "active" : null
                  }`}
              >
                <td colSpan={6}>
                  <div className="row col-12">
                    <div className="col-3 pt-2">
                      <img src={val.products.image} alt="" style={{ height: "120px", border: "1px solid black" }} />
                    </div>
                    <div className="col-2 text-left ">
                      <h6>No</h6>
                      <h6>Nama Product</h6>
                      <h6>Price</h6>
                      <h6>Quantity</h6>
                      <h6>Total Price</h6>
                    </div>
                    <div className="col-3 text-left">
                      <h6>: <span style={{ fontWeight: "normal" }}>{index + 1}</span></h6>
                      <h6>: <span style={{ fontWeight: "normal" }}>{val.products.productName}</span></h6>
                      <h6>: <span style={{ fontWeight: "normal" }}>
                        {" "}
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(val.price)}
                      </span></h6>
                      <h6>: <span style={{ fontWeight: "normal" }}> {val.quantity}</span> </h6>
                      <h6>: <span style={{ fontWeight: "normal" }}>
                        {" "}
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(val.totalPriceProduct)}
                      </span>
                      </h6>
                    </div>
                  </div>
                </td>
              </tr>
            )
          }
          )}
        </>
      )
    })
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="d-flex justify-content-center flex-row align-items-center my-3">
          </div>
          <caption>
            <h4>History</h4>
          </caption>
          <div className="mt-2">
            <div className="d-flex justify-content-center">
              <ButtonUI
                className={`nav-atas-btn ${
                  this.state.status == "pending" ? "active" : null
                  } `}
                type="outlined"
                onClick={() => this.getDataTransaksi("pending")}
              >
                Pending
                        </ButtonUI>
              <ButtonUI
                className={`nav-atas-btn ${
                  this.state.status == "success" ? "active" : null
                  } ml-4`}
                type="outlined"
                onClick={() => this.getDataTransaksi("success")}
              >
                Success
                        </ButtonUI>
              <ButtonUI
                className={`nav-atas-btn ${
                  this.state.status == "reject" ? "active" : null
                  } ml-4`}
                type="outlined"
                onClick={() => this.getDataTransaksi("reject")}
              >
                Reject
                        </ButtonUI>
              <ButtonUI
                className={`nav-atas-btn ${
                  this.state.status == "rejectPermanent" ? "active" : null
                  } ml-4`}
                type="outlined"
                onClick={() => this.getDataTransaksi("rejectPermanent")}
              >
                Reject Permanent
                        </ButtonUI>
            </div>
          </div>
          <Table className="mt-4 text-center">
            <thead>
              <tr>
                <th>Id Transaksi</th>
                <th>Harga Semua Item</th>
                <th>Harga Pengiriman</th>
                <th>Harga Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.renderDataTransaksi()}
            </tbody>
          </Table>
        </div>

        <Modal
          toggle={this.toggleModalCheck}
          isOpen={this.state.modalOpenCheck}
          className="edit-modal">
          <ModalHeader toggle={this.toggleModalCheck}>
            <caption>
              <h3>Check Bukti Transfer</h3>
            </caption>
          </ModalHeader>
          <ModalBody>

            <div className="col-6 mt-3">
              <div className="col-12 text-center my-3">
                <img src={this.state.buktiTrf} alt="" style={{ height: "120px" }} />
              </div>
            </div>

            <div className="d-flex flex-row py-5">
              <div className="col-5  offset-1">
                <ButtonUI
                  className="w-100"
                  onClick={this.toggleModalCheck}
                  type="outlined"
                >
                  Cancel
              </ButtonUI>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal
          toggle={this.toggleModal}
          isOpen={this.state.modalOpen}
          className="edit-modal">
          <ModalHeader toggle={this.toggleModal}>
            <caption>
              <h3>Upload Bukti Transfer</h3>
            </caption>
          </ModalHeader>
          <ModalBody>


            <div className="col-6 mt-3">
              Image :
                <input className="mt-3 ml-4"
                type="file"
                name="file"
                onChange={(e) => {
                  this.fileChangeHandler(e, "selectImage");
                }}
              />
            </div>

            <div className="d-flex flex-row py-5">
              <div className="col-5  offset-1">
                <ButtonUI
                  className="w-100"
                  onClick={this.toggleModal}
                  type="outlined"
                >
                  Cancel
              </ButtonUI>
              </div>
              <div className=" col-5 ">
                <ButtonUI
                  className="w-100"
                  onClick={() => this.uploadBuktiHandler(this.state.transactionId)}
                  type="contained"
                >
                  Upload
              </ButtonUI>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};


export default connect(mapStateToProps)(UserHistory)
