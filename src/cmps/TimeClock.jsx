import { useEffect, useRef, useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { userReducer } from "../store/reducers/user.reducer";

export function TimeClock() {
    const [isInShift, setIsInShift] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date())
    const timerId = useRef(null)
    const user = useSelector(state => state.userModule.user)

    useEffect(() => {
        if (user?.entry) {
            setIsInShift(true)
        }
        console.log('user:', user)
    }, [])

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCurrentTime(new Date())
        }, 60000)

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(timerId.current)
    }, [])

    function startEndShift() {
        setIsInShift(prevIsInShift => !prevIsInShift)
        console.log('currentTime:', currentTime)
        // each user will have his shifts which is an array of {entry : exist : }
        //get logged in user
        //get current time 
        //send current time to api to get time in germany
        //save on the logged in user / in redux the time in shift on an object in the entry key
        //when user logs out/ends shift get current user and put on the exit key the current time 
    }
    console.log('currentTime:', currentTime)

    const dynStartEndShiftTxt = isInShift ? 'End shift' : 'Start shift'
    return (
        <>
            <div className="welcome-user-container">
                <h1>Welcome,</h1>
                <h1>{'Gal Ben Natan'}</h1>
                <Avatar src="" sx={{ width: 80, height: 80 }} />
                <h2>Current Time : {currentTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                })}</h2>
            </div>
            <div className={"time-clock-container " + (isInShift ? 'in-shift' : '')} onClick={() => startEndShift()}>
                <AccessTimeIcon fontSize="large" />
                <h1>{dynStartEndShiftTxt}</h1>
            </div>
        </>
    )
}
