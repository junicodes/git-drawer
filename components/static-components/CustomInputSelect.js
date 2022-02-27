import { useAppContext, useDispatchAppContext } from "../../react-wrapper/Context/AppContext";
import TextInput from './TextInput';
import { useState, useRef, useEffect } from "react";
import React, { forwardRef } from 'react';
import Preloader from "./Preloader";
import { useDispatch } from "react-redux";


const CustomInputSelect = forwardRef(({ onEvent, onFormatView, classes, apiFunc, type, className, label, placeholder, target }, ref) => {

    //Use Redux
    const dispatch = useDispatch();

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //State 
    const [show, setShow] = useState(false)
    const [preloader, setPreloader] = useState(true);
    const [ previewSelected, setPreviewSelected ] = useState("")
    const [customInputSelects, setCustomInputSelects] = useState([])

    //Event
    const handleActionApi = (e) => {

        const action = e.currentTarget.dataset.action;

        if(action === 'drop') {
            const payload = JSON.parse(e.currentTarget.dataset.payload);

            ref.current.value = payload.login;
            setShow(false);

            if(onEvent) {
                onEvent(payload)
            }

        }

    }

    const handleInputSelectChangeApi = async (e) => {

        setTimeout( async () => {
            if(e.target.value === "") {
                setPreloader(false) 
                return setShow(false) 
            }
           
            if(e.target.value !== "") {
    
                //Show Dropdown Preview
                setPreloader(true) 
                setShow(true) 

                //Restart the view interface
                if(onFormatView) {
                    onFormatView()
                }
                
                //Call an APi Here
                const result = await apiFunc(e.target.value.trim(), dispatchAppContext)
                
                //Remove Preloader 
                setPreloader(false) 
    
                if(result && result.status === 200) {
    
                    if(result.data.items.length < 0) {
                        return setCustomInputSelects({
                            id: 1,
                            login: 'No Organization found',
                        })
                    }
    
                    //Populate the dropdown 
                    setCustomInputSelects(result.data.items)
                }
    
            }
        }, 1000);
    }

    return (
        <div className="relative">

            <form className={`animate__animated animate__fadeIn w-full`}>
                <TextInput   
                    ref={ref}
                    type={type}
                    value={ref.current && ref.current.value}
                    dataset={{target}}
                    className={`${className} w-80 h-10 pl-8 text-xs`}
                    eventType={['onKeyUp']}
                    onEvent={handleInputSelectChangeApi}
                    placeHolder={placeholder}
                    icon={{
                        file: "/images/icons/search.svg",
                        class: "mx-2 mt-3"
                    }}
                />
            </form>
            {
                ( show && 
                    <div className={`dropdown border bg-white z-50 w-full mt-3 scroller absolute animate__animated animate__fadeIn`}>
                        {
                            customInputSelects && customInputSelects.length > 0 ?
                                customInputSelects.map((x, index) => (
                                    <div onClick={handleActionApi} data-action='drop' data-payload={JSON.stringify(x)} key={x.id} 
                                         className={`text-left px-2 py-6 text-sm flex items-center custom-select cursor-pointer animate__animated animate__fadeIn`}>
                                        <div className="mr-2">
                                            <img className="w-10 h-10 rounded-full" src={x.avatar_url} />
                                        </div>
                                        {x.login}
                                    </div>
                                ))
                            : null
                        }
                        <Preloader status={preloader} classSty="flex justify-center left-1/2 absolute bottom-12" />
                    </div>
                )
            }

            <style jsx>{`

                .custom-select {
                    transition: 1s all ease;
                    color: #111111;
                    font-family: Roboto;
                    backgorund: white;
                    height: 40px;
                    align-self: stretch;
                    flex-grow: 0;
                }

                .custom-select:hover {
                    background: #B2DAFF;
                    transform: scale(1.003);
                }

                .dropdown {
                    height: 200px;
                    background: #FFFFFF;
                    border: 1px solid #D3D3D3;
                    box-sizing: border-box;
                    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
                    border-radius: 4px;
                }
            
                @media screen and (max-width: 768px) {
                
                }
                    
                `}

            </style>

        </div>

    )

})


export default CustomInputSelect;