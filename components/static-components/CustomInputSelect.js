import { Toast } from "../../helpers/toast"
import { useDispatch } from 'react-redux';
import { useAppContext, useDispatchAppContext } from "../../react-wrapper/Context/AppContext";
import { login_Action } from '../../react-wrapper/Redux/actions/authAction';
import TextInput from './TextInput';
import Textarea from '../static-components/Textarea';
import StyledImage from '../static-components/StyledImage';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from "react";
import React, { forwardRef } from 'react';
import Preloader from "./Preloader";



const CustomInputSelect = forwardRef(({ onEvent, classes, findUrl, type, className, label, placeholder, target }, ref) => {

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

            ref.current.value = payload.data;
            setShow(false);

            if(onEvent) {
                onEvent(payload)
            }

        }

    }

    const handleInputSelectChange = async (e) => {

        if(e.target.value === "") {
            setPreloader(false) 
            return setShow(false) 
        }
       
        setTimeout(() => {
            if(findUrl && e.target.value !== "") {

                const apiUrl = findUrl(e.target.value.trim())
    
                console.log(apiUrl)
                
                setPreloader(true) 
                setShow(true) 
    
                setTimeout(() => {
                    setCustomInputSelects([
                        {
                            id: 1,
                            data: 'No 15 block VI',
                        },
                        {
                            id: 2,
                            data: 'Opposite kracy Food',
                        },
                        {
                            id: 3,
                            data: '12 Genny Street',
                        },
                        {
                            id: 4,
                            data: '32 Track Street',
                        },
                        {
                            id: 5,
                            data: 'Block 27 Bram street',
                        }
                    ])
                    setPreloader(false) 
                }, 3000);
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
                    onEvent={handleInputSelectChange}
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
                            customInputSelects.length > 0 ?
                                customInputSelects.map((x, index) => (
                                    <div onClick={handleActionApi} data-action='drop' data-payload={JSON.stringify(x)} key={x.id} className={`text-left px-2 text-xs flex items-center custom-select cursor-pointer animate__animated animate__fadeIn`}>
                                        {x.data}
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