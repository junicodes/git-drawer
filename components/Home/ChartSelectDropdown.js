import styles from './Home.module.scss';
import React, { useRef, useState, useEffect } from "react";
import Preloader from '@/components/static-components/Preloader';
import { useAppContext, useDispatchAppContext } from '../../react-wrapper/Context/AppContext';
import TextInput from '../static-components/TextInput';
import CustomSelect from '../static-components/CustomSelect';
import TimelineChart from '../Charts/GoogleChart/TimelineChart';
import ScatterChart from '../Charts/HighChart/ScatterChart';
import PieChart from '../Charts/GoogleChart/PieChart';

const ChartSelectDropDown = ({ children }) => {

    //Use Context   
    const appContext = useAppContext();
    const dispatchAppContext = useDispatchAppContext();

    //Context State 
    const {selectedOrg} = appContext;

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

    const handleCustomSelect = (payload) => {
        dispatchAppContext({ type: "CURRENT_CHART_VIEW", payload: Number(payload.id) })
    }

    return (
        <form className="flex justify-start items-center mt-12">
            <div className="flex justify-between">
            <CustomSelect onEvent={handleCustomSelect} 
                customSelects={customSelects} 
                classes={`cursor-pointer`} 
                classWidth={`w-80 text-xs `} 
            />
            </div>
        </form>
    )

}

export default ChartSelectDropDown;