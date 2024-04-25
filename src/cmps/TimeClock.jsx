import { useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export function TimeClock() {
    const [isInShift, setIsInShift] = useState(false)

    const dynStartEndShiftTxt = isInShift ? 'End shift' : 'Start shift'
    return (
        <div>
            <div className="time-clock-container">
                <AccessTimeIcon />
                <h1>{dynStartEndShiftTxt}</h1>
            </div>
        </div>
    )
}
