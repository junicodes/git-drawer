import styles from './Home.module.scss';
import React, { useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../react-wrapper/Context/AppContext';
import Table from '../static-components/Table';
import { getOrgRepoAction } from '../../react-wrapper/Redux/actions/gitHubAction';
import { useDispatch } from "react-redux";


const RepoView = () => {

    //Use Redux
    const dispatch = useDispatch();

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //Context State
    const {selectedOrg, selectedOrgRepos, paginateRepo, filteredRepo} = appContext;

    //State

    //Use Ref

    //Use Effect
    useEffect(() => {
        //Get Selected Organization Repo
        if(selectedOrg) {
            getOrgReposApi();
        }
    }, [selectedOrg])

    useEffect(() => {
        dispatchAppContext({ type: "TABLE_SELECTED_REPO", payload: null });
    }, [filteredRepo])

    //Custom Function


    //Event Functions
    const handlePreview = (repo) => {
        dispatchAppContext({ type: "TABLE_SELECTED_REPO", payload: repo });
    }

    //Api Call
    const getOrgReposApi = async (e) => {

        //Call an APi Here
        const result = await getOrgRepoAction(selectedOrg.login, dispatchAppContext, dispatch)
        if(result && result.status === 200) {
            //Splice out what is needed for table from the incoming payload array
            const newItems = result.data.slice(paginateRepo.start, paginateRepo.skip)

            //Update the General filtered repo context api
            dispatchAppContext({ type: "FILTERED_REPO", payload: {tableLists: newItems} });

        }
    }
    
    return (
        <>
            {
                selectedOrgRepos && 
                    <div className="repo-table my-4">
                        <Table onHandlePreview={handlePreview} /> 
                    </div>
            }
        </>
    )

}

export default RepoView;