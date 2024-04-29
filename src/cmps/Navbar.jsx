import { Avatar } from '@mui/material'
import WobiLogo from '../assets/imgs/WobiLogo.png'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/actions/user.actions'

export function Navbar({ user }) {
    const navigate = useNavigate()

    function onLogout() {
        logout()
        navigate('/auth')
    }


    return (
        <div className='navbar-container'>
            <img src={WobiLogo} alt="" onClick={() => navigate('/')} />
            <div>
                {!user ?
                    <span onClick={() => navigate('/auth')}>Login</span>
                    :
                    <span onClick={() => onLogout()}>Logout</span>
                }
                {user && <div className='user-details'>
                    <Avatar src="" sx={{ width: 36, height: 36 }} />
                    <h1>{user.username}</h1>
                </div>}
            </div>
        </div>
    )
}
