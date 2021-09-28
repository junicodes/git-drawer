
import { LOG_USER_IN } from "../types";
import apiRequest from "helpers/axios";
import { Storage } from "../../../helpers/storageUtility" 
import { searchOrg, getOrgRepos } from "../../../helpers/api-routes/v1.js" 
import { Toast } from "../../../helpers/toast"
import { githubOrigin } from "../../../helpers/api-routes/v1";
import 'react-toastify/dist/ReactToastify.css';
import dayjs from "dayjs"


export const searchOrgAction = async (value, dispatchAppContext) => {

    //API REQUEST HERE
    const res = await apiRequest({ url: searchOrg(value), method: "get", originUrl: githubOrigin }, dispatchAppContext);

    if (res) {

        //Dispatach payload to a redux state
        // await dispatch({
        //     type: LOG_USER_IN,
        //     payload: {
        //         data: res
        //     }
        // });
      
      return res;
    }
  
};

export const getOrgRepoAction = async (value, dispatchAppContext) => {

    //API REQUEST HERE
    const res = await apiRequest({ url: getOrgRepos(value), method: "get", originUrl: githubOrigin }, dispatchAppContext);

    if (res) {


        //Dispatch to Context
        await dispatchAppContext({ //Disable The ceilin preloder
            type: "SELECTED_ORG_REPO",
            payload: res.data,
        }); 

        //Dispatach payload to a redux state
        // await dispatch({
        //     type: LOG_USER_IN,
        //     payload: {
        //         data: res
        //     }
        // });
      
      return res;
    }
  
  };
