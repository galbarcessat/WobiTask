import { useState } from "react";
import { Navbar } from "../cmps/Navbar";
import { TimeClock } from "../cmps/TimeClock";
import { ShiftsTrack } from "../cmps/ShiftsTrack";
import { ChangeViewContainer } from "../cmps/ChangeViewContainer";
import { useSelector } from "react-redux";

export function HomePage() {
    const [currentView, setCurrentView] = useState('TimeClock')
    const user = useSelector(state => state.userModule.user)

    return (
        <>
            <Navbar user={user} />
            <div className='home-page-container'>
                {currentView === 'TimeClock' && <TimeClock user={user} />}
                {currentView === 'PresenceTrack' && <ShiftsTrack user={user} />}
                <ChangeViewContainer currentView={currentView} setCurrentView={setCurrentView} />
            </div>
        </>
    )
}