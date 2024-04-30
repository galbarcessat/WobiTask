import { useEffect, useState } from "react"
import { userService } from "../services/user.service"
import { Navbar } from "../cmps/Navbar"
import { useSelector } from "react-redux"
import { ShiftList } from "../cmps/ShiftList"
import { updateUser } from "../store/actions/user.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useNavigate } from "react-router-dom"

export function AdminPanel() {
    const [users, setUsers] = useState()
    const user = useSelector(state => state.userModule.user)
    const navigate = useNavigate()

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
        try {
            const updatedUsers = userService.saveUsers(users)
            const updatedAdminUser = users.find(u => u._id === user._id)
            updateUser(updatedAdminUser)
            showSuccessMsg('Successfully updated users shifts.')
        } catch (error) {
            showErrorMsg('Faild to update users, try again.')
        }
    }

    function updateUsers(updatedUser) {
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
                {users?.map(user => <ShiftList key={user._id} user={user} isAdmin={true} updateUsers={updateUsers} />)}
                <div className="btns-container">
                    <button className="btn" onClick={() => onSaveUsers()}>Save changes</button>
                    <button className="btn" onClick={() => navigate('/')}>Back</button>
                </div>
            </div>
        </>
    )
}
