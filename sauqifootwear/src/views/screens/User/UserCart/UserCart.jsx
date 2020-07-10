import React from "react";
import "./UserCart.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ButtonUI from "../../../components/Button/Button";
import TextField from "../../../components/TextField/TextField";
import { logoutHandler , qtyCartHandler} from "../../../../redux/actions";
import { UncontrolledCollapse, Button, CardBody, Card, Badge } from 'reactstrap';
import { Table, Alert } from 'reactstrap'

import swal from "sweetalert";

const API_URL = `http://localhost:8080`;

class UserCart extends React.Component {
  state = {
    itemCart: [],
    kondisiCheckout: true,
    totalPrice: 0,
    status: "pending",
    checOutItem: "",
    quantity: "",
    datePayments: new Date(),
    jasaPengiriman: "0"
  }

  inputHandler = (e, field) => {
    this.setState({ [field]: e.target.value })
  }

  componentDidMount() {
    this.getItemCart();
  }

  checkboxHandler = (e, idx) => {
    const { checked } = e.target
    if (checked) {
      this.setState({ checOutItem: [...this.state.checOutItem, idx] })
    } else {
      this.setState({
        checOutItem: [
          ...this.state.checOutItem.filter(val => val !== idx)
        ]
      })
    }
  }

  deleteItemCart = (id) => {
    Axios.delete(`${API_URL}/carts/${id}`)
        .then((res) => {
            console.log(res);
            swal('Delete to cart', 'Your item has been deleted from your cart', 'success')
            this.getItemCart();
            this.props.onQtyCartHandler(this.props.user.id);
            // Axios.get(`${API_URL}/carts`, {
            //     params: {
            //       userId: this.props.user.id,
            //       _expand: "product"
            //     }
            //   })
            // .then((res) => {
            //     this.props.onQtyCartHandler(res.data.length)
            // })
            // .catch((err) => {
            //     console.log(err)
            // })
        })
        .catch((err) => {
            console.log(err);
        });
}


  getItemCart = () => {
    Axios.get(`${API_URL}/carts/user/${this.props.user.id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          itemCart: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderCarts = () => {
    const { itemCart } = this.state;
    return itemCart.map((val, idx) => {
      return (
        <tr>
          <td>{idx + 1}</td>
          <td>{val.product.productName}</td>
          <td>{
            new Intl.NumberFormat("id-ID",
              { style: "currency", currency: "IDR" }).format(val.product.price)
          }
          </td>
          <td>{val.quantity}</td>
          <td>
            {val.product.categories.map((value, idx) => {
              if (idx == 0) {
                return (
                  <span style={{ fontWeight: "normal" }}> {value.nama} </span>
                )
              } else {
                return (
                  <span style={{ fontWeight: "normal" }}>, {value.nama} </span>
                )
              }
            })}
          </td>
          <td><img src={val.product.image} alt="" style={{ height: "50px" }} /></td>
          <td>
            <input
              type="checkbox"
              onChange={(e) => this.checkboxHandler(e, idx)}
              className="form-control" />
          </td>
          <th scope="row">
            <div className="d-flex justify-content-center">
              <ButtonUI
                type="contained"
                onClick={() => this.deleteItemCart(val.id)}>
                Delete
                    </ButtonUI>
            </div>
          </th>
        </tr>
      )
    })
  }

  renderCheckout = () => {
    let totalPriceItems = 0
    const { itemCart } = this.state;
    return itemCart.map((val, idx) => {
      totalPriceItems = (val.quantity * val.product.price)
      return (
        <>
          <tr>
            <td>{idx + 1}</td>
            <td>{val.product.productName}</td>
            <td>{val.quantity}</td>
            <td>{val.product.category}</td>
            <td>{
              new Intl.NumberFormat("id-ID",
                { style: "currency", currency: "IDR" }).format(totalPriceItems)
            }
            </td>
          </tr>

        </>
      )
    })
  }

  render() {
    return (
      <div className="container py-4">
        {this.state.itemCart.length > 0 ? (
          <>
            <Table hover size="sm">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th><div className="d-flex justify-content-center">Action</div></th>
                </tr>
              </thead>
              <tbody>
                {this.renderCarts()}
              </tbody>
            </Table>
            <div>
              <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }} type="contained">Checkout</Button>
            </div>
            {
              (this.state.kondisiCheckout) ?
                <div>
                  <UncontrolledCollapse toggler="#toggler">
                    <Card style={{ width: "530px" }}>
                      <CardBody>
                        <h4><Badge color="secondary">Saudara {this.props.user.username}, dimohon konfirmasi pembayaran</Badge></h4>
                        <Table striped size="sm" style={{ width: "500px" }}>
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>Product Name</th>
                              <th>Quantity</th>
                              <th>Category</th>
                              <th>Total Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.renderCheckout()}
                          </tbody>
                        </Table>
                        <div className="mt-6">
                          <p>Silahkan pilih metode pembayaran yang dapat dilakukan :</p>
                          <select
                            value={this.state.jasaPengiriman}
                            onChange={(e) => this.inputHandler(e, "jasaPengiriman")}
                          >
                            <option value="0" disabled="disabled">Jenis pengiriman</option>
                            <option value="100000">Instant :  100.000</option>
                            <option value="50000">Same Day : 50.000</option>
                            <option value="20000">Express : 20.000</option>
                            <option value="0">Economy : Free</option>
                          </select>
                        </div>
                        <h6>Total Price : {
                          new Intl.NumberFormat("id-ID",
                            { style: "currency", currency: "IDR" }).format(this.state.totalPrice + parseInt(this.state.jasaPengiriman))
                        } </h6>

                        <div className="d-flex justify-content-center">
                          <ButtonUI type="outlined" onClick={() => this.confirmBtn()}>Confirm</ButtonUI>
                        </div></CardBody>
                    </Card>
                  </UncontrolledCollapse>
                </div> : null
            }
          </>
        ) : (
            <Alert>
              Your cart is empty! <Link to="/">Go shopping</Link>
            </Alert>
          )}

      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  onQtyCartHandler: qtyCartHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCart);