import React from "react"
import ButtonUI from "../../../components/Button/Button"
import Axios from 'axios'
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { Table } from "reactstrap";
import "./UserHistory.css";

const API_URL = `http://localhost:8080`;

class UserHistory extends React.Component {
  state = {
    transaksiDetails: [],
    transactionId: "",
    listDetail: [],
    activeProducts: [],
    status: "pending"
  }

  getDataTransaksi = (val) => {
    Axios.get(`${API_URL}/transaction/user/${this.props.user.id}?status=${val}`)
      .then((res) => {
        console.log(res.data)
        this.setState({
          status : val,
          listDetail: res.data,
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    {this.getDataTransaksi(this.state.status)}
  }

  renderDataTransaksi = () => {
    const { listDetail } = this.state
    return listDetail.map((val, idx) => {
      if (val.status == "pending") {
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
                <div className="d-flex flex-column align-items-center">
                  <ButtonUI
                    onClick={() => {
                      console.log(idx, this.state.activeProducts.includes(idx))
                      console.log(val)
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
                    }}
                  >
                    Details
                    </ButtonUI>
                </div>
              </td>
            </tr>
            {val.transactionDetails.map((val, index) => {
              return (
                <tr
                  className={`collapse-item ${
                    this.state.activeProducts.includes(idx) ? "active" : null
                    }`}
                >
                  <td colSpan={3}>
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
            }
            )}
          </>
        )
      }
    })
  }

  render() {
    return (
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};


export default connect(mapStateToProps)(UserHistory)
