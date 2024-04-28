import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login, signup } from "../store/actions/user.actions"
import { LoginSignUpNavbar } from "../cmps/LoginSignUpNavbar";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function LoginSignUp() {
  const [credentials, setCredentials] = useState({ username: '', password: '', imgUrl: '' })
  const [isSingUp, setIsSignUp] = useState(false)
  const navigate = useNavigate()

  const dynLoginText = isSingUp ? 'Welcome to Wobi' : 'Log in to your account'
  const dynButtonText = isSingUp ? 'Sign up' : 'Log in'

  function toggleSignUp() {
      setIsSignUp(prevSignUp => !prevSignUp)
  }

  function handleChange(ev) {
      const field = ev.target.name
      const value = ev.target.value
      setCredentials({ ...credentials, [field]: value })
  }

  async function onLogin(ev = null) {
      if (ev) ev.preventDefault()
      if (!credentials.password) return
      try {
          let user = await login(credentials)
          showSuccessMsg(`Hi again ${user.username}`)
          navigate('/')
      } catch (error) {
          console.log('error LOGIN TEST:', error)
          showErrorMsg('Cannot login, wrong credentials', error)
      }
  }

  async function onSignup(ev = null) {
      if (ev) ev.preventDefault()
      if (!credentials.username || !credentials.password) return

      try {
          let user = await signup(credentials)
          showSuccessMsg(`Welcome ${user.username}`)
          navigate('/')
      } catch (error) {
          showErrorMsg('Cannot signup', error)
      }
  }
  return (
    <>
      <LoginSignUpNavbar />
      <div className="login-signup-page">
            <h1>{dynLoginText}</h1>

            <form className="form-container" onSubmit={isSingUp ? onSignup : onLogin}>
                <div className="username-container">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        onChange={handleChange}
                        placeholder="Enter username" />
                </div>
                <div className="password-container">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        placeholder="Enter password" />
                </div>
                {isSingUp && <div className="imgUrl-container">
                    <label htmlFor="imgUrl">Profile Img Url</label>
                    <input
                        type="text"
                        name="imgUrl"
                        id="imgUrl"
                        onChange={handleChange}
                        placeholder="Enter profile img url" />
                </div>}
                <button>{dynButtonText}</button>
            </form>

            <div className="toggle-signup-container">
                {isSingUp ?
                    <p>Already have an account ? <span onClick={() => toggleSignUp()}>Login</span></p>
                    :
                    <p>Don't have an account yet ? <span onClick={() => toggleSignUp()}>Sign up</span></p>
                }
            </div>
        </div>
    </>
  )
}
