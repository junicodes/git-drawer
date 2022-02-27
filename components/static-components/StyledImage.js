import React, { forwardRef } from 'react'

const StyledImage = forwardRef(({ onEvent, aos, dataset, className, noShadow, src, alt, width, height }, ref) => {

    const classSty = `${className}`;

    const event = (e) => {
        if (onEvent) {
            return onEvent(e)
        }
    }

    return (    
        <>
             <img ref={ref} data-aos={aos ? aos : null} data-aos-duration={aos ? "1000" : null} 
                    style={{boxShadow: `${noShadow ? '0px 4px 16px rgba(84, 92, 92, 0.1)' : null}`}}
                    className={classSty}
                    src={src}
                    alt={alt}
                    data-payload={dataset}
                    width={width}
                    height={height} 
                    onClick={event}
                    onError={(e) => {
                         e.target.classList.remove('object-cover');e.target.classList.add('object-contain')
                         e.target.src ='/images/app-logo/logo-icon.svg' 
                    }} //e.target.classList.remove('object-cover');e.target.classList.add('object-contain')
            />

            <style jsx>{`                  
            .styleImg {
                background: url(/images/round-preloader-unscreen.gif) no-repeat center;
                background-size: cover;
            }
            .imgBlock {
                width: 100%;
                height: 150px;
            }

            .img {
                width: 100%;
                height: 100%;
            }
        `}
        </style>
        </>
    )
})

export default StyledImage;