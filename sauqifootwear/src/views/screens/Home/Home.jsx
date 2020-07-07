import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Carousel, CarouselControl, CarouselItem } from "reactstrap";
import "./Home.css";
import ProductCard from "../../components/Cards/ProductCard";
import TextField from "../../components/TextField/TextField";
import ButtonUI from "../../components/Button/Button"

import Axios from "axios";
import gambar1 from "../../../assets/images/Showcase/Japanfair1.jpeg"
import gambar2 from "../../../assets/images/Showcase/Japanfair2.jpeg"
import gambar3 from "../../../assets/images/Showcase/Japanfair3.jpeg"
import contoh1 from "../../../assets/images/Showcase/products1.jpeg"
import contoh2 from "../../../assets/images/Showcase/products2.jpeg"
import contoh3 from "../../../assets/images/Showcase/products3.jpeg"
import contoh4 from "../../../assets/images/Showcase/products4.jpeg"

import { SearchAndFilterHandler } from "../../../redux/actions";


const API_URL = `http://localhost:8080`;

const dummy = [
  {
    image: gambar1,
    id: 1,
  },
  {
    image: gambar2,
    id: 2,
  },
  {
    image: gambar3,
    id: 3,
  }
];

class Home extends React.Component {
  state = {
    activeIndex: 0,
    animating: false,
    bestSellerData: [],
    bestSellerDataNew: [],
    bestSellerDataAll: [],
    categoryList: [],
    kondisiFilter: 0,
    categoriesNow: "All",
    productNameNow: "",
    maxPriceNow: 99999999,
    minPriceNow: 0,
    sortList: "asc",
    orderBy: "productName",
    activePage: "product"
  };

