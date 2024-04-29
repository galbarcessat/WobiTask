
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    saveUser,
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

// Test Data
// userService.signup({ email: 'nati@funday.com', password: 'nati', fullname: 'Nati Feldbaum', imgUrl : "https://res.cloudinary.com/ddcaqfqvh/image/upload/v1698620005/NatiImg_qvxcqb.png"})
// userService.signup({ email: 'gal@funday.com', password: 'gal', fullname: 'Gal Ben Natan' ,imgUrl : 'https://res.cloudinary.com/ddcaqfqvh/image/upload/v1698619973/GalImg_z8ivzb.png'})
// userService.signup({ email: 'omer@funday.com', password: 'omer', fullname: 'Omer Vered', imgUrl : "https://res.cloudinary.com/ddcaqfqvh/image/upload/v1698619996/OmerImg_svk1xe.png"})



