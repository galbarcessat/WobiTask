import { Avatar } from '@mui/material'
import WobiLogo from '../assets/imgs/WobiLogo.png'

export function Navbar() {
    return (
        <div className='navbar-container'>
            <img src={WobiLogo} alt="" />
            <div>
                <span>Login</span>
                <Avatar src="" sx={{ width: 36, height: 36 }}/>
            </div>
        </div>
    )
}
