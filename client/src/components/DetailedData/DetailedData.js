import React, { useState, useEffect } from 'react';
import Map from '../Map';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import zones from '../../data/data';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import './DetailedData.css';

export default function DetailedData({ data, handleBack, initialView }) {

    const [mapCenter, setMapCenter] = useState([-73.9495800, 40.6501000]);
    const [dataSet, setDataSet] = useState({});
    const [zone, setZone] = useState({});
    const [zoneColors, setZoneColors] = useState({});
    const [selectedZoneNum, setSelectedZoneNum] = useState(null);
    const [zonesDictionary, setZonesDictionary] = useState({});

    const getSelectedZoneNum = num => {
        setSelectedZoneNum(num);
    };

    useEffect(() => {
        if (data && zoneColors) {
            let zoneData = zones[data];
            let dictionary = {};
            zoneData.forEach(zone => {
                zone.zoneColor = zoneColors[zone.zoneNum] ? zoneColors[zone.zoneNum] : '#ff0000';
                dictionary[zone.zoneNum] = { coordinates: zone.coordinates, zoneNum: zone.zoneNum, zoneColor: zone.zoneColor};
            });
            setZonesDictionary(dictionary);
            setDataSet(zoneData);
        }
    }, [data, zoneColors])

    useEffect(() => {
        axios.get('https://hackaubg3.ew.r.appspot.com/results')
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

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectZone = (e) => {
        setAnchorEl(null);
        changeMapCenter(e);
    }

    useEffect(() => {
        if (zonesDictionary && selectedZoneNum) {
            setZone(zonesDictionary[selectedZoneNum]);
        }
    }, [zonesDictionary, selectedZoneNum])

    const updateZone = data => {
        setSelectedZoneNum(data);
    };

    return (
        <div className="insurancePanel">
            <main className="mainContentContainer">
                <section className="sidebarContainer">
                    <div className="dropdownMenu">
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className="sidebarListItem">
                            Select Zone
                            <ExpandMoreIcon></ExpandMoreIcon>
                        </Button>
                        <div className="selectedZone"> Selected zone: <br></br> <b>{ selectedZoneNum ? `zone${selectedZoneNum}` : '' }</b></div>
                        
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {
                                zones[data].map((zone, index) => 
                                    <MenuItem key={index} id={index} className={`dropDownItem clickable ${zone.zoneNum === selectedZoneNum ? 'active' : ''}`} onClick={handleSelectZone}>zone{zone.zoneNum}</MenuItem>
                                )
                            }
                        </Menu>
                    </div>

                    <div className="sidebarListItem clickable backButton" onClick={handleBack}>
                        <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
                        Go Back
                    </div>
                </section>
                <section className="dataContainer">
                    <p className="legend">
                        Legend: <span className="safeZone">Low-risk zone</span> <span className="lowRisk">Medium-risk zone</span> <span className="highRisk">High-risk zone</span>
                    </p>
                    <Map center={mapCenter} zone={zone} initialView={initialView} getSelectedZone={getSelectedZoneNum} updateZone={updateZone}></Map>                    
                </section>
            </main>
        </div>
    )
}