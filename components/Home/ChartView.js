import styles from './Home.module.scss';
import React, { useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../react-wrapper/Context/AppContext';
import TextInput from '../static-components/TextInput';
import CustomSelect from '../static-components/CustomSelect';
import TimelineChart from '../Charts/GoogleChart/TimelineChart';
import ScatterChart from '../Charts/HighChart/ScatterChart';
import PieChart from '../Charts/GoogleChart/PieChart';

const ChartView = ({ children }) => {

    //State
    const [currentChartView, setCurrentChartView] = useState(1)
    const [customSelects, setCustomSelects] = useState([
        {
            id: 1,
            title: 'Timeline plot',
        },
        {
            id: 2,
            title: 'Scatter dot plot',
        },
        {
            id: 3,
            title: 'Pie chart plot',
        }

    ])

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //Use Ref

    //Use Router

    //Event Functions

    const handleCustomSelect = (payload) => {
        setCurrentChartView(payload.id)
    }

    return (
        <section className={`${styles.chartViewWrapper} w-1/2 pl-4`}>
            <div className="pt-20">
                <form className="flex justify-start items-center mt-8">
                    <div className="flex justify-between">
                      <CustomSelect onEvent={handleCustomSelect} customSelects={customSelects} classes={`cursor-pointer`} classWidth={`w-80 text-xs `} />
                    </div>
                </form>
                {
                    {
                        1: <TimelineChart />,
                        2: <ScatterChart />,
                        3: <PieChart />
                    }[currentChartView]
                }
            </div>
        </section>
    )

}

export default ChartView;