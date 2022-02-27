import styles from '../Chart.module.scss';
import React, { useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../../react-wrapper/Context/AppContext';
import Chart from "react-google-charts";
import dayjs from 'dayjs';


const ScatterChart = ({ data }) => {

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //Use Effect
    useEffect(() => {
        Highcharts.chart('highchart_timeline', {
            chart: {
                type: 'timeline'
            },
            title: {
                text: 'Repo Timeline Chart'
            },
            xAxis: {
                type: 'datetime',
                visible: true
            },
            series: [{
                data: [{
                    x: Date.UTC(2021, 5, 22),
                    label: 'Event label',
                    description: 'Description of this event.',
                    dataLabels: {
                        color: '#78f',
                        borderColor: 'blue',
                        backgroundColor: '#444',
                        connectorWidth: 2,
                        connectorColor: 'blue',
                        style: {
                            textOutline: 0
                        }
                    }
                }, {
                    x: Date.UTC(2021, 5, 24),
                    label: 'Next event label',
                    description: 'Description of second event.'
                }, {
                    x: Date.UTC(2021, 5, 26),
                    label: 'Last event label',
                    description: 'Description of third event.'
                }]
            }]
        
        });
    }, [data])

    //Use Router

    return (
        <>
            <section className={`${styles.scatterChartWrapper} w-full flex animate__animated animate__fadeIn scroller`}>
                <div className="w-full">
                    <figure className="highcharts-figure p-4 bg-white">
                        <div id="highchart_timeline">
                            <div className={`lds-ring flex justify-center pt-20 pb-28`}>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <p style={{color: '#555456'}} className="text-xs">Create Time</p>
                            <p style={{color: '#555456'}} className="text-xs">Last activity</p>
                        </div>
                        <p className="chart-note text-center text-xs">
                           Representation of all respective repo timeline 
                        </p>
                    </figure>
                </div>
                <style>{`
                
                .highcharts-figure, .highcharts-data-table table {
                    min-width: 360px; 
                    max-width: 800px;
                    margin: 1em auto;
                  }
                  
                  .highcharts-data-table table {
                      font-family: Verdana, sans-serif;
                      border-collapse: collapse;
                      border: 1px solid #EBEBEB;
                      margin: 10px auto;
                      text-align: center;
                      width: 100%;
                  }
                  .highcharts-data-table caption {
                    padding: 1em 0;
                    font-size: 1.2em;
                    color: #555;
                  }
                  .highcharts-data-table th {
                      font-weight: 600;
                    padding: 0.5em;
                  }
                  .highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
                    padding: 0.5em;
                  }
                  .highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
                    background: #f8f8f8;
                  }
                  .highcharts-data-table tr:hover {
                    background: #f1f7ff;
                  }
                  
                `}</style>
            </section>
        </>
    )

}


export default ScatterChart;