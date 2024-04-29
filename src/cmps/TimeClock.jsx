import { useEffect, useRef, useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { showErrorMsg } from "../services/event-bus.service";
import { SET_USER } from "../store/reducers/user.reducer";

export function TimeClock({ user }) {
    const [isInShift, setIsInShift] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date)
    const timerId = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user?.entry) {
            setIsInShift(true)
        }
        console.log('user:', user)
    }, [])

    useEffect(() => {
        // getGermanyTime()
        timerId.current = setInterval(() => {
            // getGermanyTime()
            setCurrentTime(new Date)
        }, 60000)

        return () => clearInterval(timerId.current)
    }, [])

    async function getGermanyTime() {
        try {
            const { data } = await axios.get('http://worldtimeapi.org/api/timezone/Europe/Berlin')
            const time = data.datetime.substring(11, 16)
            const date = data.datetime.substring(0, 10)
            console.log('date:', date)
            setCurrentTime(time)
        } catch (error) {
            showErrorMsg('Error fetching Germany time')
        }

    }

    function startEndShift() {
        if (!user) {
            showErrorMsg('Login to enter the shift')
            return
        }
        setIsInShift(prevIsInShift => !prevIsInShift)
        console.log('currentTime:', currentTime)
        //get current time 
        //send current time to api to get time in germany
        let updatedUser
        if (!user.entry) {
            console.log('entry')
            updatedUser = { ...user, entry: currentTime }
            dispatch({ type: SET_USER, user: updatedUser })
        } else {
            console.log('exit')
            const shift = { entry: user.entry, exit: new Date }
            updatedUser = { ...user, entry: null, shifts: [...user.shifts, shift] }
            // if exit then add the shift to the user.shifts array - shift = {entry,exit}
        }

        dispatch({ type: SET_USER, user: updatedUser })

        // make an action that saves that user 
        //save on the logged in user / in redux the time in shift on an object in the entry key
        //when user logs out exit
    }

    const dynStartEndShiftTxt = isInShift ? 'End shift' : 'Start shift'
    return (
        <>
            <div className="welcome-user-container">
                <h1>Welcome,</h1>
                <h1>{user?.username}</h1>
                <Avatar src={user?.imgUrl} sx={{ width: 80, height: 80 }} />
                <h2>Current Time : {currentTime?.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Europe/Berlin'
                })}</h2>
            </div>
            <div className={"time-clock-container " + (isInShift ? 'in-shift' : '')} onClick={() => startEndShift()}>
                <AccessTimeIcon fontSize="large" />
                <h1>{dynStartEndShiftTxt}</h1>
            </div>
        </>
    )
}
