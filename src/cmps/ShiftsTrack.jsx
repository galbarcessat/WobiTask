import { ShiftList } from "./ShiftList";

export function ShiftsTrack({ user }) {

    return (
        <div className="shifts-track-container">
            <h1>Shifts track : </h1>
            <ShiftList user={user} />
        </div>
    )
}
