import { Storage } from "../../../helpers/storageUtility";
import { LOG_USER_IN, LOG_USER_OUT, CACHE_USER } from "../types";

// INITIAL AUTH STATE

const currentUserData = typeof window !== "undefined" ? Storage.getItem("gd_current_user") : null;
const isFirstTimeUser = (typeof window !== "undefined" && currentUserData) ? Storage.getItem(`is_gd_first_time_user_${currentUserData.user.email}`) : null;

const initialAuthState = {
  user: currentUserData ? currentUserData.user : null,
  isFirstTimeUser: isFirstTimeUser,
  token: null,
  isLoggedIn: false,
};


// AUTH REDUCER
const authReducer = (state = initialAuthState, { type, payload }) => {
  
    switch (type) {
  
      case LOG_USER_IN:
  
        return {
          ...state,
          user: payload.data,
          token: payload.token,
          isLoggedIn: true 
       };
  
      case LOG_USER_OUT:
        
        if (typeof window !== "undefined") {
            console.clear();
            Storage.removeItem("gd_current_user");
            location.replace('/auth/login')
        }
  
        return {
          ...state,
          user: null,
          token: null,
          isLoggedIn: false,
        };
  
      case CACHE_USER:
  
        if (typeof window !== "undefined") {
            Storage.setItem(`is_gd_first_time_user_${state.user.email}`, payload);
        }
  
        return {
          ...state,
          isFirstTimeUser: false,
        };
  
      default:
        return state;
    }
  };
  
  export default authReducer;
  