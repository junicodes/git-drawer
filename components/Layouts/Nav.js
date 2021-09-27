import styles from './Layout.module.scss';
import React, {  useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../react-wrapper/Context/AppContext';
import Search from '../sub-components/Search';
import CustomInputSelect from '../static-components/CustomInputSelect';
import {searchOrg} from '../../helpers/api-routes/v1';

const Nav = ({ children }) => {

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //Use Ref
    const customInputRef = useRef();

    //Use Router


    const handleInputSelectChange = (payload) => {
        console.log(payload, "Selected Object push to context state")

        //Update the Context State with the current Organization payload
        dispatchAppContext({
            type: 'SELECTED_ORGANIZATION',
            payload
        });
        
    }

    return (
        <section className={`${styles.navWrapper} w-full h-16 flex items-center`}>
            <div className="2xl:container 2xl:mx-auto px-2 3xl:px-0">
                <div className="flex justify-start">
                    <CustomInputSelect ref={customInputRef} onEvent={handleInputSelectChange} 
                        findUrl={searchOrg}
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