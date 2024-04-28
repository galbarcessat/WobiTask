import { useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Avatar } from "@mui/material";

export function TimeClock() {
    const [isInShift, setIsInShift] = useState(false)

    const dynStartEndShiftTxt = isInShift ? 'End shift' : 'Start shift'
    return (
        <>
            <div className="welcome-user-container">
                <h1>Welcome,</h1>
                <h1>{'Gal Ben Natan'}</h1>
                <Avatar src="" sx={{ width: 80, height: 80 }} />
                <h2>Current Time : 00:00:00</h2>
            </div>
            <div className="time-clock-container">
                <AccessTimeIcon fontSize="large" />
                <h1>{dynStartEndShiftTxt}</h1>
            </div>
        </>
    )
}
