import userTypes from '../types/user'

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT, ON_REGISTER_SUCCESS, ON_REGISTER_FAIL,COOKIE_CHECK, ON_UPDATE_QUANTITY_CART , ON_SEARCHFILTER_SUCCESS } = userTypes
const init_state = {
  id: 0,
  username: "",
  fullName: "",
  email: "",
  errMsg: "",
  role: "",
  address:"",
  cookieChecked: false,
  searchAndFilter: "",
  
};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCCESS:
      const { username, fullName, email, id, role,address,password } = action.payload;
      return {
        ...state,
        username,
        fullName,
        email,
        id,
        address,
        role,
        cookieChecked: true,
        errMsg: "",
      }


    case ON_LOGIN_FAIL:
      return { ...state, errMsg: action.payload,cookieChecked: true}


    case ON_REGISTER_SUCCESS:
      return {
        ...state,
        username,
        fullName,
        email,
        password,
        id,
        address,
        cookieChecked: true,
        errMsg: "",
      }


    case ON_REGISTER_FAIL:
      return { ...state, errMsg: action.payload,cookieChecked: true}


    case ON_LOGOUT:
      return {
        ...state,
        username: action.payload,
        fullName: action.payload,
        email: action.payload,
        password: action.payload,
        id: action.payload,
        cookieChecked: true,
        errMsg: "Berhasil Logout"
      };
    case COOKIE_CHECK:
      return { ...state, cookieChecked: true };
    // case ON_UPDATE_QUANTITY_CART:
    //   return { ...state, cookieChecked: true, val : action.payload};
    default:
      return { ...state }
  }
};
