
import { useNavigate } from 'react-router-dom'
import WobiLogo from '../assets/imgs/WobiLogo.png'

export function LoginSignUpNavbar() {
    const navigate = useNavigate()

    return (
        <div className="login-signup-navbar">
            <img src={WobiLogo} alt="" onClick={() => navigate('/')} />
        </div>
    )
}
