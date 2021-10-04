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

const PieChart = ({ data }) => {

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //Context State 
    const {selectedOrgRepos, filteredRepo, tableSelectedRepo} = appContext;
    const { github: { backupOrgRepo } } = useSelector((state) => state);
    const repo = tableSelectedRepo ? tableSelectedRepo : filteredRepo.tableLists[0];

    //State
    const [canRefresh, setCanRefresh] = useState("no-active");
    const [parameter, setParameter] = useState({
          series: [],
          options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: [],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
            }]
          }
    })

    //Use Effect

    useEffect(async () => {
        if(backupOrgRepo && backupOrgRepo.length) {
            setCanRefresh("loading")
            setParameter({...parameter, ...{
                series: [],
                options: {
                    ...parameter.options,
                    ['labels']: []
                }
            }})

            setTimeout( () => {
                // const result = await repoTopics();
                // console.log(result, "result")
                const seriesVal = repo.topics.map((x,index) => {
                    return (index + 2) * 10
                })

                //Set The state 
                setCanRefresh("no-active")
                setParameter({...parameter, ...{
                    series: seriesVal,
                    options: {
                        ...parameter.options,
                        ['labels']: repo.topics
                    }
                }})
            }, 500);
        }
    }, [backupOrgRepo, tableSelectedRepo]);
    
    //Use Router
    return (
        <>
            <section className={`${styles.scatterChartWrapper} w-full flex animate__animated animate__fadeIn scroller`}>
                <div className="w-full">
                    <figure className="highcharts-figure p-4 bg-white">
                        <p className="text-center text-lg">Repo Name: {repo.name}</p>
                        <div id="highchart_timeline">
                           <div className="app">
                                <div className="row">
                                    <div className="mixed-chart">
                                        {
                                            canRefresh == "loading" &&
                                            <div className="text-green-500 absolute top-36 z-50 left-1/2 transform -translate-x-4 cursor-pointer">
                                            <div className={`lds-ring flex justify-center`}>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                            </div>
                                        }
                                        {
                                            repo.topics.length <= 0 && <p className="text-center mt-20 text-red-400">No Topics Found</p>
                                        }
                                        <Chart
                                            options={parameter.options}
                                            series={parameter.series}
                                            type="pie"
                                            width="100%"
                                            height={repo.topics.length > 0 ? 400 : 100}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="chart-note text-center text-xs">
                           Representation of top most discussed topic for each repo
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


export default PieChart;