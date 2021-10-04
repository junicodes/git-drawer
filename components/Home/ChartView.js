import styles from './Home.module.scss';
import React, { useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../react-wrapper/Context/AppContext';
import TextInput from '../static-components/TextInput';
import CustomSelect from '../static-components/CustomSelect';
import TimelineChart from '../Charts/ApexChart/TimelineChart';
import ScatterChart from '../Charts/HighChart/ScatterChart';
import PieChart from '../Charts/ApexChart/PieChart';
import { useSelector, useDispatch } from "react-redux";


const ChartView = ({ children }) => {

    //Redux State
    const { github: { backupOrgRepo } } = useSelector((state) => state);

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();
    
    //Context State 
    const {selectedOrg, selectedOrgRepos, currentChartView} = appContext;

    //State
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

    //Use Ref

    //Use Router

    //Event Functions

    return (
        <>
            {
                selectedOrg && backupOrgRepo && backupOrgRepo.length > 0 &&
                {
                    
                    1: <TimelineChart />,
                    2: <ScatterChart />,
                    3: <PieChart />

                }[currentChartView]
            }
        </>
    )

}

export default ChartView;