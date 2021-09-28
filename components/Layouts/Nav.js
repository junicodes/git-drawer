import styles from './Layout.module.scss';
import React, {  useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../react-wrapper/Context/AppContext';
import CustomInputSelect from '../static-components/CustomInputSelect';
import { searchOrgAction } from '../../react-wrapper/Redux/actions/gitHubAction';

const Nav = ({ children }) => {

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

    return (
        <section className={`${styles.navWrapper} w-full h-16 flex items-center`}>
            <div className="2xl:container 2xl:mx-auto px-2 3xl:px-0">
                <div className="flex justify-start">
                    <CustomInputSelect ref={customInputRef} onEvent={handleInputSelectChange} 
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