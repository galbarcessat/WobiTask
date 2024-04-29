import { ShiftList } from "./ShiftList";

export function ShiftsTrack({ shifts }) {
    return (
        <div className="shifts-track-container">
            <h1>Shifts track : </h1>
            <ShiftList shifts={shifts} />
        </div>
    )
}
