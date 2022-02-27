import axios from "axios";
import { Storage } from "./storageUtility";
import { origin } from "./api-routes/v1";
import { LOG_USER_OUT } from "../react-wrapper/Redux/types";
import { Toast } from "../helpers/toast"
import 'react-toastify/dist/ReactToastify.css';

export default async function apiRequest({ url, method, body=null, originUrl="default" }, dispatchAppContext, tokenPermit = true, persistRequest = false) {

  let user, token; // declaring a global variable
  
  if (tokenPermit) {
    user = Storage.getItem("gd_current_user");
    token = user ? user.token : null;
  }

  let headers = {
    "Content-Type": "application/json",
    "Accept":"application/vnd.github.mercy-preview+json"
    // 'Access-Control-Allow-Origin': '*',
  };

  if (token) headers.Authorization = `token ${token}`;

  try {
    const response = await axios.request({
      url,
      method,
      baseURL: originUrl == "default" ? origin : originUrl,
      data: body,
      headers,
      responseType: "json",
      validateStatus: function (status_1) {
        return status_1 >= 200 && status_1 <= 501; // default
      },
    });

    await dispatchAppContext({ type: "PRELODER", payload: false })

    switch (response.status) {

      case 500:

        if(persistRequest) {
          return response;
        }

        return Toast("dark", "top-right", "A unexpected error has occured, please refresh, check internet connection and try again or contact support.");
      case 501:
        return Toast("dark", "top-right", "Ooops something not right, please refresh and try angain or contact support.");
      case 401:
        // return dispatchAppContext({ type: "LOGOUT_USER", payload: false })
        return Toast("dark", "top-right", "Ooops something not right, please refresh and try angain or contact support.");
      case 422:
        return Toast("warning", "top-right",
         `${response.data.errors ? Object.entries(response.data.errors).forEach(([key, value]) => `${key}: ${value}`) : response.data.message}`)
      case 400:
        return Toast("warning", "top-right", response.data.message);
      case 403:
        return Toast("dark", "top-right", "Ooops, too many request was sent to the server, please try again later in a few minutes.");
      default:
        return response;
       
    }

  } catch (error) {
    console.log(error)
    Toast("error", "top-right", "A unexpected error has occured, please refresh and try again");

  }
}
