import { useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import WobiLogo from '../assets/imgs/WobiLogo.png'
import { logout } from '../store/actions/user.actions'

export function Navbar({ user }) {
    const navigate = useNavigate()

    function onLogout() {
        logout()
        navigate('/auth')
    }

    return (
        <div className='navbar-container'>
            <img className='wobi-logo' src={WobiLogo} alt="" onClick={() => navigate('/')} />
            <div>
                {!user ?
                    <span onClick={() => navigate('/auth')}>Login</span>
                    :
                    <span onClick={() => onLogout()}>Logout</span>
                }
                {user?.isAdmin && <span onClick={() => navigate('/admin')}>Admin Panel</span>}
                {user && <div className='user-details'>
                    <Avatar src={user.imgUrl} sx={{ width: 36, height: 36 }} />
                    <h1>{user.username}</h1>
                </div>}
            </div>
        </div >
    )
}
