import Head from "next/head";
import styles from './Layout.module.scss';
import Footer from './Footer';
import Nav from "./Nav";
import React, {  useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../react-wrapper/Context/AppContext';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();


const Layout = ({ children }) => {

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //Use Router

    //Use Class
    const contextClass = {
        success: "bg-blue-600",
        error: "bg-red-600",
        info: "bg-gray-600",
        warning: "bg-orange-400",
        default: "bg-indigo-600",
        dark: "bg-white-600 font-gray-300",
    };

    return (
        <>
            <Head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"></link>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"></link>
                <script src="https://code.highcharts.com/highcharts.js"></script>
                <script src="https://code.highcharts.com/modules/timeline.js"></script>
                <script src="https://code.highcharts.com/modules/exporting.js"></script>
                <script src="https://code.highcharts.com/modules/export-data.js"></script>
                <script src="https://code.highcharts.com/modules/accessibility.js"></script>
            </Head>
        
            <section>
                {/* <Preloader status={appContext.preloaderStatus} /> */}
                <ToastContainer 
                  toastClassName={({ type }) => contextClass[type || "default"] + 
                    " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
                  }
                  bodyClassName={() => "text-xs font-white font-med block p-2"}
                />

                <Nav /> 
                    <div className="relative w-full">
                         {children}
                    </div>
                <Footer />
            </section>
        </> 
    )

}


export default Layout;