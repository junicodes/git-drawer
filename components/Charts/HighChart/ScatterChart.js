import styles from '../Chart.module.scss';
import React, { useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../../react-wrapper/Context/AppContext';
import Chart from "react-google-charts";
import { getTotalOpenIssueCount, getTotalClosedIssueCount } from "../../../helpers/api-routes/v1";
import pLimit from 'p-limit'
import { Toast } from "../../../helpers/toast"
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";


const ScatterChart = ({ data }) => {

  //Use Context   
  const appContext = useAppContext();
  const dispatchAppContext = useDispatchAppContext();

  //Redux State
  const { github: { backupOrgRepo } } = useSelector((state) => state);

  //Context State 
  const { selectedOrg, selectedOrgRepos, filteredRepo } = appContext;

  //State
  const [canRefresh, setCanRefresh] = useState(false);
  const [chartValues, setChartValues] = useState({
    lessThan100: [],
    lessThan10percent: [],
    lessThan25percent: [],
    greaterThan25percent: []
  })


  //Use Effect
  useEffect(() => {
    Highcharts.chart('scatter', {
      chart: {
        type: 'scatter',
        zoomType: 'xy'
      },
      title: {
        text: 'Open Issue To Close Issue Of All Organization Repository'
      },
      // subtitle: {
      //   text: 'Source: Heinz  2003'
      // },
      xAxis: {
        title: {
          enabled: true,
          text: 'Close Issues'
        },
        startOnTick: false,
        endOnTick: false,
        showLastLabel: false
      },
      yAxis: {
        title: {
          text: 'Open Issues'
        }
      },
      // legend: {
      //   layout: 'vertical',
      //   align: 'left',
      //   verticalAlign: 'bottom',
      //   x: 100,
      //   y: 50,
      //   floating: true,
      //   backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
      //   borderWidth: 1
      // },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            dataLabels: {
              format: "{point.name}",
              enabled: true,
              // formatter: function() {
              //   return this.point.name;
              // }
            },
            enableMouseTracking: false,
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)'
              }
            }
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          },
          tooltip: {
            // '<b>{series.name}</b><br>'
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '<p style="color: #0085FF; text-transform: capitalize;"><b>Repo Name</b>: {point.name}</p><br>({point.y} open issues), ({point.x} close issues)'
            // formatter:function(){
            //     console.log(this);
            //     return 'll';
            // }
          }
        }
      },
      series: [
        {
          name: 'Close Issues Less than 100',
          color: 'black',
          data: chartValues.lessThan100

        }, {
          name: 'Not More than 10%',
          color: 'green',
          data: chartValues.lessThan10percent
        }, {
          name: 'Not More than 25%',
          color: 'yellow',
          data: chartValues.lessThan25percent
        }, {
          name: 'Greater than 25%',
          color: 'red',
          data: chartValues.greaterThan25percent
        }]
    });
  }, [chartValues])

  useEffect(async () => {
    if (filteredRepo.tableLists && filteredRepo.tableLists.length) {
      await getData();
    }
  }, [filteredRepo]);

  async function getData() {

    let data = {
      lessThan100: [],
      lessThan10percent: [],
      lessThan25percent: [],
      greaterThan25percent: []
    };

    let token = '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';
    let total = 0;
    let error = false;


      try {

        Promise.all(
            filteredRepo.tableLists.map( async element => {

              let open = await (await fetch(getTotalOpenIssueCount(`${selectedOrg.login}/${element.name}`), {
                headers: {
                  Authorization: `token ${token}`
                }
              })).json();
        
              let close = await (await fetch(getTotalClosedIssueCount(`${selectedOrg.login}/${element.name}`), {
                headers: {
                  Authorization: `token ${token}`
                }
              })).json();
              
              total = open.total_count + close.total_count;

              if(total === NaN || open.total_count === undefined || close.total_count === undefined) {
                console.log("error")
                return error = true;
              }

              //calculate for repo close issue less than 100 //Color black
              if(open.total_count < 100) {
                return data = {...data, ['lessThan100']: [
                  ...data.lessThan100,
                  { x: close.total_count, y: open.total_count, name: element.name }
                ]}
              }

              //calculate for repo according to the fraction of open issue relative to all(open and close issue)
              const computResult = open.total_count/total * 100;

              // not more than 10% //Color green
              if(Math.ceil(computResult) < 10) {
                return data = {...data, ['lessThan10percent']: [
                  ...data.lessThan10percent,
                  { x: close.total_count, y: open.total_count, name: element.name }
                ]}
              }

              //not more than 25% //Color yellow
              if(Math.ceil(computResult) >= 10 && Math.ceil(computResult) < 25) {
                return data = {...data, ['lessThan25percent']: [
                  ...data.lessThan10percent,
                  { x: close.total_count, y: open.total_count, name: element.name }
                ]}
              }

              //not more than 25% //Color yellow
              if(Math.ceil(computResult) >= 25) {
                return data = {...data, ['greaterThan25percent']: [
                  ...data.lessThan10percent,
                  { x: close.total_count, y: open.total_count, name: element.name }
                ]}
              }
                
            })
          ).then(() => {
            //Validate the date to prevent undefine values
            if(error ) {
              setChartValues({
                lessThan100: [],
                lessThan10percent: [],
                lessThan25percent: [],
                greaterThan25percent: []
              })
              setCanRefresh(true)
              return Toast("dark", "top-right", 
              "Ooops!... an unexpected error occured, github rate limit error, please refresh and try again.");
            }

            //Update thr state
            setCanRefresh(false)
            setChartValues(data)
        })
        
      } catch (error) {
        Toast("dark", "top-right", "A unexpected error has occured, please refresh, check internet connection and try again or contact support.");
      }

  }

  return (
    <>
      <section className={`${styles.scatterChartWrapper} w-full flex animate__animated animate__fadeIn scroller`}>
        <div className="w-full relative">
          {
            canRefresh &&
            <p onClick={getData} className="text-green-500 absolute top-52 z-50 left-1/2 transform -translate-x-4 cursor-pointer">Refresh</p>
          }
          
          <figure className="highcharts-figure p-4 bg-white">
            <div id="scatter">
              <div className={`lds-ring flex justify-center pt-20 pb-28`}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <p className="chart-note text-center text-xs">
              Representation of open and close issue for all respective repos.
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