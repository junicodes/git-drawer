import { Storage } from "../../../helpers/storageUtility";
import { SEARCH_ORGANIZATION } from "../types";

// INITIAL State
const initialState = {
  active_searched_organization: null,
};


// GITHUB REDUCER
const gitHubReducer = (state = initialState, { type, payload }) => {
  
    switch (type) {
  
      case SEARCH_ORGANIZATION:
  
        return {
          ...state,
          user: payload.data
       };

      default:
        return state;
    }
  };
  
  export default gitHubReducer;
  