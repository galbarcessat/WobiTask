import { useEffect, useState } from "react"
import { userService } from "../services/user.service"
import { Navbar } from "../cmps/Navbar"
import { useSelector } from "react-redux"
import { ShiftList } from "../cmps/ShiftList"

export function AdminPanel() {
    const [users, setUsers] = useState()
    const user = useSelector(state => state.userModule.user)

    //get all users shifts
    //show each user shifts with their name
    //admin can edit these shifts 
    // show entry and exit as inputs 

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


    return (
        <>
            <Navbar user={user} />
            <div>
                <h1>Workers shifts : </h1>
                {users?.map(user => <ShiftList key={user._id} shifts={user.shifts} username={user.username} isAdmin={true} />)}
            </div>
        </>
    )
}
