import { Storage } from "../../../helpers/storageUtility";
import { GET_ORG_REPO } from "../types";

// INITIAL State
const initialState = {
  backupOrgRepo: null
};


// GITHUB REDUCER
const gitHubReducer = (state = initialState, { type, payload }) => {
  
    switch (type) {
  
      case GET_ORG_REPO:
  
        return {
          ...state,
          backupOrgRepo: payload
       };

      default:
        return state;
    }
  };
  
  export default gitHubReducer;
  