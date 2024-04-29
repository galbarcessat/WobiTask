import { userService } from "../../services/user.service.js";
import { store } from '../store.js'
import { SET_USER, SET_USERS } from "../reducers/user.reducer.js";

export async function loadUsers() {
    try {
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    }
}

export async function updateUser(user, type) {
    try {
        if (type === 'exit') {
            const savedUser = await userService.saveUser(user)
        }
        store.dispatch({ type: SET_USER, user })
    } catch (error) {
        throw error
    }
}

export async function getUsers() {
    try {
        const users = await userService.getUsers()
        // store.dispatch({ type: SET_USERS, users })
        return users
    } catch (error) {
        throw error
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

