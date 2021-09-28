
import { useReducer, createContext, useContext } from 'react';

const AppContext = createContext();
const AppDispatchContext = createContext()

//Object Shared State Default Store
let sharedState = {
    preloaderStatus: false,
    currentChartView: 1,
    selectedOrg: null,
    selectedOrgRepos: null,
    filteredRepo: {
        tableHeaders: [
            { 
                title: 'Repository',
                icon: "/images/icons/dropdown-arrow.svg"
            },
            { title: 'Open issues' },
            { title: 'Stars' }
        ],

        tableLists: null,
    },
    paginateRepo: {
        start: 0,
        size: 5,
        page: 1
    },
    
}

//Reducer to change state
const reducer = (state, action) => {
    switch (action.type) {
        case 'PRELODER':
            return sharedState = { ...sharedState, preloaderStatus: action.payload } 
        case 'CURRENT_CHART_VIEW':
            return sharedState = { ...sharedState, currentChartView: action.payload } 
        case 'SELECTED_ORG':
            return sharedState = { ...sharedState, selectedOrg: action.payload } 
        case 'SELECTED_ORG_REPO':
            return sharedState = { ...sharedState, selectedOrgRepos: action.payload } 
        case 'FILTERED_REPO':
            return sharedState = { ...sharedState, filteredRepo: {...state.filteredRepo, ...action.payload } } 
        case 'PAGINATE_REPO':
            return sharedState = { ...sharedState, paginateRepo: {...state.paginateRepo, ...action.payload } } 
        default:
            throw new Error(`Unknown action: ${action.type}`)
    }
}


//Set context info
export function AppProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, sharedState);

    return (
        <AppDispatchContext.Provider value={dispatch}>
            <AppContext.Provider value={state}>
                {children}
            </AppContext.Provider>
        </AppDispatchContext.Provider>
    );

}

//Get the context info 
export const useAppContext = () => useContext(AppContext)
export const useDispatchAppContext = () => useContext(AppDispatchContext)

//the above ia just a way of simplyfying things so that in the respectve components you can just type useAppContext() 
//instead of setting the useContext again                                                         
