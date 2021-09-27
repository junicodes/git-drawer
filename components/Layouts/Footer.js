import styles from './Layout.module.scss';
import React, {  useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../react-wrapper/Context/AppContext';


const Footer = ({ children }) => {

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //Use Router

    return (
        <>
            <section className={`${styles.footerWrapper} w-full h-16 flex items-center`}>
                <div className="2xl:container mx-auto">
                    <p>

                    </p>
                </div>
            </section>
        </> 
    )

}


export default Footer;