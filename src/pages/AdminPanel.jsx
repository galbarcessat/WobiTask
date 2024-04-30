import { useEffect, useState } from "react"
import { userService } from "../services/user.service"
import { Navbar } from "../cmps/Navbar"
import { useSelector } from "react-redux"
import { ShiftList } from "../cmps/ShiftList"

export function AdminPanel() {
    const [users, setUsers] = useState()
    const user = useSelector(state => state.userModule.user)

    useEffect(() => {
        getAllUsers()
    }, [])

    async function getAllUsers() {
        try {
            const users = await userService.getUsers()
            setUsers(users)
            console.log('users:', users)
        } catch (error) {
            console.log('error:', error)
        }
    }

    function onSaveUsers() {
        console.log('users:', users)
    }

    function updateUsersShifts(updatedUser) {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user._id === updatedUser._id ? updatedUser : user
            ))
    }

    return (
        <>
            <Navbar user={user} />
            <div className="admin-panel-container">
                <h1 className="admin-panel-title">Admin panel : </h1>
                {users?.map(user => <ShiftList key={user._id} user={user} isAdmin={true} updateUsersShifts={updateUsersShifts} />)}

                <button className="save-changes-btn" onClick={() => onSaveUsers()}>Save changes</button>
            </div>
        </>
    )
}
