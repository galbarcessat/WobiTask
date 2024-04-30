import { useState } from "react";

export function ShiftPreview({ shift, isAdmin, updateUserShift }) {
    const [entry, setEntry] = useState(new Date(shift.entry))
    const [exit, setExit] = useState(new Date(shift.exit))

    const dateOptions = { weekday: 'long', day: '2-digit', month: 'numeric', year: 'numeric' }
    const formattedDate = entry.toLocaleDateString('en-GB', dateOptions).replace(/,/g, '')

    function formatTime(date) {
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            // timeZone: 'Europe/Berlin',
            hour12: false
        })
    }

    const handleEntryChange = (e) => {
        const newEntry = (new Date(entry.setHours(...e.target.value.split(':'))))
        setEntry(newEntry)
        updateUserShift({ ...shift, entry: newEntry })
    }

    const handleExitChange = (e) => {
        const newExit = (new Date(exit.setHours(...e.target.value.split(':'))))
        setExit(newExit)
        updateUserShift({ ...shift, exit: newExit })
    }

    return (
        <div className="shift-preview">
            <h2>{formattedDate}</h2>
            <div>
                {isAdmin ? (
                    <>
                        <h3><span>Entry: </span>
                            <input type="time" value={formatTime(entry)} onChange={handleEntryChange} />
                        </h3>
                        <h3><span>Exit: </span>
                            <input type="time" value={formatTime(exit)} onChange={handleExitChange} />
                        </h3>
                    </>
                ) : (
                    <>
                        <h3><span>Entry: </span>{entry.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            timeZone: 'Europe/Berlin'
                        })}</h3>
                        <h3><span>Exit: </span>{exit.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            timeZone: 'Europe/Berlin'
                        })}</h3>
                    </>
                )}
                <h3><span>Total : </span>{new Date(exit - entry).toISOString().substr(11, 8)}</h3>
            </div>
        </div>
    )
}
