const init_state = {
    searchAndFilter: "",
    cookieChecked: false,
};


export default (state = init_state, action) => {
    switch (action.type) {
        case "ON_SEARCHFILTER_SUCCESS":
            return { ...state, cookieChecked: true, searchAndFilter: action.payload }
        default:
            return { ...state }
    }
};