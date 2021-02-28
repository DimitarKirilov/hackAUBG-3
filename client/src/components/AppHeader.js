import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import StolenLogo from '../assets/stolen_logo.png';

import './AppHeader.css';

export default function AppHeader({ heading }) {
    return (
        <header className="insurancePanelHeader">
            <h2>{heading}</h2>
            <img src={StolenLogo} alt="company logo" className="logo"></img>
            <div className="iconContainer">
                <IconButton className="profileIcon">
                    <AccountCircleIcon></AccountCircleIcon>
                </IconButton>
                <label className="clickable">Profile</label>
            </div>
        </header>
    );
};