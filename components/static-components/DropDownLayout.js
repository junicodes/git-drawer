import { Toast } from "../../helpers/toast"
import { useDispatch } from 'react-redux';
import { useAppContext, useDispatchAppContext } from "../../react-wrapper/Context/AppContext";
import { login_Action } from '../../react-wrapper/Redux/actions/authAction';
import InputDefault from './TextInput';
import Textarea from '../static-components/Textarea';
import StyledImage from '../static-components/StyledImage';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from "react";
import PrimaryBtn from '@/components/static-components/PrimaryBtn';

const DropDownLayout = ({onEvent, showDropDown}) => {
    const {children, type, inlineStyle, classes, count} = showDropDown;

    //Event
    const handleActionApi = (e) => {
        if(onEvent) {
            onEvent(e)
        }
    }
    return (
        <div style={inlineStyle} className={`${classes} absolute right-0 bg-white p-2 md:p-6 -mt-6 animate__animated animate__fadeIn`}>

            {
               count &&
                <div className="flex justify-between pb-6">
                    <p className="text-sm md:text-base"> {count} <span className="capitalize">{type}</span> </p>
                    <p onClick={handleActionApi} data-action={ type === 'message' ? 'mark-as-read' : 'clear-all' } className="text-sm md:text-base">
                        { type === 'message' ? 'Mark As Read' : 'Clear all' }
                    </p>
                    
                </div>
            }
            
            <div className=" h-60 scroller">
                 {children}
            </div>

            {
                count && 
                <p onClick={handleActionApi} data-action="see-more" className="text-sm md:text-base absolute right-0 mr-6 bottom-4 underline cursor-pointer">
                    See More 
                </p>
            }

            <style jsx>{`

                .dropdown {
                    width: 441px;
                    height: 340px;
                    margin-right: 10px;
                }
                .dropdownMsg {
                    width: 233px;
                    height: 146.18px;
                    margin-right: 10px;
                }
                .link-tab {
                    background: green;
                }
                .link-tab:hover{
                    background: red;
                }

                
                @media screen and (max-width: 768px) {
                    .dropdown {
                        width: 95%;
                    }
                }
                    
                `}

            </style>
        </div>

    )

}


export default DropDownLayout;