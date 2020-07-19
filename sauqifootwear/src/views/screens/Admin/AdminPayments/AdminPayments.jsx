import React from "react"
import ButtonUI from "../../../components/Button/Button"
import Axios from 'axios'
import swal from 'sweetalert';
import "./AdminPayments.css"
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepBackward, faFastBackward, faStepForward, faFastForward, faTimes } from "@fortawesome/free-solid-svg-icons/";
import { Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl } from "react-bootstrap";


const API_URL = `http://localhost:8080`;


class AdminPayments extends React.Component {
  state = {
    productList: [],
    datePayments: new Date(),
    activeProducts: [],
    activeProductsSuccess: [],
    activeProductsReject: [],
    activeProductsRejectP: [],
    currentPage: 0,
    itemsPerPage: 6,
    totalPages: 0,
    totalElements: 0,
    modalOpen: false,
    modalOpenCheck: false,
    status: "pending",
    formEmail: {
      email: "",
    },
  }

  toggleModalCheck = () => {
    this.setState({ modalOpenCheck: !this.state.modalOpenCheck });
  };

  checkBuktiHandler = (buktiTrf) => {
    this.setState({
      buktiTrf: buktiTrf,
      modalOpenCheck: true,
    });
  };

  // button untuk balik ke page pertama 
  firstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      this.getPaymentsList(this.state.status, firstPage)
    }
  }

  // button untuk kembali ke page sebelumnya
  prevPage = () => {
    let prevPage = 1;
    if (this.state.currentPage > prevPage) {
      this.getPaymentsList(this.state.status, this.state.currentPage - prevPage)
    }
  }

  // button untuk maju ke page selanjutnya
  nextPage = () => {
    if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.itemsPerPage)) {
      this.getPaymentsList(this.state.status, this.state.currentPage + 1)
    }
  }

  // button untuk maju ke page terakhir
  lastPage = () => {
    let condition = Math.ceil(this.state.totalElements / this.state.itemsPerPage)
    if (this.state.currentPage < condition) {
      this.getPaymentsList(this.state.status, condition)
    }
  }

  getPaymentsList = (val, currentPage) => {
    currentPage -= 1
    Axios.get(`${API_URL}/transaction?status=${val}&page=${currentPage}&size=6`)
      .then((res) => {
        console.log(res.data)
        this.setState({
          productList: res.data.content,
          status: val,
          totalPages: res.data.totalPages,
          totalElements: res.data.totalElements,
          currentPage: res.data.number + 1
        });

      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    { this.getPaymentsList(this.state.status) }
  }

  confirmBtnHandler = (transactionId) => {
    Axios.patch(`${API_URL}/transaction/editTransaction/${transactionId}`, {
      status: "success",
      tanggalAcc: this.state.datePayments.toLocaleDateString(),
    })
      .then((res) => {
        this.getPaymentsList(this.state.status)
        swal("Success!", "Berhasil", "success");
        const { formEmail } = this.state;
        console.log(formEmail);
        Axios.post(`${API_URL}/transaction/sendEmailSuccess/${transactionId}`, formEmail)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err)
      })
  }

  rejectPermanentHandler = (transactionId) => {
    Axios.patch(`${API_URL}/transaction/editTransaction/${transactionId}`, {
      status: "rejectPermanent",
    })
      .then((res) => {
        this.getPaymentsList(this.state.status)
        swal("Success!", "Berhasil", "success");
        const { formEmail } = this.state;
        console.log(formEmail);
        Axios.post(`${API_URL}/transaction/sendEmailRejectPermanent/${transactionId}`, formEmail)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });

      })
      .catch((err) => {
        console.log(err)
      })
  }

  rejectBtnHandler = (transactionId) => {
    Axios.patch(`${API_URL}/transaction/editTransaction/${transactionId}`, {
      status: "reject",
      tanggalReject: this.state.datePayments.toLocaleDateString(),
    })
      .then((res) => {
        this.getPaymentsList(this.state.status)
        swal("Success!", "Berhasil", "success");
        const { formEmail } = this.state;
        console.log(formEmail);
        Axios.post(`${API_URL}/transaction/sendEmailReject/${transactionId}`, formEmail)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });

      })
      .catch((err) => {
        console.log(err)
      })
  }

  renderProductList = () => {
    return this.state.productList.map((val, idx) => {
      return (
        <>
          <tr className="text-center"
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
            <td> {idx + 1} </td>
            <td> {val.user.username}  </td>
            <td>
              <span style={{ fontWeight: "normal" }}>
                {" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(val.totalPrice)}
              </span>
            </td>
            <td> {val.status}</td>
            <td><ButtonUI
              onClick={(_) => this.checkBuktiHandler(val.buktiTrf)}
              type="contained"
            >
              Check Bukti Trf
                  </ButtonUI></td>
            <td> {val.tanggalBeli}</td>
            {this.state.status == "success" ?
              <td> {val.tanggalAcc}</td>
              : null
            }
            {this.state.status == "reject" ?
              <td> {val.tanggalReject}</td>
              : null
            }
            <center>
              <div className="row ml-5 justify-content-center">
                {this.state.status != "success" && this.state.status != "rejectPermanent" ?
                  <>
                    <ButtonUI
                      onClick={(_) => this.confirmBtnHandler(val.id)}
                      type="contained"
                    >
                      Confirm
                  </ButtonUI>

                    <ButtonUI
                      onClick={(_) => this.rejectBtnHandler(val.id)}
                      type="contained"
                    >
                      Reject
                  </ButtonUI>

                  </>
                  : null}
                {this.state.status == "reject" ?
                  <>
                    <span>Reject Permanent ?<br /><FontAwesomeIcon icon={faTimes} onClick={(_) => this.rejectPermanentHandler(val.id)} /> </span>

                  </>
                  : null}
              </div>
            </center>
          </tr>
          <>
            {val.transactionDetails.map((val, index) => {
              if (val.products != null) {
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
                        <div className="col-3 text-left">
                          <h6>No</h6>
                          <h6>Nama Product</h6>
                          <h6>Price</h6>
                          <h6>Quantity</h6>
                          <h6>Total Price</h6>
                        </div>
                        <div className="col-4 text-left">
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
              } else {
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
                          <img src={val.paket.imagePaket} alt="" style={{ height: "120px", border: "1px solid black" }} />
                        </div>
                        <div className="col-3 text-left">
                          <h6>No</h6>
                          <h6>Nama Paket</h6>
                          <h6>Price</h6>
                          <h6>Quantity</h6>
                          <h6>Total Price</h6>
                        </div>
                        <div className="col-4 text-left">
                          <h6>: <span style={{ fontWeight: "normal" }}>{index + 1}</span></h6>
                          <h6>: <span style={{ fontWeight: "normal" }}>{val.paket.paketName}</span></h6>
                          <h6>: <span style={{ fontWeight: "normal" }}>
                            {" "}
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(val.paket.paketPrice)}
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
            }
            )}
          </>
        </>
      );
    });
  };

  render() {
    return (
      <>
        <div className="container py-4">
          <div className="dashboard">
            <caption className="p-3">
              <h2>Transaction</h2>
            </caption>
            <div className="d-flex justify-content-center">
              <ButtonUI
                className={`nav-atas-btn ${
                  this.state.status == "pending" ? "active" : null
                  } `}
                type="outlined"
                onClick={() => this.getPaymentsList("pending")}
              >
                Pending
                        </ButtonUI>
              <ButtonUI
                className={`nav-atas-btn ${
                  this.state.status == "success" ? "active" : null
                  } ml-4`}
                type="outlined"
                onClick={() => this.getPaymentsList("success")}
              >
                Success
                        </ButtonUI>
              <ButtonUI
                className={`nav-atas-btn ${
                  this.state.status == "reject" ? "active" : null
                  } ml-4`}
                type="outlined"
                onClick={() => this.getPaymentsList("reject")}
              >
                Reject
                        </ButtonUI>
              <ButtonUI
                className={`nav-atas-btn ${
                  this.state.status == "rejectPermanent" ? "active" : null
                  } ml-4`}
                type="outlined"
                onClick={() => this.getPaymentsList("rejectPermanent")}
              >
                Reject Permanent
                        </ButtonUI>
            </div>
            <Table className="dashboard-table">
              <thead>
                <tr className="text-center ">
                  <th>No.</th>
                  <th>Username</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Bukti Trf</th>
                  <th>Date Transaksi</th>
                  {this.state.status == "success" ?
                    <th>Date Transaksi Success</th>
                    : null
                  }
                  {this.state.status == "reject" ?
                    <th>Date Transaksi Reject</th>
                    : null
                  }
                  {this.state.status != "success" && this.state.status != "rejectPermanent" ?
                    <th>Action</th>
                    : null
                  }
                </tr>
              </thead>
              <tbody>{this.renderProductList()}</tbody>
            </Table>

          </div>

        </div >

        <div className="text-center mb-4">
          Showing Page {this.state.currentPage} of {this.state.totalPages}
        </div>
        <div className="row justify-content-center mt-3 pt-2">
          <ButtonUI disabled={this.state.currentPage === 1 ? true : false}
            onClick={this.firstPage}><FontAwesomeIcon icon={faFastBackward} />First</ButtonUI>
          <ButtonUI disabled={this.state.currentPage === 1 ? true : false}
            onClick={this.prevPage}><FontAwesomeIcon icon={faStepBackward} />Prev</ButtonUI>
          <FormControl className={"page-num bg-light"} name="currentPage" value={this.state.currentPage}
            onChange={this.changePage} />
          <ButtonUI disabled={this.state.currentPage === this.state.totalPages ? true : false}
            onClick={this.nextPage}><FontAwesomeIcon icon={faStepForward} />Next</ButtonUI>
          <ButtonUI disabled={this.state.currentPage === this.state.totalPages ? true : false}
            onClick={this.lastPage}><FontAwesomeIcon icon={faFastForward} />Last</ButtonUI>
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
      </>
    );
  }


}

export default AdminPayments;

