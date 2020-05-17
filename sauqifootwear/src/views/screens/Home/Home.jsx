import React from "react";
import { Link } from "react-router-dom";
import { Carousel, CarouselControl, CarouselItem } from "reactstrap";
import "./Home.css";
import sauqiOriginalFootwear from "../../../assets/images/Showcase/1.jpg";
import sauqiDiskon from "../../../assets/images/Showcase/2.jpg";
import videoSauqi from "../../../assets/video/videoSauqiUtama.mp4";
import sauqiIklan1 from "../../../assets/images/Showcase/3.jpg"
import sauqiIklan2 from "../../../assets/images/Showcase/4.jpg"
import sauqiIklan3 from "../../../assets/images/Showcase/5.jpg"
import sauqiIklan4 from "../../../assets/images/Showcase/6.jpeg"

const dummy = [
    {
        image: sauqiOriginalFootwear,
        id: 1,
    },
    {
        image: sauqiDiskon,
        id: 2,
    }
];

class Home extends React.Component {
    state = {
        activeIndex: 0,
        animating: false,
        bestSellerData: [],
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
                                    <img src={image} alt="" style={{ height: "720px" }} />
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

                <div className="container pt-4">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="thumbnail">
                                <a href="">
                                    <img src={sauqiIklan1} alt="" className="img" style={{ height: "636px", width: "550px" }} />
                                    <div className="caption">
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="thumbnail">
                                <a href="">
                                    <img src={sauqiIklan2} alt="" className="img" style={{ height: "350px", width: "565px" }} />
                                    <div className="caption">
                                    </div>
                                </a>
                            </div>
                            <div className="row pt-3">
                                <div className="col-md-6">
                                    <div className="thumbnail">
                                        <a href="">
                                            <img src={sauqiIklan3} alt="" className="img" style={{ height: "270px", width: "280px" }} />
                                            <div className="caption">
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="thumbnail">
                                        <a href="">
                                            <img src={sauqiIklan4} alt="" className="img" style={{ height: "270px", width: "280px" }} />
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
                        <div style={{ border: "5px solid black", "border-radius": "15px" }}>
                            <div className="btn-group btn-group-lg " role="group" style={{ padding: "5px" }}>
                                <button type="button" className="btn btn-light " ><Link to="/" style={{ color: "inherit" }} onClick={() => this.getBestSellerData()}>
                                    <h6 className="mx-4 font-weight-bold">ALL</h6>
                                </Link></button>
                                <button type="button" className="btn btn-light"><Link to="/" style={{ color: "inherit" }} onClick={() => this.getBestSellerData("Boots")}>
                                    <h6 className="mx-4 font-weight-bold">BOOTS</h6>
                                </Link></button>
                                <button type="button" className="btn btn-light"><Link to="/" style={{ color: "inherit" }} onClick={() => this.getBestSellerData()}>
                                    <h6 className="mx-4 font-weight-bold">CASUAL</h6>
                                </Link></button>
                            </div>
                        </div>
                    </div>
                    </linebutton>
                    <h2 className="text-center font-weight-bolder">SAUQI Footwear Original Leather Shoes</h2>
                    <h2 className="text-center">LIST PRODUK PRODUK</h2>
                    <div className="d-flex flex-row justify-content-center  pt-4">
                        <video src={videoSauqi} width="600" height="300" controls="controls" autoplay="true" />
                    </div>
                    <h4 className="text-justify mt-5 a" style={{ "text-indent": "50px" }}>Sepatu Berkualitas dan Awet dari Sauqi Footwear Melihat kualitas dan keawetan yang ditawarkan, kamu tidak perlu waktu lama ketika memutuskan untuk beli sepatu kulit Sauqi Footwear asli terbaru di situs kami Sauqi.com karena banyak keuntungan yang akan kamu dapatkan. Kamu juga akan mendapatkan berbagai kemudahan, salah satunya adalah cara pembayaran, yang bisa dilakukan dari mana saja dan kapan saja. Asalkan kamu mempunyai sambungan internet dari blibli.com yang Jual sepatu kulit Sauqi Footwear asli online dan mengetahui berbagai cara untuk memeasannya. Jangan lupa juga untuk mengetahui lebih banyak tentang harga sepatu kulit Sauqi Footwear asli sebelum kamu memutuskan untuk membelinya. Karena biasanya kamu baru akan menyesali ketika barang tersebut telah sampai di rumah.</h4>
                </div>


            </>

        )
    }

}

export default Home;