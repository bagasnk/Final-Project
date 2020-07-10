import userTypes from '../types/user'

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT, ON_REGISTER_SUCCESS, ON_REGISTER_FAIL, COOKIE_CHECK, ON_UPDATE_QUANTITY_CART, ON_SEARCHFILTER_SUCCESS } = userTypes
const init_state = {
  id: 0,
  username: "",
  fullname: "",
  email: "",
  role: "",
  address: "",
  verify_token: "",
  is_verified: "",
  errMsg: "",
  password: "",
  cookieChecked: false,
  searchAndFilter: "",
  cartItemsCount : 0,

};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCCESS:
      const { username, fullname, email, id, role, address, password, is_verified, verify_token } = action.payload;
      return {
        ...state,
        username,
        fullname,
        email,
        id,
        address,
        role,
        is_verified,
        verify_token,
        cookieChecked: true,
        errMsg: "",
      }


    case ON_LOGIN_FAIL:
      return { ...state, errMsg: action.payload, cookieChecked: true }


    case ON_REGISTER_SUCCESS:
      return {
        ...state,
        username,
        fullname,
        email,
        password,
        id,
        is_verified,
        verify_token,
        address,
        cookieChecked: true,
        errMsg: "",
      }


    case ON_REGISTER_FAIL:
      return { ...state, errMsg: action.payload, cookieChecked: true }


    case ON_LOGOUT:
      return {
        ...state,
        username: action.payload,
        fullname: action.payload,
        email: action.payload,
        password: action.payload,
        id: action.payload,
        is_verified: action.payload,
        verify_token: action.payload,
        cookieChecked: true,
        errMsg: "Berhasil Logout"
      };
    case COOKIE_CHECK:
      return { ...state, cookieChecked: true };

    case ON_UPDATE_QUANTITY_CART:
      return { ...state, cartItemsCount: action.payload };

    default:
      return { ...state }
  }
};
