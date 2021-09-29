
import React, { forwardRef } from 'react'
import StyledImage from './StyledImage';


const TextInput = forwardRef((
    { onEvent, className, icon, eventType, 
      dataset, label, name, type, placeHolder, 
      note, value, styles, disabled
    }, ref) => {

    const inputChange = (e) => {
        if (onEvent) {
            return onEvent(e)
        }
    }
    
    return (
        <>
            {
                label && 
                <label style={{color: '#464A53'}} htmlFor={label} className={label.className}>
                    {label.text}
                </label>
            }
            <div className="flex relative">

                {type == 'url' ?
                    <span className="inline-flex items-center px-3 rounded-l-md border text-gray-500">
                        http://
                    </span>
                    : null
                }

                {
                    icon && <StyledImage className={icon.class + " cursor-pointer transform hover:scale-110 absolute"}
                            src={icon.file} width={16} height={16} 
                        />
                }
                
                {
                    eventType && eventType.includes('onKeyUp')
                    ? 
                        <input ref={ref} type={type} name={name} id={name} defaultValue={value || ''} disabled={disabled | false}
                        className={className} styles={styles} onKeyUp={inputChange} data-payload={JSON.stringify(dataset)} placeholder={placeHolder} />
                    : null
                }
                {
                    eventType && eventType.includes("onKeyPress") 
                        ? 
                        <input ref={ref} type={type} name={name} id={name} defaultValue={value || ''} disabled={disabled || false}
                        className={className} onKeyPress={inputChange} data-payload={JSON.stringify(dataset)} placeholder={placeHolder} />
                        : null
                }

                {
                    eventType && eventType.includes("onChange") 
                        ? 
                        <input ref={ref} type={type} name={name} id={name} value={value || ''} disabled={disabled || false}
                        className={className} onChange={inputChange} data-payload={JSON.stringify(dataset)} placeholder={placeHolder} />
                        : null
                }
            
            </div>
            <small>{note || ""}</small> {/* <><span className="text-red-400">Hello this is the note</span></> */}
        </>
    )
})

export default TextInput;

//Assuming tailwind CSS
//Label default className = block text-sm font-medium
//Icon default className = mx-4 mt-3