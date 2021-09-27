import { LOG_USER_IN } from "../types";
import apiRequest from "helpers/axios";
import { Storage } from "../../../helpers/storageUtility" 
import api_route from "../../../helpers/api-routes/v1.js" 
import { Toast } from "../../../helpers/toast"
import 'react-toastify/dist/ReactToastify.css';


// PERSIST USER FROM LOCAL STORAGE
export const loadUser = () => async (dispatch) => {
  //API REQUEST HERE
  const res = Storage.getItem("gd_current_user")

  if(!res) {
    dispatch({ type: LOG_USER_OUT })
  }
  
  await dispatch({
    type: LOG_USER_IN,
    payload: {
      data: res,
      token: res.token,
      isFirstTimeUser: typeof window !== "undefined" ? Storage.getItem(`is-first-time-user-${res.user.email}`) : null
    },
  });

};

export const login = async (dispatch, dispatchAppContext, body, tokenListener, persistRequest = false) => {

  //API REQUEST HERE
  const res = await apiRequest({ url: api_route.login, method: "post", body },
                                 dispatch, dispatchAppContext, tokenListener, persistRequest);
  console.log(res);

  await dispatchAppContext({ //Disable The ceilin preloder
    type: "PRELODER",
    payload: false,
  }); 

  if (res) {

    //Save To localStorage
    Storage.setItem("gd_current_user", res.data)
    Storage.setItem("gd_current_user_token", res.data.token)
    
    await dispatch({
      type: LOG_USER_IN,
      payload: {
        data: res.data,
        token: res.data.token,
      },
    });

    return res;
  }

};

export const verifyCode = async (dispatch, dispatchAppContext, body, tokenPermit) => {

    //API REQUEST HERE
    const res = await apiRequest({ url: api_route.verifyAccount, method: "post", body }, dispatch, tokenPermit)
    console.log(res)

    await dispatchAppContext({ 
      type: 'PRELODER', 
      payload: false
    }) //Disable The ceilin preloder

          //Set the startup assesment stages
    if(res && res.status === 200) {

        return res;
    }
};

export const sendVerifyCode = async (dispatch, dispatchAppContext, body, tokenPermit) => {

  //API REQUEST HERE
  const res = await apiRequest({ url: api_route.sendVerifyCode, method: "post", body }, dispatch, tokenPermit)
  console.log(res)

  await dispatchAppContext({ 
    type: 'PRELODER', 
    payload: false
  }) //Disable The ceilin preloder

        //Set the startup assesment stages
  if(res && res.status === 200) {
      return res;
  }
  
};


export const resetPassword = async (dispatch, dispatchAppContext, body, tokenPermit) => {

  //API REQUEST HERE
  const res = await apiRequest({ url: api_route.resetPassword, method: "post", body }, dispatch, tokenPermit)
  console.log(res)

  await dispatchAppContext({ 
    type: 'PRELODER', 
    payload: false
  }) //Disable The ceilin preloder

        //Set the startup assesment stages
  if(res && res.status === 200) {
      return res;
  }
  // Toast("error", "top-center", "A unexpected error has occured, please refresh, check internet connection and try again or contact support.");
  
};
