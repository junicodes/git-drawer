import styles from '../Chart.module.scss';
import React, { useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../../react-wrapper/Context/AppContext';
import Chart from "react-google-charts";

const TimelineChart = ({ data }) => {

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //Use Effect

    //Use Router

    return (
        <>
            <section className={`${styles.timlineChartWrapper} w-full flex items-center my-4 bg-white animate__animated animate__fadeIn`}>
                <div id="timeline" className="w-full p-4">
                    <Chart
                        width={'100%'}
                        chartType="Timeline"
                        loader={
                            <div className={`lds-ring flex justify-center pt-20 pb-28`}>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        }
                        data={[
                            [
                                { type: 'string', id: 'Name' },
                                { type: 'date', id: 'Start' },
                                { type: 'date', id: 'End' },
                            ],
                            
                            [   'John Adams',
                                new Date(1797, 2, 4), 
                                new Date(1801, 2, 4)
                            ],
                            [
                                'George Washington',
                                new Date(1789, 3, 30),
                                new Date(1797, 2, 4),
                            ],
                            
                            [
                                'Thomas Jefferson',
                                new Date(1801, 2, 4),
                                new Date(1809, 2, 4),
                            ]
                        ]}
                        options={{
                            colors: ['#0085FF', '#555456', '#0085FF'],
                            timeline: {
                                groupByRowLabel: false,
                                showRowLabels: false,
                                colorByRowLabel: false
                            },
                            avoidOverlappingGridLines: false,
                            backgroundColor: '#fff',
                            alternatingRowStyle: false,
                            forceIFrame: false,
                            barLabelStyle: { fontName: 'Garamond', fontSize: 14 },
                        }}
                        rootProps={{ 'data-testid': '4' }}
                    />
                    <div className="flex justify-between">
                        <p style={{color: '#555456'}} className="text-xs">Create Time</p>
                        <p style={{color: '#555456'}} className="text-xs">Last activity</p>
                    </div>
                </div>


                <style>{`
                
                  svg g:first-of-type path {
                    stroke: none;
                  }
                  svg g:first-of-type rect{
                    stroke: #e6e6e6;
                  }
                  svg g:first-of-type rect {
                    fill-opacity: 0;
                  }
                  svg g:first-of-type rect:not(:last-child) {
                    fill: #ffffff;
                  }
                  
                `}</style>
            </section>
            <p className="chart-note text-center text-xs">
                Representation of all respective repo timeline 
            </p>
        </>
    )

}


export default TimelineChart;