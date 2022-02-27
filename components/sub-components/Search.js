import { Toast } from "../../helpers/toast"
import { useDispatch } from 'react-redux';
import { useAppContext, useDispatchAppContext } from "../../react-wrapper/Context/AppContext";
import { login_Action } from '../../react-wrapper/Redux/actions/authAction';
import TextInput from '../static-components/TextInput';
import Textarea from '../static-components/Textarea';
import StyledImage from '../static-components/StyledImage';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from "react";

const Search = ({target, className}) => {
    //Redux State 

    //State

    //Ref
    const searchRef = useRef(null);
    
    //Router
    const router = useRouter();

    //Use Context
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //Redux
    const dispatch = useDispatch();

    //Function

    //Validation

    //Event
    
    const handleSearchApi = async () => {

        if(searchRef.current.value != "") {
            const body = {   
                searchRef: searchRef.current.value
            }
    
            console.log(body)
    
            // const result = await login_Action(dispatch, dispatchAppContext, body, false); //false to prevent user token check 
    
            // console.log(result);
    
            // if (result && result.status === 200) {
    
            //     setTimeout(() => {
            //         router.push('/dahsboard')
            //     }, 3000);
            // }
        }

    }


    return (

        <form className="">
            <TextInput   
                ref={searchRef}
                type="search"
                value=""
                dataset={{target: "search"}}
                className={`${className} w-80 h-10 pl-8`}
                eventType={['onKeyUp']}
                onEvent={handleSearchApi}
                placeHolder={`Search ${target}`}
                icon={{
                    file: "/images/icons/search.svg",
                    class: "mx-2 mt-3"
                }}
            />
        </form>
    )

}


export default Search;