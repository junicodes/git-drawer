
import { useReducer, createContext, useContext } from 'react';

const AppContext = createContext();
const AppDispatchContext = createContext()

//Object Shared State Default Store
let sharedState = {
    preloaderStatus: false,
    selectedOrganization: null,
    
}

//Reducer to change state
const reducer = (state, action) => {
    switch (action.type) {
        case 'PRELODER':
            return sharedState = { ...sharedState, preloaderStatus: action.payload } 
        case 'SELECTED_ORGANIZATION':
            return sharedState = { ...sharedState, selectedOrganization: action.payload } 
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
