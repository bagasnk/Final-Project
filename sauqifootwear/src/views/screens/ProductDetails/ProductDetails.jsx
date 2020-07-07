import React from "react"
import TextField from "../../components/TextField/TextField"
import ButtonUI from "../../components/Button/Button"
import { connect } from 'react-redux'
import Cookie from 'universal-cookie'
import { Redirect } from "react-router-dom";
import Axios from 'axios'
import swal from 'sweetalert';
import "./ProductDetails.css"
import {qtyCartHandler} from "../../../redux/actions";

const API_URL = `http://localhost:8080`;

class ProductDetails extends React.Component {
    state = {
      productData: {
        image: "",
        productName: "",
        price: 0,
        description: "",
        id: 0,
        categories: [],
        },
    }

    addToCartHandler = () => {
        Axios.get(`${API_URL}/carts`, {
            params: {
                productId: this.state.productData.id,
                userId: this.props.user.id,
            }
        })
            .then((res) => {
                if (res.data.length !== 0) {
                    Axios.patch(`${API_URL}/carts/${res.data[0].id}`, {
                        quantity: res.data[0].quantity + 1
                    })
                        .then((res) => {
                            console.log(res.data)
                            swal("Add to carts", "Your item has been added to your cart", "success");
                        })
                } else {
                    Axios.post(`${API_URL}/carts`, {
                        userId: this.props.user.id,
                        productId: this.state.productData.id,
                        quantity: 1,
                    })
                        .then((res) => {
                            console.log(res);
                            swal("Add to carts", "Your item has been added to your cart", "success");
                            Axios.get(`${API_URL}/carts`, {
                                params: {
                                  userId: this.props.user.id,
                                  _expand: "product"
                                }
                              })
                            .then((res) => {
                                this.props.onQtyCartHandler(res.data.length)
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            })
    };

    addToWishlistHandler = () => {
        Axios.get(`${API_URL}/wishlist`, {
            params: {
                productId: this.state.productData.id,
                userId: this.props.user.id,
            }
        })
            .then((res) => {
                if (res.data.length !== 0) {
                    swal("Add to wishlist", "Your item is already in your Wishlist", "error");
                } else {
                    Axios.post(`${API_URL}/wishlist`, {
                        userId: this.props.user.id,
                        productId: this.state.productData.id,
                    })
                        .then((res) => {
                            console.log(res);
                            swal("Add to Wishlist", "Your item has been added to your Wishlist", "success");
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }
            )
            .catch((err) => {
                console.log(err)
            })
    };

    componentDidMount() {
        Axios.get(`${API_URL}/products/${this.props.match.params.productId}`)
            .then((res) => {
                this.setState({ productData: res.data })
                console.log(this.state.productData)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const { productName, image, price, desc, categories, id } = this.state.productData
        return (
            <div className="container">
                <div className="row mt-4 pt-4"> 
                    <div className="col-6 text-center">
                        <img
                            style={{ width: "100%", objectFit: "contain", height: "500px" }}
                            src={this.state.productData.image}
                            alt=""
                        />
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center">
                        <h3>{productName}</h3>
                        <div className="d-flex flex-row">
                        {
                          categories.map((val,idx) => {
                            if (idx == 0) {
                              return (
                                <span style={{ fontWeight: "normal" }}> {val.nama} </span>
                              )
                            } else {
                              return (
                                <span style={{ fontWeight: "normal" }}>, {val.nama} </span>
                              )
                            }
                          })
                        }

                        </div>
                        <h4>
                            {
                                new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price)
                            }
                        </h4>
                        <p className="mt-4">{desc}</p>
                        <div className="d-flex mt-4">
                            <ButtonUI onClick={this.addToCartHandler}>Add to Cart</ButtonUI>
                            
                            <ButtonUI onClick={this.addToWishlistHandler} className="ml-4" type="outlined">Add to WishList</ButtonUI>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = {
    onQtyCartHandler: qtyCartHandler,
  };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
