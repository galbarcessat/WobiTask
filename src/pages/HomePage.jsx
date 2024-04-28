import { useState } from "react";
import { Navbar } from "../cmps/Navbar";
import { TimeClock } from "../cmps/TimeClock";
import { ShiftsTrack } from "../cmps/ShiftsTrack";
import { ChangeViewContainer } from "../cmps/ChangeViewContainer";

export function HomePage() {
    const [currentView, setCurrentView] = useState('TimeClock')

    return (
        <>
            <Navbar />
            <div className='home-page-container'>
                {currentView === 'TimeClock' && <TimeClock />}
                {currentView === 'PresenceTrack' && <ShiftsTrack />}
                <ChangeViewContainer currentView={currentView} setCurrentView={setCurrentView} />
            </div>
        </>
    )
}