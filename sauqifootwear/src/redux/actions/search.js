import Axios from 'axios'
import { API_URL } from '../../constants/API'
import Cookie from "universal-cookie";

const cookieObj = new Cookie();
export const SearchAndFilterHandler = (text) => {
    return {
        type: "ON_SEARCHFILTER_SUCCESS",
        payload: text,
    }
}