import AppHeader from './AppHeader';
import Map from './MapTest';

import './DetailedData.css';

export default function DetailedData() {
    return (
        <div className="insurancePanel">
            <AppHeader heading="Dataset for New York city"></AppHeader>
            <main className="mainContentContainer">
                <section className="sidebarContainer">
                    <div className="sidebarListItem clickable">Brooklyn</div>
                    <div className="sidebarListItem clickable">The Bronx</div>
                    <div className="sidebarListItem clickable">Manhattan</div>
                    <div className="sidebarListItem clickable">Queens</div>
                    <div className="sidebarListItem clickable">State Island</div>
                </section>
                <section className="dataContainer">
                    <p className="legend">
                        Legend: <span className="safeZone">Save zone</span> <span className="lowRisk">Low-risk zone</span> <span className="highRisk">High-risk zone</span>
                    </p>
                    <Map></Map>                    
                </section>
            </main>
        </div>
    )
}