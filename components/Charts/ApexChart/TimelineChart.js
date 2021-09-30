import styles from '../Chart.module.scss';
import React, { useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../../react-wrapper/Context/AppContext';
// import Chart from "react-google-charts";
import dayjs from 'dayjs';
import dynamic from "next/dynamic";

const Chart = dynamic(
    () => {
      return import("react-apexcharts");
    },
    { ssr: false }
);

const ScatterChart = ({ data }) => {

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //State
    const [parameter, setParameter] = useState({
        series: [
            {
              data: [
                {
                  x: 'Code',
                  y: [
                    new Date('2019-03-02').getTime(),
                    new Date('2019-03-04').getTime()
                  ]
                },
                {
                  x: 'Test',
                  y: [
                    new Date('2019-03-04').getTime(),
                    new Date('2019-03-08').getTime()
                  ]
                },
                {
                  x: 'Validation',
                  y: [
                    new Date('2019-03-08').getTime(),
                    new Date('2019-03-12').getTime()
                  ]
                },
                {
                  x: 'Code Boxing',
                  y: [
                    new Date('2019-03-06').getTime(),
                    new Date('2019-03-08').getTime()
                  ]
                },
                {
                    x: 'Review',
                    y: [
                      new Date('2019-03-02').getTime(),
                      new Date('2019-03-04').getTime()
                    ]
                },
                {
                    x: 'Mangament Confirm',
                    y: [
                        new Date('2019-03-2').getTime(),
                        new Date('2019-03-18').getTime()
                    ]
                },
                {
                    x: 'Project Mapping',
                    y: [
                      new Date('2019-03-05').getTime(),
                      new Date('2019-03-12').getTime()
                    ]
                },
                {
                    x: 'CEO Ative',
                    y: [
                        new Date('2019-03-25').getTime(),
                        new Date('2019-03-30').getTime()
                    ]
                },
                {
                    x: 'Review Frimness', 
                    y: [
                      new Date('2019-03-14').getTime(),
                      new Date('2019-03-24').getTime()
                    ]
                },
                {
                    x: 'Mangament',
                    y: [
                        new Date('2019-03-11').getTime(),
                        new Date('2019-03-19').getTime()
                    ]
                },
                {
                    x: 'Project Checking',
                    y: [
                      new Date('2019-03-08').getTime(),
                      new Date('2019-03-15').getTime()
                    ]
                },
                {
                    x: 'CEO Clearance',
                    y: [
                        new Date('2019-03-03').getTime(),
                        new Date('2019-03-27').getTime()
                    ]
                }
              ]
            }
          ],
          options: {
            chart: {
              height: 350,
              type: 'rangeBar'
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    // distributed: true,
                    barHeight: '40%',
                    dataLabels: {
                        hideOverflowingLabels: false
                    }
                }
            },
            // dataLabels: {
            //     enabled: true,
            //     formatter: function(val, opts) {
            //       var label = opts.w.globals.labels[opts.dataPointIndex]
            //       var a = dayjs(val[0])
            //       var b = dayjs(val[1])
            //       var diff = b.diff(a, 'days')
            //       return label + ': ' + diff + (diff > 1 ? ' days' : ' day')
            //     },
            //     style: {
            //       colors: ['#111111', '#111111']
            //     }
            // },
            fill: {
                type: 'gradient',
                gradient: {
                  shade: 'light',
                  type: 'vertical',
                  shadeIntensity: 0.25,
                  gradientToColors: undefined,
                  inverseColors: true,
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [50, 0, 100, 100]
                }
            },
            xaxis: {
              type: 'datetime'
            },
            yaxis: {
                show: false
            },
            grid: {
                row: {
                    colors: ['#f3f4f5', '#fff'],
                    opacity: 1
                }
            },
            stroke: {
                width: 1
              },
            fill: {
                type: 'solid',
                opacity: 0.6,
                color: "red"
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left'
              }
          },
    })

    //Use Effect
    useEffect(() => {
      
    }, [data])

    //Use Router

    return (
        <>
            <section className={`${styles.scatterChartWrapper} w-full flex animate__animated animate__fadeIn scroller`}>
                <div className="w-full">
                    <figure className="highcharts-figure p-4 bg-white">
                        <div id="highchart_timeline">
                           <div className="app">
                                <div className="row">
                                    <div className="mixed-chart">
                                        <Chart
                                            options={parameter.options}
                                            series={parameter.series}
                                            type="rangeBar"
                                            width="100%"
                                            height={350}
                                        />
                                    </div>
                                </div>
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