import React from "react";
import "./AdminReports.css";
import { Bar } from "react-chartjs-2"
import Axios from "axios";
import TextField from "../../../components/TextField/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepBackward, faFastBackward, faStepForward, faFastForward, faTimes } from "@fortawesome/free-solid-svg-icons/";
import { Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl } from "react-bootstrap";
const API_URL = `http://localhost:8080/`;

class AdminReports extends React.Component {
  state = {
    objek: {
      labels: [],
      datasets: [
        {
          data: []
        }
      ]
    },
    categoryList: [],
    categoriesNow: "All",
    productNameNow: "",
    maxPriceNow: 99999999,
    minPriceNow: 0,
    sortList: "asc",
    orderBy: ""
  }

  showCategory = () => {
    Axios.get(`${API_URL}/categories`)
      .then((res) => {
        this.setState({ categoryList: res.data });
      })
  }

  componentDidMount() {
    this.showChartData(this.state.categoriesNow);
    this.showCategory();
  }

  showChartData = (val) => {
    this.setState({
      objek: {
        labels: [],
        datasets: [
          {
            data: []
          }
        ]
      },
    })
    if (val == "All") {
      Axios.get(`${API_URL}/products/report/${this.state.minPriceNow}/${this.state.maxPriceNow}/?productName=${this.state.productNameNow}&sortList=${this.state.sortList}`)
        .then((res) => {
          console.log(res.data)
          console.log("INI TANPA CATEGORY")
          res.data.map((value, idx) => {
            this.setState({
              objek: {
                labels: [...this.state.objek.labels, value.productName],
                datasets: [
                  {
                    label: "sold",
                    backgroundColor: "blue",
                    data: [...this.state.objek.datasets[0].data, value.sold]
                  }
                ]
              }
            })
          })
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      Axios.get(`${API_URL}/products/report/${this.state.minPriceNow}/category/${this.state.maxPriceNow}?productName=${this.state.productNameNow}&nama=${val}&sortList=${this.state.sortList}`)
        .then((res) => {
          console.log("INI CATEGORY")

          res.data.map((value) => {
            this.setState({
              objek: {
                labels: [...this.state.objek.labels, value.productName],
                datasets: [
                  {
                    label: "Sold",
                    backgroundColor: "blue",
                    data: [...this.state.objek.datasets[0].data, value.sold]
                  }
                ]
              }
            })
          })
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  renderChart = () => {
    return (
      <Bar
        data={this.state.objek}
        options={{
          title: {
            display: true,
            text: "Chart Penjualan",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: 'right'
          },

        }}
      />
    )
  }

  render() {
    return (
      <>
        <linebutton className="pt-5">
          <div className="d-flex justify-content-center flex-row align-items-center my-3 ">
            <div style={{ border: "5px solid red", "border-radius": "15px" }}>
              <div className="btn-group btn-group-lg" role="group" style={{ padding: "5px" }}>
                <div className="col-3 mt-1">
                  <TextField
                    placeholder="Nama Product"
                    onChange={(e) => this.setState({ productNameNow: e.target.value })}
                    onKeyUp={() => this.showChartData(this.state.categoriesNow)}
                  />
                </div>
                <div className="col-2 mt-1">
                  <TextField
                    placeholder="Min price"
                    onChange={(e) => this.setState({ minPriceNow: +e.target.value })}
                    onKeyUp={() => this.showChartData(this.state.categoriesNow)}
                  />
                </div>
                <h1>-</h1>
                <div className="col-2 mt-1">
                  <TextField
                    placeholder="Max price"
                    onChange={(e) => this.setState({ maxPriceNow: +e.target.value })}
                    onKeyUp={() => this.showChartData(this.state.categoriesNow)}
                  />
                </div>
                <select
                  className="custom-text-input h-100 pl-3 mt-1 pt-3"
                  onClick={(e) => { this.showChartData(this.state.categoriesNow) }}
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
        <center>
          <div className="mt-3 w-75">
            {this.renderChart()}
          </div>
        </center>
        <center>
          <select className="block-btn" onClick={() => this.showChartData(this.state.categoriesNow)} onChange={(e) => this.setState({ sortList: e.target.value })} className="form-control ml-4" style={{ width: "100px" }} name="sortList">
            <option value="asc">terkecil - terlaris</option>
            <option value="desc">terlaris - terkecil</option>
          </select>
        </center>
      </>
    )
  }
}

export default AdminReports
