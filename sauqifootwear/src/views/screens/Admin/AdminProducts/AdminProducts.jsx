import React from "react";
import "./AdminProducts.css";
import { Modal, ModalHeader, ModalBody, Input } from "reactstrap";
import Axios from "axios";
import ButtonUI from "../../../components/Button/Button";
import TextField from "../../../components/TextField/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepBackward, faFastBackward, faStepForward, faFastForward, faTimes } from "@fortawesome/free-solid-svg-icons/";
import { Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl } from "react-bootstrap";


import swal from "sweetalert";
import { faXingSquare } from "@fortawesome/free-brands-svg-icons";


const API_URL = `http://localhost:8080`;

class AdminProducts extends React.Component {
  state = {
    productList: [],
    categoryList: [],
    productListALL: [],
    productNow: "",
    categoriesNow: "",

    createForm: {
      productName: "",
      price: null,
      image: "",
      description: "",
      stock: null,
    },

    createCategoriesForm: {
      nama: ""
    },

    editForm: {
      id: 0,
      productName: "",
      price: 0,
      image: "",
      description: "",
      stock: 0,
    },
    categoriesList: "",
    selectImage: null,
    activeProducts: [],
    modalOpen: false,
    currentPage: 0,
    itemsPerPage: 5,
    totalPages: 0,
    totalElements: 0,
    productNameNow: "",
  };

  changePage = event => {
    let targetPage = parseInt(event.target.value)
    if (this.state.activePage == "product") {
      this.getBestSellerDataByFilterSort(this.state.categoriesNow, targetPage);
    } else {
      this.getBestSellerPaketByFilterSort(this.state.categoriesNow, targetPage);
    }
    this.setState({
      [event.target.name]: targetPage
    })
  }


