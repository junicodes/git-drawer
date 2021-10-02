import styles from './Home.module.scss';
import React, {  useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../react-wrapper/Context/AppContext';
import RepoView from './RepoView';
import ChartView from './ChartView';
import ChartSelectDropDown from './ChartSelectDropdown';
import RepoFilter from './RepoFilter';
import { useSelector, useDispatch } from "react-redux";

const Home = ({ children }) => {


    //Redux State
    const { github: { backupOrgRepo } } = useSelector((state) => state);

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //State
    
    //Context State
    const {selectedOrg, selectedOrgRepos} = appContext;

    //Use Ref

    //Use Router

    return (
        <section className={`${styles.homeWrapper}`}>
            {
                !selectedOrg ?
                <div style={{height: "650px"}} className="flex justify-center items-center">
                    <p className={`${styles.note}`}>
                        Search for an organization
                    </p>
                </div> : null
            }
            {
                selectedOrg ?
                <div className="pb-5 2xl:container 2xl:mx-auto px-2 3xl:px-0">
                    <div className="md:px-8 3xl:px-4 md:flex justify-start w-full animate__animated animate__fadeIn">

                        <div className={`${styles.repoViewWrapper} md:w-1/2 md:pr-4`}>
                            <div className="pt-10">
                                <RepoFilter />
                                <RepoView />
                            </div>
                        </div>

                        <div className={`${styles.chartViewWrapper} md:w-1/2 md:pl-4`}>
                            <div className="pt-20">
                                <ChartSelectDropDown />
                                <ChartView />
                            </div>
                        </div>

                        <Preloader status={selectedOrgRepos === null} classSty="flex justify-center top-1/2 left-1/2 absolute" />

                        {
                          backupOrgRepo && backupOrgRepo.length <= 0 &&
                             <div className="absolute top-1/2 left-1/2 -translate-x-16 transform">No Repo Found</div>
                        }

                    </div>
                </div> : null
            }
        </section> 
    )

}

export default Home;