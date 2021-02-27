import InsurancePanel from "./InsurancePanel";
import AppHeader from './AppHeader';

import './HomePage.css';

export default function HomePage() {
    return (
        <div className="homePageContainer">
            <AppHeader heading="Insurance Panel"></AppHeader>
            <InsurancePanel></InsurancePanel>
        </div>
    );
};