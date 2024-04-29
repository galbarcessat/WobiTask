import { ShiftPreview } from "./ShiftPreview";

export function ShiftList({ shifts, username, isAdmin }) {

    return (
        <>
            <h1>{username}</h1>
            <div className="shift-list">
                {shifts ? shifts.map(shift => <ShiftPreview key={shift.entry} shift={shift} isAdmin={isAdmin}/>) : <h1>User has not shifts</h1>}
            </div>
        </>
    )
}
