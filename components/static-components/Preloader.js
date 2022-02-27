import React, { useState, useRef, useEffect } from 'react'
import { useAppContext, useDispatchAppContext } from '../../react-wrapper/Context/AppContext';


const Preloader = ({ status, classSty }) => {
    //State Manage
    // const [progress, setProgress] = useState(0)

    //Create Ref
    const ref = useRef(null);

    //Use Context
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    return (
        <>
            {
                status ? 
                    <div className={`${classSty} lds-ring`}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                : null
            }
        </>
    )
}

export default Preloader