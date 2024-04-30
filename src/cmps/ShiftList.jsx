import { ShiftPreview } from "./ShiftPreview";

export function ShiftList({ user, isAdmin, updateUsers }) {

    function updateUserShift(newShift) {
        const updatedUser = {
            ...user,
            shifts: user.shifts.map(shift => (shift.id === newShift.id ? { ...shift, ...newShift } : shift))
        }

        updateUsers(updatedUser)
    }

    return (
        <>
            <h1 className="username-title">{user?.username}</h1>
            {user?.shifts ? <div className="shift-list">
                {user.shifts.map(shift =>
                    <ShiftPreview key={shift.entry} shift={shift} isAdmin={isAdmin} updateUserShift={updateUserShift} />)}
            </div> : <h1>User has no shifts</h1>}
        </>
    )
}
