
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './assets/styles/main.scss'
import { HomePage } from './pages/HomePage'
import { LoginSignUp } from './pages/LoginSignUp'
import { AdminPanel } from './pages/AdminPanel'
import { UserMsg } from './cmps/UserMsg'

export function App() {

  return (
    <Provider store={store}>
      <Router>
        <UserMsg />
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<AdminPanel />} path="/admin" />
          <Route element={<LoginSignUp />} path="/auth" />
        </Routes>
      </Router>
    </Provider>
  )
}

