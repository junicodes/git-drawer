import { Toast } from "../../helpers/toast"
import { useDispatch } from 'react-redux';
import { useAppContext, useDispatchAppContext } from "../../react-wrapper/Context/AppContext";
import { login_Action } from '../../react-wrapper/Redux/actions/authAction';
import StyledImage from '../static-components/StyledImage';
import { useState, useRef, useEffect } from "react";

const CustomSelect = ({ onEvent, customSelects, classes, classWidth }) => {

    //State 
    const [show, setShow] = useState(false)
    const [ previewSelected, setPreviewSelected ] = useState(customSelects[0].title)

    //Event
    const handleActionApi = (e) => {
        console.log(e)

        const action = e.currentTarget.dataset.action;
        console.log(action)

        if(action === 'show') {
            return setShow(!show ? true : false) 
        }

        if(action === 'drop') {
            const payload = JSON.parse(e.currentTarget.dataset.payload);
            console.log(payload)
            
            setPreviewSelected(payload.title)
            setShow(false);

            if(onEvent) {
                onEvent(payload)
            }

        }

    }

    return (
        <div className="relative">

            <div onClick={handleActionApi} data-action='show' 
                className={`${classWidth} custom-select-sty flex justify-between items-center px-2 animate__animated animate__fadeIn `} title={previewSelected ? previewSelected : 'Select a date'}>
                <p className="truncate">{previewSelected}</p> 
                <StyledImage className="cursor-pointer"
                    src="/images/icons/dropdown-arrow.svg"
                    width={8} height={4} 
                />
            </div>
            
            {
                ( show && 
                    <div className={`${classWidth} absolute border bg-white z-50`}>
                        {
                            customSelects.map((x, index) => (
                                <div onClick={handleActionApi} data-action='drop' data-payload={JSON.stringify(x)} key={x.id} className={`text-left flex items-center px-3 py-1 ${index != 0 && 'mt-2'} custom-select text-primaryDarkGray`}>
                                    {x.title}
                                </div>
                            ))
                        }
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

}


export default CustomSelect;