import { useState } from 'react';
import InsurancePanel from "./InsurancePanel";
import AppHeader from './AppHeader';
import DetailedData from './DetailedData';

import './HomePage.css';

export default function HomePage() {

    const [showPanel, setShowPanel] = useState(true);
    const [dataSet, setDataSet] = useState('');
    const [initialView, setInitialView] = useState([]);

    const handleSelect = data => {
        setShowPanel(false);
        setDataSet(data.city);
        setInitialView([Number(data.initialview.split(', ')[0]), Number(data.initialview.split(', ')[1])])
    };

    return (
        <div className="homePageContainer">
            <AppHeader heading="Insurance Panel"></AppHeader>
            {
                showPanel ?
                <InsurancePanel handleSelect={handleSelect}></InsurancePanel>
                :
                <DetailedData handleBack={() => setShowPanel(true)} data={dataSet} initialView={initialView}></DetailedData>
            }
        </div>
    );
};