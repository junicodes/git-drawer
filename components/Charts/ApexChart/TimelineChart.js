import styles from '../Chart.module.scss';
import React, { useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../../react-wrapper/Context/AppContext';
// import Chart from "react-google-charts";
import dayjs from 'dayjs';
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";

const Chart = dynamic(
    () => {
      return import("react-apexcharts");
    },
    { ssr: false }
);

const TimeChart = ({ data }) => {

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //Context State 
    const {selectedOrgRepos, filteredRepo} = appContext;
    const { github: { backupOrgRepo } } = useSelector((state) => state);

    //State
    const [canRefresh, setCanRefresh] = useState("no-active");
    const [parameter, setParameter] = useState({
        series: [
            {
              data: []
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
                    barHeight: '20%',
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

    useEffect(async () => {
        if(filteredRepo.tableLists ) {
            setParameter({...parameter, ['series']: [{data: [] }]})
            setCanRefresh("loading")

            if(filteredRepo.tableLists.length > 0) {
                setTimeout( async () => {
                    const result = await repoTimeline();
                    setCanRefresh("no-active")
                    setParameter({...parameter, ['series']: [{data: result }]})
                }, 500);
            }
        }
    }, [filteredRepo]);
    
      const repoTimeline = async () => {

            const data = [];

            filteredRepo.tableLists.map(x => {
                data.push({
                    x: x.name,
                    y: [
                        new Date(x.created_at).getTime(),
                        new Date(x.updated_at).getTime()
                    ]
                })
            });

            return data;
      };

    //Use Router

    return (
        <>
            <section className={`${styles.timeChartWrapper} w-full flex animate__animated animate__fadeIn scroller`}>
                <div className="w-full">
                    <figure className="highcharts-figure p-4 bg-white">
                        <div id="highchart_timeline">
                           <div className="app">
                                <div className="row">
                                    <div className="mixed-chart">
                                        {
                                            canRefresh == "loading" &&
                                            <div className="text-green-500 absolute top- top-36 z-50 left-1/2 transform translate-x-4 cursor-pointer">
                                            <div className={`lds-ring flex justify-center`}>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                            </div>
                                        }
                                        <Chart
                                            options={parameter.options}
                                            series={parameter.series}
                                            type="rangeBar"
                                            width="100%"
                                            height={filteredRepo.tableLists.length > 0 && filteredRepo.tableLists.length < 3 ? 150 : 350}
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
                           Representation of all respective repo timeline per page
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


export default TimeChart;