  // button untuk balik ke page pertama 
  firstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      this.getProductList(firstPage)
    }
  }

  // button untuk kembali ke page sebelumnya
  prevPage = () => {
    let prevPage = 1;
    if (this.state.currentPage > prevPage) {
      this.getProductList(this.state.currentPage - prevPage)
    }
  }

  // button untuk maju ke page selanjutnya
  nextPage = () => {
    if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.itemsPerPage)) {
      this.getProductList(this.state.currentPage + 1)
    }
  }

  // button untuk maju ke page terakhir
  lastPage = () => {
    let condition = Math.ceil(this.state.totalElements / this.state.itemsPerPage)
    if (this.state.currentPage < condition) {
      this.getProductList(condition)
    }
  }


  getProductList = (currentPage) => {
    currentPage -= 1
    Axios.get(`${API_URL}/products/pages?productName=${this.state.productNameNow}&page=${currentPage}&size=5`)
      .then((res) => {
        this.setState({
          productList: res.data.content,
          totalPages: res.data.totalPages,
          totalElements: res.data.totalElements,
          currentPage: res.data.number + 1
        });
        console.log(res.data)
        //console.log(this.state.productList[0].categories)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getProductListALL = () => {
    Axios.get(`${API_URL}/products`)
      .then((res) => {
        this.setState({
          productListALL: res.data

        });
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderProductList = () => {
    return this.state.productList.map((val, idx) => {
      const { id, productName, price, categories, image, description, stock } = val;
      return (
        <>
          <tr
            onClick={() => {
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
            }}>
            <td> {id} </td>
            <td> {productName} </td>
            <td> {stock} </td>
            <td>
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(price)}{" "}
            </td>
          </tr>
          <tr
            className={`collapse-item ${
              this.state.activeProducts.includes(idx) ? "active" : null
              }`}
          >
            <td className="" colSpan={3}>
              <div className="d-flex justify-content-around align-items-center">
                <div className="d-flex">
                  <img src={image} alt="" />
                  <div className="d-flex flex-column ml-4 justify-content-center">
                    <h5>{productName}</h5>
                    <h6 className="mt-2">
                      Category:
                    {categories.map((value, idx) => {

                      return (
                        <div className="row">
                          <div className="col-6">
                            <span className="ml-2" style={{ fontWeight: "normal" }}> {value.nama} </span>
                          </div>
                          <div className="col-6">
                            <FontAwesomeIcon icon={faTimes} onClick={(_) => this.deleteCategoriesBtnHandler(id, value.id)} />
                          </div>
                        </div>
                      )
                    }
                    )}
                    </h6>
                    <h6>
                      Price:
                      <span style={{ fontWeight: "normal" }}>
                        {" "}
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(price)}
                      </span>
                    </h6>
                    <h6>
                      Description:
                     <span style={{ fontWeight: "normal" }}> {description}</span>
                    </h6>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <ButtonUI
                    onClick={(_) => this.editBtnHandler(idx)}
                    type="contained"
                  >
                    Edit
                  </ButtonUI>
                  <ButtonUI className="mt-3" onClick={(_) => this.deleteBtnHandler(id)}
                    type="textual">
                    Delete
                  </ButtonUI>
                </div>
              </div>
            </td>
          </tr>
        </>
      );
    });
  };

  inputHandler = (e, field, form) => {
    let { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });
  };

  inputNow = (e, form) => {
    this.setState({
      [form]: e
    })
  }

  fileChangeHandler = (e) => {
    this.setState({ selectImage: e.target.files[0] });
  };

  createProductHandler = () => {

    let formData = new FormData();
    if (this.state.selectImage) {
      formData.append(
        "file",
        this.state.selectImage,
        this.state.selectImage.name
      );
    }
    formData.append("productData", JSON.stringify(this.state.createForm));
    console.log(this.state.createForm);
    console.log(JSON.stringify(this.state.createForm));

    Axios.post(`${API_URL}/products/addProduct`, formData)
      .then((res) => {
        swal("Success!", "Your item has been added to the list", "success");
        this.setState({
          createForm: {
            productName: "",
            price: null,
            description: "",
            stock: null,
          }
        });
        this.getProductList(this.state.currentPage);
      })
      .catch((err) => {
        swal("Error!", "Your item could not be added to the list", "error");
      });
  };

  addCategoriesToProduct = (val) => {
    console.log(this.state.productNow + " " + this.state.categoriesNow)
    Axios.get(`${API_URL}/products`)
      .then((res) => {
        Axios.post(`${API_URL}/products/${this.state.productNow}/categories/${this.state.categoriesNow}`)
          .then((res) => {
            swal("Success!", "Your Category has been added to Products", "success");
            console.log(res.data)
            this.getProductList(this.state.currentPage);
          })
          .catch((err) => {
            console.log(err)
          })
      })
  }

  createCategoryHandler = () => {
    Axios.post(`${API_URL}/categories`, this.state.createCategoriesForm)
      .then((res) => {
        swal("Success!", "Your categories has been added to the list", "success");
        this.setState({
          createCategoriesForm: {
            nama: "",
          },
        });
      })
      .catch((err) => {
        swal("Error!", "Your item could not be added to the list", "error");
      });
  }

  showCategory = () => {
    Axios.get(`${API_URL}/categories`)
      .then((res) => {
        this.setState({ categoryList: res.data });
      })
  }

  componentDidUpdate() {
    this.showCategory();
  }

  editBtnHandler = (idx) => {
    this.setState({
      editForm: {
        ...this.state.productList[idx],
      },
      modalOpen: true,
    });
  };

  deleteBtnHandler = (id) => {
    Axios.delete(`${API_URL}/products/${id}`)
      .then((res) => {
        swal("Success!", "Your item has been deleted", "success");
        this.getProductList(this.state.currentPage)
      })
      .then((err) => {
        console.log(err)
      })
  }

  deleteCategoriesBtnHandler = (productId, categoriesId) => {
    Axios.delete(`${API_URL}/products/${productId}/categories/${categoriesId}`)
      .then((res) => {
        swal("Success!", "Your item has been deleted", "success");
        this.getProductList(this.state.currentPage)
      })
      .then((err) => {
        console.log(err)
      })
  }

  editProductHandler = () => {
    let formData = new FormData();
    if (this.state.selectImage) {
      formData.append(
        "file",
        this.state.selectImage,
        this.state.selectImage.name
      );
    }

    formData.append("productData", JSON.stringify(this.state.editForm));
    Axios.put(
      `${API_URL}/products/edit/${this.state.editForm.id}`, formData)
      .then((res) => {
        swal("Success!", "Your item has been edited", "success");
        this.setState({ modalOpen: false });
        this.getProductList(this.state.currentPage);
      })
      .catch((err) => {
        swal("Error!", "Your item could not be edited", "error");
        console.log(err);
      });
  };
  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  componentDidMount() {
    this.getProductListALL();
    this.getProductList(this.state.currentPage);
    this.showCategory();
  }

  render() {
    return (
      <div className="container py-4">
        <div className="dashboard">
          <caption className="p-3">
            <h2>Products</h2>
          </caption>

          <div className="col-3 mb-2">
            <TextField
              placeholder="Nama Product"
              onChange={(e) => this.setState({ productNameNow: e.target.value })}
              onKeyUp={() => this.getProductList(this.state.currentPage)}
            />
          </div>

          <table className="dashboard-table">
            <thead>
              <tr>
                <th className="col-1">ID</th>
                <th className="col-5">Name</th>
                <th className="col-3">Stock</th>
                <th className="col-3">Price</th>
              </tr>
            </thead>
            <tbody>{this.renderProductList()}</tbody>
          </table>
          <div>
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

        </div>
        <div className="dashboard-form-container p-4">
          <caption className="mb-4 mt-2">
            <h2>Add Product</h2>
          </caption>
          <div className="row">
            <div className="col-8">
              <TextField
                value={this.state.createForm.productName}
                placeholder="Product Name"
                onChange={(e) => this.inputHandler(e, "productName", "createForm")}
              />
            </div>
            <div className="col-4">
              <TextField
                value={this.state.createForm.price}
                placeholder="Price"
                onChange={(e) => this.inputHandler(e, "price", "createForm")}
              />
            </div>
            <div className="col-12 mt-3">
              <textarea
                value={this.state.createForm.description}
                onChange={(e) => this.inputHandler(e, "description", "createForm")}
                style={{ resize: "none" }}
                placeholder="Description"
                className="custom-text-input"
              ></textarea>
            </div>

            <div className="col-6 mt-3">
              <TextField
                value={this.state.createForm.stock}
                placeholder="Stock"
                onChange={(e) => this.inputHandler(e, "stock", "createForm")}
              />
            </div>
            <div className="col-6 mt-2">
              <Input className="mt-3 ml-4"
                type="file"
                name="file"
                onChange={(e) => {
                  this.fileChangeHandler(e, "selectImage");
                }}
              />
            </div>
            <div className="col-3 mt-3">
              <ButtonUI onClick={this.createProductHandler} type="contained">
                Create Product
                            </ButtonUI>
            </div>
          </div>

          <caption className="mb-4 mt-2">
            <h2>Add Categories</h2>
          </caption>
          <div className="row">
            <div className="col-8">
              <TextField
                value={this.state.createCategoriesForm.nama}
                placeholder="Categories Name"
                onChange={(e) =>
                  this.inputHandler(e, "nama", "createCategoriesForm")
                }
              />
            </div>
            <div className="col-3 ">
              <ButtonUI onClick={this.createCategoryHandler} type="contained">
                Create Categories
                            </ButtonUI>
            </div>
          </div>

          <caption className="mb-4 mt-2">
            <h4>Add Categories to Product</h4>
          </caption>
          <div className="row">
            <div classname="col-4">
              <select
                value={this.state.productNow}
                className="custom-text-input h-100 pl-3"
                onChange={(e) => this.inputNow(e.target.value, "productNow")}
              >
                <option value="" disabled>Select Product</option>

                {this.state.productListALL.map((val) => {
                  return (
                    <option value={val.id}>{val.productName}</option>
                  )
                })}
              </select>
            </div>

            <div className="col-4">
              <select
                value={this.state.categoriesNow}
                className="custom-text-input h-100 pl-3"
                onChange={(e) => this.inputNow(e.target.value, "categoriesNow")}
              >
                <option value="" disabled>Select Category</option>
                {this.state.categoryList.map((val) => {
                  return (
                    <option value={val.id}>{val.nama}</option>
                  )
                })}
              </select>
            </div>
            <div className="col-3 ">
              <ButtonUI onClick={this.addCategoriesToProduct} type="contained">
                Add Categories to Product
              </ButtonUI>
            </div>
          </div>
        </div>
        <Modal
          toggle={this.toggleModal}
          isOpen={this.state.modalOpen}
          className="edit-modal"
        >
          <ModalHeader toggle={this.toggleModal}>
            <caption>
              <h3>Edit Product</h3>
            </caption>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
                Nama Product :
                <TextField
                  value={this.state.editForm.productName}
                  placeholder="Product Name"
                  onChange={(e) =>
                    this.inputHandler(e, "productName", "editForm")
                  }
                />
              </div>

              <div className="col-6">
                Stock :
                  <TextField
                  value={this.state.editForm.stock}
                  placeholder="Stock"
                  onChange={(e) => this.inputHandler(e, "stock", "editForm")}
                />
              </div>
              <div className="col-6">
                Price :
                <TextField
                  value={this.state.editForm.price}
                  placeholder="Price"
                  onChange={(e) => this.inputHandler(e, "price", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                Description :
                <textarea
                  value={this.state.editForm.description}
                  onChange={(e) => this.inputHandler(e, "description", "editForm")}
                  style={{ resize: "none" }}
                  placeholder="Description"
                  className="custom-text-input"
                ></textarea>
              </div>
              <div className="col-6 mt-3">
                Image :
                <Input className="mt-3 ml-4"
                  type="file"
                  name="file"
                  onChange={(e) => {
                    this.fileChangeHandler(e, "selectImage");
                  }}
                />
              </div>
              <div className="col-12 text-center my-3">
                <img src={this.state.editForm.image} alt="" />
              </div>
              <div className="col-5 mt-3 offset-1">
                <ButtonUI
                  className="w-100"
                  onClick={this.toggleModal}
                  type="outlined"
                >
                  Cancel
                </ButtonUI>
              </div>
              <div className="col-5 mt-3">
                <ButtonUI
                  className="w-100"
                  onClick={this.editProductHandler}
                  type="contained"
                >
                  Save
                </ButtonUI>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default AdminProducts;