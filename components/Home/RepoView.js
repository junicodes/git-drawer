import styles from './Home.module.scss';
import React, { useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../react-wrapper/Context/AppContext';
import TextInput from '../static-components/TextInput';
import StyledImage from '../static-components/StyledImage';
import Table from '../static-components/Table';

const RepoView = ({ children }) => {

    //State
    const [repoFilter, setRepoFilter] = useState({
        name: '',
        minIssueCount: '',
        maxIssueCount: ''
    })

    const [repoData, setRepoData] = useState({
        tableHeaders: [
            { 
                title: 'Repository',
                icon: "/images/icons/dropdown-arrow.svg"
            },
            { title: 'Open issues' },
            { title: 'Stars' }
        ],
        tableLists: [
            { 
                name: 'JavaSccript Enginering',
                open_issues_count: 210,
                stargazers_count: 50
            },
            { 
                name: 'Money Counter',
                open_issues_count: 90,
                stargazers_count: 5
            },
            { 
                name: 'Motive Sensors',
                open_issues_count: 100,
                stargazers_count: 70
            },
            { 
                name: 'Blind Sectioning',
                open_issues_count: 310,
                stargazers_count: 90
            },
            ,
            { 
                name: 'Motive Sensorjs',
                open_issues_count: 100,
                stargazers_count: 70
            },
            { 
                name: 'Blind Sectionijng',
                open_issues_count: 310,
                stargazers_count: 90
            },
        ],
    });
    const [filterIssueError, setFilterIssueError] = useState(false);

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //Use Ref
    const filterRepoNameRef = useRef();
    const filterMinRepoIssuesRef = useRef();
    const filterMaxRepoIssuesRef = useRef();

    //Use Router

    //Custom Function
    const isNumberKey = (val) => {
        const re = /^[0-9\b]+$/;
        if (re.test(val)) {
            return true;
        }
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

    //Event Functions

    const handlePreview = (e) => {
        console.log(e)
        console.log("table clicked")
        // const payload = JSON.parse(e.currentTarget.dataset.payload);

    }

    const handleFilterRepoIssues = (e) => {
        //Get target info
        const target = JSON.parse(e.target.dataset.payload).target;

        //Format Errors
        issueFilterErrorAlert("remove")

        //Validation -- Filter Value must be numbers only
        if (!isNumberKey(e.target.value) || e.target.value == 0) {
            return setRepoFilter({ ...repoFilter, [target]: '' });
        }

        setRepoFilter({ ...repoFilter, [target]: e.target.value });

        //Validation -- Min Filter cannot be greater that Max Filter
        if (filterMaxRepoIssuesRef.current.value !== ""
            && Number(filterMinRepoIssuesRef.current.value) >= Number(filterMaxRepoIssuesRef.current.value)) {
            //Show indication of issue fiter error
            issueFilterErrorAlert("add")
            return false;
        }

        //Filter the Repo Base on the Min and Max Fiter
    }

    const handleFilterRepoNameApi = (e) => {
        console.log(e)
        console.log(filterRepoNameRef.current.value);


        //Filter the Repo Base on the name
    }

    return (
        <section className={`${styles.repoViewWrapper} w-1/2 pr-4`}>
            <div className="pt-10">
                <h3 className="text-lg font-bold">Name of the Organization</h3>
                <form className="flex justify-start items-center mt-6">
                    <div className="mr-10">
                        <TextInput
                            ref={filterRepoNameRef}
                            type="text"
                            value={repoFilter.name}
                            dataset={{ target: "repoName" }}
                            className={`w-80 h-10 text-xs`}
                            eventType={['onKeyUp']}
                            onEvent={handleFilterRepoNameApi}
                            placeHolder={`Type to filter`}
                            label={{
                                text: "Filter repositories by name",
                                className: "mt-3 font-bold text-xs"
                            }}
                        />
                    </div>
                    <div className="mr-10 relative">
                        <label style={{ color: '#464A53' }} htmlFor="Filter by number of issues" className="mt-3 font-bold text-xs">
                            Filter by number of issues
                            {
                                filterIssueError ?
                                    <div className="animate__animated animate__fadeIn">
                                        <div className="tooltip absolute z-20 h-8 text-center text-white px-2 -top-8 -right-24 text-xs font-normal items-center flex">
                                            <p>Conflicting min and max values</p>
                                        </div>
                                        <StyledImage className="cursor-pointer top-1 -right-6 absolute"
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
                                    eventType={['onKeyPress']}
                                    onEvent={handleFilterRepoIssues}
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
                                    eventType={['onKeyPress']}
                                    onEvent={handleFilterRepoIssues}
                                    placeHolder={`Max`}
                                />
                            </div>
                        </div>
                    </div>
                </form>
                <div className="repo-table my-4">
                   <Table tableData={repoData} onHandlePreview={handlePreview}/> 
                </div>
            </div>
        </section>
    )

}

export default RepoView;