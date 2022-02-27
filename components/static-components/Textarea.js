import React, { forwardRef } from 'react'

const Textarea = forwardRef(({ onEvent, className, icon, dataset, name, placeHolder, note, eventType, value, label }, ref) => {

    const classSty = `${className} text-base border flex-1 block w-full`;

    const textareaChange = (e) => {
        if (onEvent) {
            return onEvent(e)
        }
    }

    return (
        <>
            <label style={{color: '#464A53'}} htmlFor={label} className="block text-sm font-medium my-2">
                {label}
            </label>
            <div className="mt-1 flex">
                {
                    eventType && (eventType.includes('onBlur') || eventType.includes('onKeyUp')) ?
                    <textarea
                        ref={ref}
                        name={name} id={name}
                        defaultValue={value ? value : ''}
                        className={classSty} 
                        onBlur={textareaChange} 
                        onKeyUp={textareaChange}
                        data-payload={JSON.stringify(dataset)}
                        placeholder={placeHolder}> 
                    </textarea> : null
                }
                {
                    !eventType ?
                    <textarea
                        ref={ref}
                        name={name} id={name}
                        className={classSty} 
                        defaultValue={value ? value : ''}
                        onChange={textareaChange} 
                        data-payload={JSON.stringify(dataset)}
                        placeholder={placeHolder}>
                    </textarea> : null
                }
                {
                    icon && 
                    <StyledImage className={icon.className + " cursor-pointer transform hover:scale-110 absolute"}
                        src={icon.file} width={14} height={14} 
                    />
                }
            </div>
            <small>{note || ""}</small> {/* <><span className="text-red-400">Hello this is the note</span></> */}
        </>
    )
})

export default Textarea;