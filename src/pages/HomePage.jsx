import { useState } from "react";
import { Navbar } from "../cmps/Navbar";
import { TimeClock } from "../cmps/TimeClock";
import { PresenceTrack } from "../cmps/PresenceTrack";
import { ChangeViewContainer } from "../cmps/ChangeViewContainer";
import { Avatar } from "@mui/material";

export function HomePage() {
    const [currentView, setCurrentView] = useState('TimeClock')

    return (
        <>
            <Navbar />
            <div className='home-page-container'>

                <div className="welcome-user-container">
                    <h1>Welcome,</h1>
                    <h1>{'Gal Ben Natan'}</h1>
                    <Avatar src="" sx={{ width: 66, height: 66 }} />
                    <h2>Current Time : 00:00:00</h2>
                </div>

                {currentView === 'TimeClock' && <TimeClock />}
                {currentView === 'PresenceTrack' && <PresenceTrack />}

                <ChangeViewContainer currentView={currentView} setCurrentView={setCurrentView} />

            </div>
        </>
    )
}