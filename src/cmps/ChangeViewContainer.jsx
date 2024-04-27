import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export function ChangeViewContainer({ currentView, setCurrentView }) {

    return (
        <div className="change-view-container">
            <div className="time-clock" onClick={() => setCurrentView('TimeClock')}>
                <AccessTimeIcon sx={{ color: '#32C4DB' }} fontSize='large' />
                <h2>Time clock</h2>
            </div>
            <div className="presence-track" onClick={() => setCurrentView('PresenceTrack')}>
                <CalendarMonthIcon sx={{ color: '#EF6D99' }} fontSize='large' />
                <h2>Presence track</h2>
            </div>
        </div>
    )
}
