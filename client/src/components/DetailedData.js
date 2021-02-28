import { useState, useEffect } from 'react';
import Map from './MapTest';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import zones from '../data/data';
import axios from 'axios';

import './DetailedData.css';

export default function DetailedData({ data, handleBack, initialView }) {

    const [mapCenter, setMapCenter] = useState([-73.9495800, 40.6501000]);
    const [dataSet, setDataSet] = useState({});
    const [zone, setZone] = useState({});
    const [zoneColors, setZoneColors] = useState({});

    useEffect(() => {
        if (data && zoneColors) {
            let zoneData = zones[data];
            zoneData.forEach(zone => {
                zone.zoneColor = zoneColors[zone.zoneNum] ? zoneColors[zone.zoneNum] : '#ff0000';
            });
            setDataSet(zoneData);
        }
    }, [data, zoneColors])

    useEffect(() => {
        axios.get('https://hackaubg3.ew.r.appspot.com/test')
            .then((response) => {
                let tempColors = {};
                response.data.data.map((zoneInfo) => {
                    return tempColors[zoneInfo.district] = zoneInfo['risk_class'] === 'low' ? '#00ff00' : zoneInfo['risk_class'] === 'medium' ? '#ffff00' : '#ff0000';
                })

                setZoneColors(tempColors);
            })
            .catch((error) => console.log(error));
    }, [])

    const changeMapCenter = (e) => {
        setMapCenter([Number(e.target.dataset.lat),Number(e.target.dataset.lng)]);
        setZone(dataSet[e.target.id]);
    };

    return (
        <div className="insurancePanel">
            <main className="mainContentContainer">
                <section className="sidebarContainer">
                    {
                        zones[data].map((zone, index) => 
                            <div key={index} id={index} className="sidebarListItem clickable" onClick={changeMapCenter}>zone{zone.zoneNum}</div>
                        )
                    }

                    <div className="sidebarListItem clickable backButton" onClick={handleBack}>
                        <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
                        Go Back
                    </div>
                </section>
                <section className="dataContainer">
                    <p className="legend">
                        Legend: <span className="safeZone">Safe zone</span> <span className="lowRisk">Low-risk zone</span> <span className="highRisk">High-risk zone</span>
                    </p>
                    <Map center={mapCenter} zone={zone} initialView={initialView}></Map>                    
                </section>
            </main>
        </div>
    )
}