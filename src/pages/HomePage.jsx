import { useState } from "react";
import { Navbar } from "../cmps/Navbar";
import { TimeClock } from "../cmps/TimeClock";
import { PresenceTrack } from "../cmps/PresenceTrack";
import { ChangeViewContainer } from "../cmps/ChangeViewContainer";

export function HomePage() {
    const [currentView, setCurrentView] = useState('TimeClock')

    return (
        <>
            <Navbar />
            <div className='home-page-container'>
                
                <h1 className="welcome-user-txt">Welcome User Name</h1>
                <Avatar src="" sx={{ width: 36, height: 36 }} />

                {currentView === 'TimeClock' && <TimeClock />}
                {currentView === 'PresenceTrack' && <PresenceTrack />}

                <ChangeViewContainer currentView={currentView} setCurrentView={setCurrentView} />

            </div>
        </>
    )
}