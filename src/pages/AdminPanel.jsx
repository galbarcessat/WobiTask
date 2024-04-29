import { useEffect, useState } from "react"
import { userService } from "../services/user.service"
import { Navbar } from "../cmps/Navbar"
import { useSelector } from "react-redux"

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
            console.log('users:', users)
        } catch (error) {

        }
    }


    return (
        <>
            <Navbar user={user} />
            <div>
                <h1>Workers shifts : </h1>
                users
            </div>
        </>
    )
}
