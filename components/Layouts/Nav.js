import styles from './Layout.module.scss';
import React, {  useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../react-wrapper/Context/AppContext';
import CustomInputSelect from '../static-components/CustomInputSelect';
import { searchOrgAction } from '../../react-wrapper/Redux/actions/gitHubAction';
import { useDispatch } from "react-redux";
import { GET_ORG_REPO } from "../../react-wrapper/Redux/types";

const Nav = ({ children }) => {

    //Use Redux
    const dispatch = useDispatch();

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //Use Ref
    const customInputRef = useRef();

    //Use Router


    const handleInputSelectChange = (payload) => {

        //Format the Repo Context Payload
        dispatchAppContext({ type: "SELECTED_ORG_REPO", payload: null }); 

        //Update the Context State with the current Organization payload
        dispatchAppContext({type: 'SELECTED_ORG', payload });
        
    }

    const onFormatView = async () => {
        //Clear the slected Organization context state 
        await dispatchAppContext({
            type: "SELECTED_ORG",
            payload: null,
        }); 

        //CLear the repo from context state 
        await dispatchAppContext({
            type: "SELECTED_ORG_REPO",
            payload: null,
        });
        
        await dispatchAppContext({
            type: "FILTERED_REPO",
            payload: {tableLists: null},
        });

        await dispatchAppContext({
            type: "PAGINATE_REPO",
            payload:  { start: 0, size: 5, page: 1, skip: 5 },
        });

        await dispatchAppContext({ type: "CURRENT_CHART_VIEW", payload: 1 })

        //Clear the backup repo 
        dispatch({
            type: GET_ORG_REPO,
            payload: null
        });
    }

    return (
        <section className={`${styles.navWrapper} w-full h-16 flex items-center`}>
            <div className="2xl:container 2xl:mx-auto px-2 3xl:px-0">
                <div className="flex justify-start">
                    <CustomInputSelect ref={customInputRef} onEvent={handleInputSelectChange} 
                        onFormatView={onFormatView}
                        apiFunc={searchOrgAction}
                        type="search"
                        placeholder="Search organization"
                        target="search"
                    />
                </div>
            </div>
       </section>
    )

}

export default Nav;