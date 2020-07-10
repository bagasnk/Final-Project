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
        cartDataUser: [],
        },
    }

    addToCartHandler = () => {
      if (this.props.user.id < 1) {
        swal(
          "Sorry :(",
          "You have not login yet, please login before add your item",
          "error"
        );
      }else{
        Axios.get(`${API_URL}/carts/user/${this.props.user.id}`)
        .then((res) => {
        this.setState({ cartDataUser: res.data });
        let checkItems = this.state.cartDataUser.findIndex((val) => {
          return (
            val.product.id == this.state.productData.id 
          )
        })
        if (checkItems == -1) {
          Axios.post(
            `${API_URL}/carts/addCart/${this.props.user.id}/${this.state.productData.id}`,
            {
              quantity: 1,
            }
          )
            .then((res) => {
              console.log(res.data);
              swal(
                "Add to cart",
                "New item has been added to your cart",
                "success"
              );
              this.props.onQtyCartHandler(this.props.user.id);
            })
            .catch((err) => {
              console.log(err);
            });

        } else {

          swal(
            "Add to cart",
            "Quantity item has been added to your cart",
            "success"
          );
          Axios.put(`${API_URL}/carts/updateQty/${this.state.cartDataUser[checkItems].id}`)
            .then((resSameData) => {
              console.log(resSameData)
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  };
    
    componentDidMount() {
        Axios.get(`${API_URL}/products/${this.props.match.params.productId}`)
            .then((res) => {
                this.setState({ productData: res.data })
                console.log(this.state.productData)
                this.props.onQtyCartHandler(this.props.user.id);

                // this.setState({ productData: { ...this.state.productData, ...res.data }})
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
