import Axios from 'axios'
import userTypes from '../types/user'
import Cookie from "universal-cookie";
import swal from "sweetalert";


const API_URL = `http://localhost:8080`;

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT, ON_REGISTER_SUCCESS, ON_REGISTER_FAIL, COOKIE_CHECK, ON_UPDATE_QUANTITY_CART, ON_SEARCHFILTER_SUCCESS } = userTypes

const cookieObj = new Cookie();

export const LoginHandler = (userData) => {
  return (dispatch) => {
    const { username, password } = userData;
    Axios.get(`${API_URL}/users/login`, {
      params: {
        username,
        password,
      }
    })
      .then(res => {
        dispatch({
          type: ON_LOGIN_SUCCESS,
          payload: res.data,
        })
        Axios.get(`${API_URL}/carts/user/${res.data.id}`)
          .then((res) => {
            dispatch({
              type: ON_UPDATE_QUANTITY_CART,
              payload: res.data.length,
            });
          })
          .catch((err) => {
            alert("GA MASUK")
            console.log(err);
          });
        console.log(res)
      })
      .catch(err => {
        dispatch({
          type: ON_LOGIN_FAIL,
          payload: err.response.data.message
        })
        console.log(err.response)
      })
  }
}

export const RegisterHandler = (userData) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/users`, {
      ...userData, role: "user"
    })
      .then((res) => {
        swal("Success!", "Register Success", "success");
        dispatch({
          type: ON_REGISTER_SUCCESS,
          payload: res.data
        })
        Axios.get(`${API_URL}/carts/user/${res.data.id}`)
          .then((res) => {
            dispatch({
              type: ON_UPDATE_QUANTITY_CART,
              payload: res.data.length,
            });
          })
          .catch((err) => {
            alert("GA MASUK")
            console.log(err);
          });
        console.log(res)
      })
      .catch((err) => {
        dispatch({
          type: ON_REGISTER_FAIL,
          payload: err.response.data.message
        })

      })
  }
}

export const userKeepLogin = (userData) => {
  return dispatch => {
    Axios.get(`${API_URL}/users`, {
      params: {
        id: userData.id,
      }
    })
      .then(res => {
        console.log(res.data)
        dispatch({
          type: ON_LOGIN_SUCCESS,
          payload: res.data,
        })
        Axios.get(`${API_URL}/carts/user/${res.data.id}`)
          .then((res) => {
            dispatch({
              type: ON_UPDATE_QUANTITY_CART,
              payload: res.data.length,
            });
          })
          .catch((err) => {
            alert("GA MASUK")
            console.log(err);
          });
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const logoutHandler = () => {
  cookieObj.remove("authData", { path: "/" })
  return {
    type: ON_LOGOUT,
    payload: "",
  }
}

export const cookieChecker = () => {
  return {
    type: COOKIE_CHECK,
  }
}

export const qtyCartHandler = (userId) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/carts/user/${userId}`)
      .then((res) => {
        dispatch({
          type: ON_UPDATE_QUANTITY_CART,
          payload: res.data.length,
        });
      })
      .catch((err) => {
        alert("GA MASUK")
        console.log(err);
      });
  };
};



