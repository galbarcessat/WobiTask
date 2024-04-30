
import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    saveUser,
    saveUsers,
    getUsers
}

window.us = userService

async function getById(userId) {
    return await httpService.get(BASE_URL, userId)
}

async function getUsers() {
    return await httpService.get('user/')
}

async function saveUser(user) {
    try {
        const savedUser = await httpService.put('user/' + `${user._id}`, user)
        _setLoggedinUser(user)
    } catch (error) {
        throw error
    }
}

async function saveUsers(updatedUsers) {
    try {
        const savedUsers = await httpService.put('user/users', updatedUsers)
        console.log('savedUsers in user service:', savedUsers)
    } catch (error) {
        throw error
    }
}


async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })
        if (user) return _setLoggedinUser(user)
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

async function signup({ username, password, imgUrl }) {
    const user = {
        username,
        password,
        imgUrl: imgUrl ? imgUrl : 'https://cdn1.monday.com/dapulse_default_photo.png'
    }
    try {
        const userResponse = await httpService.post(BASE_URL + 'signup', user)
        if (userResponse) return _setLoggedinUser(userResponse)
    } catch (err) {
        console.log('err:', err)
        throw err
    }

}

async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (error) {
        console.error(error)
        throw error
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, username: user.username, imgUrl: user.imgUrl, shifts: user.shifts }
    if (user.isAdmin) {
        userToSave.isAdmin = true
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}
