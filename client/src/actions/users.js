import axios from 'axios'
import { setAlert } from './alert'
import {
    GET_USER,
    GET_USERS,
} from './types'

// Get all users
export const getUsers = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/users/')
        dispatch({
            type: GET_USERS,
            payload: res.data,
        })
    } catch (error) {
        
    }
}

// Get a user
export const getUser = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/users/${userId}`)
        dispatch({
            type: GET_USER,
            payload: res.data,
        })
    } catch (error) {
       
    }
}

