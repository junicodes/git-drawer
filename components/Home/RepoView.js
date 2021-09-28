import styles from './Home.module.scss';
import React, { useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../react-wrapper/Context/AppContext';
import Table from '../static-components/Table';
import { getOrgRepoAction } from '../../react-wrapper/Redux/actions/gitHubAction';

const RepoView = () => {

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //Context State
    const {selectedOrg, selectedOrgRepos, paginateRepo} = appContext;

    //State
    const [repoData] = useState();


    //Use Ref

    //Use Effect
    useEffect(() => {
        //Get Selected Organization Repo
        if(selectedOrg) {
            getOrgReposApi();
        }
    }, [selectedOrg])

    //Custom Function


    //Event Functions
    const handlePreview = (e) => {
        console.log(e)
        console.log("table clicked")
        // const payload = JSON.parse(e.currentTarget.dataset.payload);

    }

    //Api Call
    const getOrgReposApi = async (e) => {

        //Call an APi Here
        const result = await getOrgRepoAction(selectedOrg.login, dispatchAppContext)

        console.log(result)

        if(result) {
            console.log(result)
            console.log(result.data, "payload repo");

            //Splice out what is needed for table from the incoming payload array
            const newItems = result.data.slice(paginateRepo.start, paginateRepo.size)

            //Update the General filtered repo context api
            dispatchAppContext({ type: "FILTERED_REPO", payload: {tableLists: newItems} });

        }
    }

    console.log(selectedOrgRepos, "in view")

    const handlePrevPage = (e) => {
        console.log(e)
    }

    const handleNextPage = (e) => {
        console.log(e)
        //Splice out the new page from the context api org repo arrray and update the the local componet repo
        
        console.log(selectedOrgRepos)

        dispatchAppContext({ type: "PAGINATE_REPO", payload: {
            page: paginateRepo.page + 1
        } });

        // setPaginate({ ...repoData, ['page']: paginate.num + 1 });
    }

    return (
        <>
            {
                selectedOrgRepos && 
                    <div className="repo-table my-4">
                        <Table paginate={paginateRepo}
                               onHandlePreview={handlePreview} 
                               onHandlePrev={handlePrevPage} 
                               onHandleNext={handleNextPage} 
                        /> 
                    </div>
            }
        </>
    )

}

export default RepoView;