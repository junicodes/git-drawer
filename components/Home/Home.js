import styles from './Home.module.scss';
import React, {  useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../react-wrapper/Context/AppContext';
import RepoView from './RepoView';
import ChartView from './ChartView';

const Home = ({ children }) => {

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //Use Ref

    //Use Router

    return (
        <section className={`${styles.homeWrapper}`}>
            {
                appContext.selectedOrganization ?
                <div className="pb-5">
                    <div className="px-8 3xl:px-4 flex justify-start w-full">
                        <RepoView />
                        <ChartView />
                    </div>
                </div> : null
            }
            {
                !appContext.selectedOrganization ?
                <div style={{height: "650px"}} className="flex justify-center items-center">
                    <p className={`${styles.note}`}>
                        Search for an organization
                    </p>
                </div> : null
            }
        </section> 
    )

}

export default Home;