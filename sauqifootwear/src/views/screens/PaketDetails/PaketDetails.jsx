import React from "react"
import TextField from "../../components/TextField/TextField"
import ButtonUI from "../../components/Button/Button"
import { connect } from 'react-redux'
import Cookie from 'universal-cookie'
import { Redirect } from "react-router-dom";
import Axios from 'axios'
import swal from 'sweetalert';
import "./PaketDetails.css"
import { qtyCartHandler } from "../../../redux/actions";

const API_URL = `http://localhost:8080`;

class PaketDetails extends React.Component {
  state = {
    paketData: {
      imagePaket: "",
      paketName: "",
      paketPrice: 0,
      ProductSatuan: 0,
      reviewPaket: "",
      id: 0,
      cartDataUser: [],
      paketDetails: [],
    },
  }

  addToCartHandler = () => {
    if (this.props.user.id < 1) {
      swal(
        "Sorry :(",
        "You have not login yet, please login before add your item",
        "error"
      );
    } else {
      Axios.get(`${API_URL}/carts/user/${this.props.user.id}`)
        .then((res) => {
          console.log(res.data)
          this.setState({ cartDataUser: res.data });
          let checkItems = this.state.cartDataUser.findIndex((val) => {
            if(val.paket != null){
              return (
                val.paket.id == this.state.paketData.id 
              )
            }
          })
          if (checkItems == -1) {
            Axios.post(`${API_URL}/carts/addCartPaket/${this.props.user.id}/${this.state.paketData.id}`,
              {
                quantity: 1,
              }
            )
              .then((res) => {
                console.log(res.data);
                this.getPaketDataHandler()
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
            Axios.put(`${API_URL}/carts/updateQtyPaket/${this.state.cartDataUser[checkItems].id}/${this.state.paketData.id}`)
              .then((resSameData) => {
                console.log(resSameData)
                this.getPaketDataHandler()
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    }
  };

  getPaketDataHandler = () => {
    Axios.get(`${API_URL}/paket/${this.props.match.params.paketId}`)
      .then((res) => {
        this.setState({ paketData: res.data})
        console.log(this.state.paketData)
        this.props.onQtyCartHandler(this.props.user.id);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getPaketDataHandler()
  }

  render() {
    const { paketName, imagePaket, paketPrice, reviewPaket, stock, paketDetails } = this.state.paketData
    let hargaSatuan = 0
    return (
      <div className="container">
        <div className="row mt-4 pt-4">
          <div className="col-6 text-center">
            <img
              style={{ width: "100%", objectFit: "contain", height: "500px" }}
              src={imagePaket}
              alt=""
            />
          </div>
          <div className="col-6 d-flex flex-column justify-content-center">
            <h3>{paketName}</h3>
            {/* <span>Tersedia {stock} Pcs</span> */}
            <span>Isi Paket terdiri dari :</span>
            <div>
              {
                paketDetails.map((val, idx) => {
                  {hargaSatuan += val.products.price}
                  return (
                    <>
                      <div className="row">
                        <div className="col-6">
                          <span style={{ fontWeight: "normal" }}> {idx+1}.   {val.products.productName} </span>
                        </div>
                        <div className="col-6">
                          <span>
                            {
                              new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(val.products.price)
                            }
                          </span>
                        </div>
                      </div>
                    </>
                  )
                })
              }
            </div>
            <h4 className="pt-3">
              Dengan Harga Khusus Paket 
            </h4>
            <div className="row">
            <strike>

            <h4>
              {
                new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(hargaSatuan)
              }
            </h4>
            </strike>
            <h6>
              {
                new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(paketPrice)
              }
            </h6>
            </div>
            <p className="mt-4">{reviewPaket}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaketDetails);
