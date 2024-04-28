import { Avatar } from '@mui/material'
import WobiLogo from '../assets/imgs/WobiLogo.png'
import { useNavigate } from 'react-router-dom'

export function Navbar() {
    const navigate = useNavigate()

    return (
        <div className='navbar-container'>
            <img src={WobiLogo} alt="" onClick={()=> navigate('/')}/>
            <div>
                <span onClick={()=> navigate('/auth')}>Login</span>
                <Avatar src="" sx={{ width: 36, height: 36 }} />
            </div>
        </div>
    )
}
