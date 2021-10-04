import styles from './Home.module.scss';
import React, { useRef, useState, useEffect } from "react";
import { useAppContext, useDispatchAppContext } from '../../react-wrapper/Context/AppContext';
import TextInput from '../static-components/TextInput';
import StyledImage from '../static-components/StyledImage';
import { useSelector, useDispatch } from "react-redux";
import { Storage } from 'helpers/storageUtility';


const RepoFilter = ({ children }) => {

    //Use Redux
    const dispatch = useDispatch();

    //Redux State
    const { github: { backupOrgRepo } } = useSelector((state) => state);

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //Context State 
    const {selectedOrg, selectedOrgRepos, filteredRepo, paginateRepo} = appContext;

    //State
    const [repoFilter, setRepoFilter] = useState({
        name: '',
        minIssueCount: null,
        maxIssueCount: null
    })
    const [filterIssueError, setFilterIssueError] = useState(false);
    const [filterWarningNote, setFilterWarningNote] = useState("");
    const [disableIssueFilter, setDisableIssueFilter] = useState(false)
    const [disableRepoNameFilter, setDisableRepoNameFilter] = useState(false)

    //Use Ref
    const filterRepoNameRef = useRef();
    const filterMinRepoIssuesRef = useRef();
    const filterMaxRepoIssuesRef = useRef();

    //UseEffect
    
    useEffect(() => {
        //Update last filtered input when organization changes
        const lastTrackedInput = Storage.getItem('track_last_repo_input');
        const checkExistence = lastTrackedInput.filter(value => value.orgName === selectedOrg.login);

        if(checkExistence && checkExistence.length > 0) {
            //For issue filter
            if(checkExistence[0].inputType === "issueFilter") {
                const lastVal = checkExistence[0].lastFilteredValue.split("|")
                return setRepoFilter({ ...repoFilter, ...{
                    minIssueCount: lastVal[0],
                    maxIssueCount: lastVal[1]
                }});
            }

            //For name filter
            setRepoFilter({ ...repoFilter, ["name"]: checkExistence[0].lastFilteredValue });
        }
       
    }, [selectedOrg])


    useEffect(() => {
        //Listen for Min and Max and update the context state
        if(filterIssueError === false && repoFilter.minIssueCount && repoFilter.maxIssueCount && backupOrgRepo) {

            //filter the repo payload from min issue to max issue limit 
            let filtered = backupOrgRepo.filter(backupOrgRepo => 
                backupOrgRepo['open_issues_count'] >= repoFilter.minIssueCount
                && backupOrgRepo['open_issues_count'] <= repoFilter.maxIssueCount
            );

            filtered.sort((a, b) => a.open_issues_count - b.open_issues_count)

             //Dispatch to the context repo list
            dispatchAppContext({ type: "SELECTED_ORG_REPO", payload: filtered });

            formatFilterState(filtered)

            //Generate a filter value with pipe symbol seperating the min and max eg (min|max)
            //we remove this pipe symbol to get the min and max seperately

        }
        
        //Listen for repo name filter changes
        if(repoFilter.name && backupOrgRepo) {
             //filter the repo base on the value
            let filtered = backupOrgRepo.filter(backupOrgRepo => backupOrgRepo['name'].includes(repoFilter.name));

            //Sort alphabetically
            const newFilteredRepos = sortInputFirst(repoFilter.name, filtered);

            //Dispatch to the context repo list
            dispatchAppContext({ type: "SELECTED_ORG_REPO", payload: newFilteredRepos });

            formatFilterState(newFilteredRepos);
        }


    }, [backupOrgRepo, repoFilter])

    //Custom Function
    const isNumberKey = (val) => {
        const re = /^[0-9\b]+$/;
        if (re.test(val)) {
            return true;
        }
    }

    const sortInputFirst = (input , data) => {
        let first = []; let others = [];

        data.map(x => {
            if(x.name.indexOf(input) === 0) {
                first.push(x)
            }else {
                others.push(x)
            }
        })

        first.sort((a, b) => a.name.localeCompare(b.name))
        others.sort((a, b) => a.name.localeCompare(b.name))

        return first.concat(others);
    }

    const issueFilterErrorAlert = (type) => {
        if (type === 'add') {
            //Set Fitter Error to true 
            setFilterIssueError(true)
            filterMinRepoIssuesRef.current.classList.add("border-red-500", "focus:border-red-500", "focus:shadow-none")
            filterMaxRepoIssuesRef.current.classList.add("border-red-500", "focus:border-red-500", "focus:shadow-none")
        }

        if (type === 'remove') {
            //format error
            setFilterIssueError(false)
            filterMinRepoIssuesRef.current.classList.remove("border-red-500", "focus:border-red-500", "focus:shadow-none")
            filterMaxRepoIssuesRef.current.classList.remove("border-red-500", "focus:border-red-500", "focus:shadow-none")
        }
    }

    const formatFilterState = (payload) => {
        //Update the pagination table
        const newItems = payload.slice(0, paginateRepo.skip)

        //Update the General filtered repo context api
        dispatchAppContext({ type: "FILTERED_REPO", payload: {tableLists: newItems} });
        dispatchAppContext({ type: "PAGINATE_REPO", payload: { start: 0, size:  5, page: 1 } });
    }

    const trackLastFilterInput = (val, type) => {
        //Store and update the filter input parmanent storage with localstorage 
        const lastTrackedInput = Storage.getItem('track_last_repo_input');
        const checkExistence = lastTrackedInput.filter(value => value.orgName === selectedOrg.login);

        if(checkExistence && checkExistence.length > 0) {

            lastTrackedInput.map( x => {
                if(x.orgName == checkExistence[0].orgName) {
                   x.lastFilteredValue = val;
                   x.inputType = type;
                }
            });

            return Storage.setItem("track_last_repo_input", lastTrackedInput);
        }

        // //Create a new filter track for organization name 
        Storage.setItem("track_last_repo_input", [...lastTrackedInput, 
            {
                orgName: selectedOrg.login,
                inputType: type,
                lastFilteredValue: val
            }
        ]);
    }

    //Event Functions
    const handleFilterRepoByIssues = (e) => {

        //Get target info
        const target = JSON.parse(e.target.dataset.payload).target;

        //Format Errors
        issueFilterErrorAlert("remove")

        if(filterMaxRepoIssuesRef.current.value == "" && filterMinRepoIssuesRef.current.value == "") {
            setDisableRepoNameFilter(false); 
            setFilterWarningNote(null)

            //Dispatch the redux backeup to context state
            dispatchAppContext({ type: "SELECTED_ORG_REPO", payload: backupOrgRepo}); 
            formatFilterState(backupOrgRepo)
        }

        //Validation -- Filter Value must be numbers only
        if (!isNumberKey(e.target.value))
             return setRepoFilter({ ...repoFilter, [target]: '' });

        if (target === "maxIssueCount" && e.target.value == 0) 
            return setRepoFilter({ ...repoFilter, [target]: '' });

        //disable the repo name filter
        setDisableRepoNameFilter(true )
        setFilterWarningNote("The input field for (Filter repositories by name) has been disabled for flexibility")
        
        setRepoFilter({ ...repoFilter, [target]: e.target.value }); //Listen for state change in useEffect

        //Validation -- Min Filter cannot be greater that Max Filter
        if (filterMaxRepoIssuesRef.current.value !== "" && 
            Number(filterMinRepoIssuesRef.current.value) >= Number(filterMaxRepoIssuesRef.current.value)) {
            //Show indication for issue filter error
            return issueFilterErrorAlert("add") 
        }

        //Handle the tracking of filtered last input
        const val = `${filterMinRepoIssuesRef.current.value }|${filterMaxRepoIssuesRef.current.value }`;
        const type = 'issueFilter';

        //Store and update last filter input
        trackLastFilterInput(val, type)

    }

    const handleFilterRepoByName = () => {

        const val = filterRepoNameRef.current.value

        //Format and disable the issue filter for flexibility
        setDisableIssueFilter(val != "" ? true : false)
        setFilterWarningNote(val != "" ? "The input field for (Filter by number of issues) has been disabled for flexibility." : null)

        //Store and update last filter input to localStorage
        const type = "repoByName";
        trackLastFilterInput(val, type)

        //Validate input value
        if(val === "") {
            setRepoFilter({ ...repoFilter, ["name"]: "" });
            //Dispatch the redux backeup to context state
            dispatchAppContext({ type: "SELECTED_ORG_REPO", payload: backupOrgRepo}); 
            return formatFilterState(backupOrgRepo)
        }
        setRepoFilter({ ...repoFilter, ['name']: filterRepoNameRef.current.value });
    }

    return (
        <>
            <div className="flex justify-start items-center">
                <div className="mr-2">
                    <img className="w-10 h-10 rounded-full" src={selectedOrg.avatar_url} />
                </div>
                <h3 className="text-xl font-bold capitalize">{selectedOrg.login}</h3>
            </div>
            <form className="flex justify-start items-center mt-6">
                <div className="mr-10">
                    <TextInput
                        ref={filterRepoNameRef}
                        type="text"
                        value={repoFilter.name}
                        dataset={{ target: "repoName" }}
                        className={`w-80 h-10 text-xs`}
                        eventType={['onKeyUp']}
                        onEvent={handleFilterRepoByName}
                        placeHolder={`Type to filter`}
                        disabled={disableRepoNameFilter}
                        label={{
                            text: "Filter repositories by name",
                            className: "mt-3 font-bold text-xs"
                        }}
                    />
                </div>
                <div className="relative">
                    <label style={{ color: '#464A53' }} htmlFor="Filter by number of issues" className="mt-3 font-bold text-xs">
                        Filter by number of issues
                        {
                            filterIssueError ?
                                <div className="animate__animated animate__fadeIn">
                                    <div className="tooltip absolute z-20 h-8 text-center text-white px-2 -top-8 -right-24 text-xs font-normal items-center flex">
                                        <p>Conflicting min and max values</p>
                                    </div>
                                    <StyledImage className="cursor-pointer top-0 -right-6 absolute"
                                        src="/images/icons/error.svg" width={24} height={24}
                                    />
                                </div>
                                : null
                        }
                    </label>
                    <div className="flex justify-start items-center">
                        <div className="mr-2">
                            <TextInput
                                ref={filterMinRepoIssuesRef}
                                type="text"
                                value={repoFilter.minIssueCount}
                                dataset={{ target: "minIssueCount" }}
                                className={`w-16 h-10 text-xs`}
                                eventType={['onChange']}
                                onEvent={handleFilterRepoByIssues}
                                disabled={disableIssueFilter}
                                placeHolder={`Min`}
                            />
                        </div>
                        <div className="ml-3">
                            <TextInput
                                ref={filterMaxRepoIssuesRef}
                                type="text"
                                value={repoFilter.maxIssueCount}
                                dataset={{ target: "maxIssueCount" }}
                                className={`w-16 h-10 text-xs`}
                                eventType={['onChange']}
                                onEvent={handleFilterRepoByIssues}
                                disabled={disableIssueFilter}
                                placeHolder={`Max`}
                            />
                        </div>
                    </div>
                </div>
            </form>
            <small className="text-gray-600 text-xs">{filterWarningNote}</small>
        </>
    )

}

export default RepoFilter;