
export function ShiftPreview({ shift }) {
    const entry = new Date(shift.entry)
    const exit = new Date(shift.exit)

    const dateOptions = { weekday: 'long', day: '2-digit', month: 'numeric', year: 'numeric' }
    const formattedDate = entry.toLocaleDateString('en-GB', dateOptions).replace(/,/g, '')

    return (
        <div className="shift-preview">
            <h2>{formattedDate}</h2>
            <div>
                <h3><span>Entry : </span>{entry.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZone: 'Europe/Berlin'
                })}</h3>
                <h3><span>Exit : </span>{exit.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZone: 'Europe/Berlin'
                })}</h3>
                <h3><span>Total : </span>{ new Date(exit - entry).toISOString().substr(11, 8)}</h3>
            </div>
        </div>
    )
}
