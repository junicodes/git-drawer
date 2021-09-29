import styles from '../Chart.module.scss';
import React, { useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../../react-wrapper/Context/AppContext';
import Chart from "react-google-charts";

const PieChart = ({ data }) => {

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //Use Effect

    //Use Router

    return (
        <>
            <section className={`${styles.pieChartWrapper} w-full flex items-center my-4 bg-white animate__animated animate__fadeIn`}>
                <div id="pie" className="w-full p-4">
                    Pie Chart 
                    <div className="flex justify-between">
                        <p style={{color: '#555456'}} className="text-xs">Create Time</p>
                        <p style={{color: '#555456'}} className="text-xs">Last activity</p>
                    </div>
                </div>

                <style>{`
                
                //   svg g:first-of-type path {
                //     stroke: none;
                //   }
                //   svg g:first-of-type rect{
                //     stroke: #e6e6e6;
                //   }
                //   svg g:first-of-type rect {
                //     fill-opacity: 0;
                //   }
                //   svg g:first-of-type rect:not(:last-child) {
                //     fill: #ffffff;
                //   }
                  
                `}</style>
            </section>
            <p className="chart-note text-center text-xs">
                Representation of all trending topic for all respective repo. 
            </p>
        </>
    )

}


export default PieChart;