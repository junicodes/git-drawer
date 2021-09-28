import React, { forwardRef, useState } from 'react';
import StyledImage from '../static-components/StyledImage';
import { useAppContext, useDispatchAppContext } from '../../react-wrapper/Context/AppContext';
import Preloader from './Preloader';

const Table = ({paginate, onHandlePreview, onHandlePrev, onHandleNext }) => {

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //Context State 
    const {selectedOrg, selectedOrgRepos, filteredRepo, paginateRepo} = appContext;

    console.log(filteredRepo, filteredRepo.tableLists, "for the love")
    

    //State
   const [tableSorted, setTableSorted] = useState(false);
   const [currentSelected, setCurrentSelected] = useState(null);

    //Event

    const handleTableSort = (e) => {
        console.log(e, "tabel sorting")
        setTableSorted(!tableSorted)
    }

    const handleTableSelect = (e) => {

        const repo = JSON.parse(e.target.dataset.payload);
        
        //Mark the Selected Tabel with a highlight

        setCurrentSelected(repo.name)

        if(onHandlePreview) {
            return onHandlePreview(repo);
        }

    }

    return (
        <div className="w-full animate__animated animate__fadeIn relative">
            
            <table className="min-w-max w-full table-auto">

                <thead>
                    <tr className="header capitalize text-sm leading-normal">
                        {
                            filteredRepo.tableHeaders.map((header, index) => (
                                <th key={index} className="py-3 px-6 text-left cursor-pointer" onClick={handleTableSort}>
                                    <div className="flex justify-start">
                                        <p className="font-bold">{header.title}</p>     
                                        {
                                            header.icon && 
                                            <StyledImage className={`cursor-pointer mt-1 ml-1 transform ${tableSorted ? 'rotate-180' : 'rotate-0'}`}
                                            src={header.icon} width={10} height={10} /> 
                                        }
                                    </div>
                                </th>
                            ))
                        }
                    </tr>
                </thead>

                <tbody className="text-gray-600 text-sm font-light" >
                    {
                        filteredRepo.tableLists ?
                            filteredRepo.tableLists.length > 0 &&
                                filteredRepo.tableLists.map((repo, index) => (
                                    <tr key={repo.name} className={`${repo.name === currentSelected && "list-tr-active"} list-tr bg-white`} 
                                        onClick={handleTableSelect} >
                                        <td className="py-3 px-6 text-left" data-payload={JSON.stringify(repo)}>
                                            {repo.name}
                                        </td>
                                        <td className="py-3 px-6 text-left" data-payload={JSON.stringify(repo)}>
                                            {repo.open_issues_count}
                                        </td>
                                        <td className="py-3 px-6 text-left" data-payload={JSON.stringify(repo)}>
                                            {repo.stargazers_count}
                                        </td>
                                    </tr>
                                ))
                        : <Preloader status={true} classSty="flex justify-center mt-32 left-1/2 absolute" />
                    }
                </tbody>
            </table>

            {
                filteredRepo.tableLists && filteredRepo.tableLists.length > 0 &&
                <>
                    <div className="flex justify-end mt-4">
                        <p className="border border-red-50 p-2">Page {paginate.page}</p>
                    </div> 
                    <div className="flex justify-center">
                        <div onClick={(e) => onHandlePrev(e)}>
                            <StyledImage className="cursor-pointer mx-3 hover:scale-110 transform"
                                src="/images/icons/mdi_chevron-left.png" width={32} height={32} /> 
                        </div>

                        <div onClick={(e) => onHandleNext(e)}>
                            <StyledImage className="cursor-pointer mx-3 hover:scale-110 transform"
                                src="/images/icons/mdi_chevron-right.png" width={32} height={32} /> 
                        </div>
                    </div>
                </>
            }
 

        <style jsx>{`

                .header {
                    border-bottom: 2px solid #111111;
                    // box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.08);
                    transition: 1s all ease;
                }

                .header:hover {
                    // background: #e6e9f2;
                    transform: scale(1.006);
                }

                .list-tr {
                    border-bottom: 2px solid #F1F5F8;
                    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.08);
                    transition: 1s all ease;
                }

                .list-tr-active {
                    background: #e6e9f2;
                }

                .list-tr:hover {
                    background: #e6e9f2;
                    transform: scale(1.006);
                }
         
            `}

        </style>
    </div>
    )
}


export default Table;