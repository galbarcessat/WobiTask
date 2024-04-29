import { ShiftPreview } from "./ShiftPreview";

export function ShiftList({ shifts }) {

    return (
        <div className="shift-list">
            {shifts.map(shift => <ShiftPreview key={shift.entry} shift={shift} />)}
        </div>
    )
}