  renderCarouselItems = () => {
    return dummy.map(({ image, id }) => {
      return (
        <CarouselItem
          onExiting={() => this.setState({ animating: true })}
          onExited={() => this.setState({ animating: false })}
          key={id.toString()}
        >
          <div className="carousel-item-home">
            <div className="container position-relative">
              <div className="row d-block w-100">
                <div className="d-flex flex-row justify-content-center">
                  <img src={image} alt="" style={{ height: "690px" }} />
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>
      );
    });
  };
  nextHandler = () => {
    if (this.state.animating) return;
    let nextIndex =
      this.state.activeIndex === dummy.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });

  };

  prevHandler = () => {
    if (this.state.animating) return;
    let prevIndex =
      this.state.activeIndex === 0
        ? dummy.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: prevIndex });
  };

  getBestSellerData = () => {
    Axios.get(`${API_URL}/products`)
      .then((res) => {
        console.log(res.data)
        this.setState({
          bestSellerData: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getBestSellerPaketByFilterSort = () => {
  }

  getBestSellerDataByFilterSort = (val) => {
    if (val == "All") {
      Axios.get(`${API_URL}/products/${this.state.minPriceNow}/${this.state.maxPriceNow}/${this.state.orderBy}/${this.state.sortList}/?productName=${this.state.productNameNow}`)
        .then((res) => {
          console.log(res.data)
          this.setState({
            bestSellerDataNew: res.data
          })
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      Axios.get(`${API_URL}/products/${this.state.minPriceNow}/category/${this.state.maxPriceNow}/${this.state.orderBy}/${this.state.sortList}/?productName=${this.state.productNameNow}&nama=${val}`)
        .then((res) => {
          console.log(res.data)
          this.setState({
            bestSellerDataNew: res.data
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  showCategory = () => {
    Axios.get(`${API_URL}/categories`)
      .then((res) => {
        this.setState({ categoryList: res.data });
      })
  }

  renderProducts = () => {
    return this.state.bestSellerDataNew.map(val => {
      return <ProductCard data={val} className='m-3' />
    })
  }

  renderPaket = () => {

  }

  componentDidMount() {
    this.getBestSellerDataByFilterSort(this.state.categoriesNow)
    this.showCategory();
  }

  inputNow = (e, form) => {
    this.setState({
      [form]: e
    })
  }

 PageHandler = () => {
   if(this.state.activePage == "product"){
     return(
        this.renderProducts()
      )
      }else if(this.state.activePage == "paket"){
      return(
        this.renderPaket()
      )  
   }  
   
 }
  render() {
    return (
      <>
        <div>
          <Carousel
            className="carousel-item-home-bg "
            next={this.nextHandler}
            previous={this.prevHandler}
            activeIndex={this.state.activeIndex}
            href="#carouselExampleIndicators"
          >
            {this.renderCarouselItems()}
            <CarouselControl
              directionText="Previous"
              direction="prev"
              onClickHandler={this.prevHandler}
            />
            <CarouselControl
              directionText="Next"
              direction="next"
              onClickHandler={this.nextHandler}
            />
          </Carousel>
        </div>

        <h2 className="text-center font-weight-bolder mt-4">Japan Fair by JETRO</h2>

        <h4 className="text-center" style={{ "text-indent": "50px" }}>
            Hanya buka Senin- Jumat 09.00-17.00.
            Order di atas pukul 13.30 = proses besok.
            Managed by TCCM</h4>
        <div className="container pt-4">
          <div className="row">
            <div className="col-md-6">
              <div className="thumbnail" style={{border : "3px solid yellow"}}>
                <a href="">
                  <img src={contoh1} alt="" className="img" style={{ height: "636px", width: "535px" }} />
                  <div className="caption">
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="thumbnail" style={{border : "3px solid yellow"}}>
                <a href="">
                  <img src={contoh2} alt="" className="img" style={{ height: "350px", width: "535px" }} />
                  <div className="caption">
                  </div>
                </a>
              </div>
              <div className="row pt-3">
                <div className="col-md-6">
                  <div className="thumbnail" style={{border : "3px solid yellow"}}>
                    <a href="">
                      <img src={contoh3} alt="" className="img" style={{ height: "270px", width: "250px" }} />
                      <div className="caption">
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="thumbnail" style={{border : "3px solid yellow"}}>
                    <a href="">
                      <img src={contoh4} alt="" className="img" style={{ height: "270px", width: "250px" }} />
                      <div className="caption">
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <linebutton className="pt-5">
            <div className="d-flex justify-content-center flex-row align-items-center my-3 ">
              <div style={{ border: "5px solid red", "border-radius": "15px" }}>
                <div className="btn-group btn-group-lg" role="group" style={{ padding: "5px" }}>
                  <div className="col-3 mt-1">
                    <TextField
                      placeholder="Nama Product"
                      onChange={(e) => this.setState({ productNameNow: e.target.value })}
                      onKeyUp={() => this.getBestSellerDataByFilterSort(this.state.categoriesNow)}
                    />
                  </div>
                  <div className="col-2 mt-1">
                    <TextField
                      placeholder="Min price"
                      onChange={(e) => this.setState({ minPriceNow: +e.target.value })}
                      onKeyUp={() => this.getBestSellerDataByFilterSort(this.state.categoriesNow)}
                    />
                  </div>
                  <h1>-</h1>
                  <div className="col-2 mt-1">
                    <TextField
                      placeholder="Max price"
                      onChange={(e) => this.setState({ maxPriceNow: +e.target.value })}
                      onKeyUp={() => this.getBestSellerDataByFilterSort(this.state.categoriesNow)}
                    />
                  </div>
                  <select
                    className="custom-text-input h-100 pl-3 mt-1 pt-3"
                    onClick={(e) => { this.getBestSellerDataByFilterSort(this.state.categoriesNow) }}
                    onChange={(e) => this.setState({ categoriesNow: e.target.value })}>
                    <option value="All" >All Category</option>
                    {this.state.categoryList.map((val) => {
                      return (
                        <option value={val.nama}>{val.nama}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
          </linebutton>
          <br />
          <div className="container">
            {/* BEST SELLER SECTION */}
            <h2 className="text-center font-weight-bolder mt-2 mb-4">BEST SELLER</h2>

            <div style={{ marginTop: "70px" }}>
                    <div className="mt-4">
                        <div className="d-flex justify-content-center">
                            <ButtonUI
                                className={`nav-atas-btn ${
                                    this.state.activePage == "product" ? "active" : null
                                    } `}
                                type="outlined"
                                onClick={() => this.setState({ activePage : "product"})}
                            >
                                Products
                        </ButtonUI>
                            <ButtonUI
                                className={`nav-atas-btn ${
                                    this.state.activePage == "paket" ? "active" : null
                                    } ml-4`}
                                type="outlined"
                                onClick={() => this.setState({ activePage : "paket"})}
                            >
                                Paket Products
                        </ButtonUI>
                        </div>
                    </div>
                    <div className="mt-4">
                        
                    </div>
                </div>
            <div className="row d-flex flex-wrap justify-content-center">
                {/* {this.renderProducts()} */}
                {this.PageHandler()}
            </div>
            <center>
            <div className="d-flex flex row mt-5" style={{ width: "450px" }}>
              <h6 className="pt-2">Sort By:</h6>
              <select onClick={() => this.getBestSellerDataByFilterSort(this.state.categoriesNow)} onChange={(e) => this.setState({ orderBy: e.target.value })} style={{ width: "200px" }} className="form-control ml-4" name="Sort">
                <option value="productName">Product Name</option>
                <option value="price">Price</option>
              </select> <h3 className="ml-3"> -</h3>
              <select onClick={() => this.getBestSellerDataByFilterSort(this.state.categoriesNow)} onChange={(e) => this.setState({ sortList: e.target.value })} className="form-control ml-4" style={{ width: "100px" }} name="sortList">
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>
            </div>
          </center>
          </div>
          <h4 className="text-justify mt-5 text-center" style={{ "text-indent": "50px" }}>
            Japan Fair Official Shop adalah akun resmi dari JETRO di Platform Shopee.
          </h4>
        </div>
      </>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    search: state.search,
  };
};
const mapDispatchToProps = {
  onSearchFilter: SearchAndFilterHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);