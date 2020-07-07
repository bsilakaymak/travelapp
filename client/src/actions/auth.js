import axios from 'axios'
import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'
import {
    REGISTER_FAIL,
    USER_LOADED,
    REGISTER_SUCCESS,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
} from './types'

// get current user
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/user/me')
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: AUTH_ERROR,
        })
    }
}

// Register User
export const register = (name, email, password) => async (
    dispatch
) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const formData = {
        name,
        email,
        password,
    }
    try {
        const res = await axios.post('/api/users/signup', formData, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        })
        dispatch(loadUser())
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL,
        })
    }
}

// Login User
export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post('/api/users/login', body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        })

        dispatch(loadUser())
    } catch (error) {
        const errors = error.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: LOGIN_FAIL,
        })
    }
}

// Logout /Clear Profile

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT })
}
