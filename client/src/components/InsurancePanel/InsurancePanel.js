import React from 'react';
import UserPic from '../../assets/john-doe.png';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HelpIcon from '@material-ui/icons/Help';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import SettingsIcon from '@material-ui/icons/Settings';
import { useHistory } from 'react-router-dom';
import './InsurancePanel.css';

export default function InsurancePanel({ handleSelect }) {

    const history = useHistory(null);

    const handleClick = (e) => {
        console.log(e.target.dataset.city);
        handleSelect(e.target.dataset);
    };

    const handleLogOut = () => {
        history.push('/');
    };

    return (
        <div className="insurancePanel">
            <div className="leftSide">
                <img src={UserPic} alt="user" className="userPicture"></img>
                <p>Welcome, <b>John Doe</b></p> <br></br> <br></br>
                <MailOutlineIcon></MailOutlineIcon>Mail Box <br></br> <br></br>
                <HelpIcon></HelpIcon>Contact Support <br></br> <br></br>
                <AnnouncementIcon></AnnouncementIcon> What`s new
                <SettingsIcon className="logOut"></SettingsIcon><span className="clickable" onClick={handleLogOut}>Log out</span>
            </div>
            <div className="rightSide">
                <b><h2>Dashboard</h2></b>
                <div className="options">
                    <div className="optionItem clickable" data-city="Chicago" data-initialview="-87.62357559764882, 41.87300850720308" onClick={handleClick}>View Chicago</div>
                    <div className="optionItem clickable" data-city="London">View London</div>
                    <div className="optionItem clickable" data-city="Sofia">View Sofia</div>
                </div>
            </div>
        </div>
    );
;}