
export function ShiftPreview({ shift }) {
    const entry = new Date(shift.entry)
    const exit = new Date(shift.exit)
    
    return (
        <div className="shift-preview">
            <h2>Friday 20.4.2024</h2>
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
                <h3><span>Total : </span>1H</h3>
            </div>
        </div>
    )
}
