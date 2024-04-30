import { ShiftPreview } from "./ShiftPreview";

export function ShiftList({ user, isAdmin }) {

    console.log('user:', user)

    return (
        <>
            <h1 className="username-title">{user?.username}</h1>
            {user?.shifts ? <div className="shift-list">
                {user.shifts.map(shift =>
                    <ShiftPreview key={shift.entry} shift={shift} isAdmin={isAdmin} />)}
            </div> : <h1>User has no shifts</h1>}
        </>
    )
}
