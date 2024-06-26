import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { updateUser } from "../store/actions/user.actions";
import { utilService } from "../services/util.service";
import { showErrorMsg } from "../services/event-bus.service";
import { Avatar } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export function TimeClock({ user }) {
    const [isInShift, setIsInShift] = useState(false)
    const [currentTime, setCurrentTime] = useState('')
    const [currentDate, setCurrentDate] = useState('')
    const timerId = useRef(null)

    useEffect(() => {
        if (user?.entry) {
            setIsInShift(true)
        }
    }, [])

    useEffect(() => {
        getGermanyTime()
        timerId.current = setInterval(() => {
            getGermanyTime()
        }, 60000)

        return () => clearInterval(timerId.current)
    }, [])

    async function getGermanyTime() {
        try {
            const { data } = await axios.get('https://worldtimeapi.org/api/timezone/Europe/Berlin')
            const time = data.datetime.substring(11, 16)
            const date = data.datetime.substring(0, 10)
            setCurrentTime(time)
            setCurrentDate(date)
        } catch (error) {
            showErrorMsg('Error fetching Germany time')
        }
    }

    function startEndShift() {
        if (!user) {
            showErrorMsg('Login to enter the shift')
            return
        }

        let updatedUser
        if (!user.entry) {
            updatedUser = { ...user, entry: new Date }
            updateUser(updatedUser)
            setIsInShift(true)
        } else {
            console.log('exit')
            const shift = { entry: user.entry, exit: new Date, id: utilService.makeId() }
            if (!user.shifts) user.shifts = []
            updatedUser = { ...user, entry: null, shifts: [...user.shifts, shift] }
            updateUser(updatedUser, 'exit')
            setIsInShift(false)
        }
    }

    const dynStartEndShiftTxt = isInShift ? 'End shift' : 'Start shift'
    return (
        <>
            <div className="welcome-user-container">
                <h1>Welcome,</h1>
                <h1>{user?.username}</h1>
                <Avatar src={user?.imgUrl} sx={{ width: 80, height: 80 }} />
                <h2>Current Time : {currentTime && <span>{currentTime}</span>}</h2>
                <h2>{currentDate && <span>{currentDate}</span>}</h2>
            </div>
            <div className={"time-clock-container " + (isInShift ? 'in-shift' : '')} onClick={() => startEndShift()}>
                <AccessTimeIcon fontSize="large" />
                <h1>{dynStartEndShiftTxt}</h1>
            </div>
        </>
    )
}
