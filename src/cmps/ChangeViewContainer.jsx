import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export function ChangeViewContainer({ currentView, setCurrentView }) {

    return (
        <div className="change-page-container">
            <div className="time-clock">
                <AccessTimeIcon />
                <h2>Time clock</h2>
            </div>
            <div className="presence-track">
                <CalendarMonthIcon />
                <h2>Presence track</h2>
            </div>
        </div>
    )
}
