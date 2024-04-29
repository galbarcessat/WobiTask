import { ShiftList } from "./ShiftList";

export function ShiftsTrack({ shifts }) {
    return (
        <div className="shifts-track-container">
            <h1>Shifts track : </h1>
            {shifts ? <ShiftList shifts={shifts}/> : <h1>User has no shifts</h1>}
        </div>
    )
}
