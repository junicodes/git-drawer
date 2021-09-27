import axios from "axios";
import { Storage } from "./storageUtility";
import { origin } from "./api-routes/v1";
import { LOG_USER_OUT } from "../react-wrapper/Redux/types";
import { Toast } from "../helpers/toast"
import 'react-toastify/dist/ReactToastify.css';

export default async function apiRequest({ url, method, body }, dispatch, dispatchAppContext, tokenPermit = true, persistRequest = false) {

  let user, token; // declaring a global variable
  
  if (tokenPermit) {
    user = Storage.getItem("gd_current_user");
    token = user ? user.token : null;
  }

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    // 'Access-Control-Allow-Origin': '*',
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const response = await axios.request({
      url,
      method,
      baseURL: origin,
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
        Toast("error", "top-center", "A unexpected error has occured, please refresh, check internet connection and try again or contact support.");
        break;
      case 501:
        Toast("error", "top-center", "Ooops something not right, please refresh and try angain or contact support.");
        break;
      case 401:
        dispatch({ type: LOG_USER_OUT });
        break;
      case 422:
        Toast("warning", "top-center",
         `${response.data.errors ? Object.entries(response.data.errors).forEach(([key, value]) => `${key}: ${value}`) : response.data.message}`)
        break;
      case 400:
        Toast("warning", "top-center", response.data.message);
        break;
      default:
        return response;
       
    }
    console.log(response.status)
    console.log(response)

  } catch (error) {
    console.log(error)
    Toast("error", "top-center", "A unexpected error has occured, please refresh and try again");

  }
}
