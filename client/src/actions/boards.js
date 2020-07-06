import axios from 'axios'
import { setAlert } from './alert'

import {
    GET_BOARDS,
    GET_BOARD,
    ADD_BOARD,
    UPDATE_BOARD,
    DELETE_BOARD,
    ADD_PLACE_B,
    DELETE_PLACE_B,
    FOLLOW_BOARD,
    UNFOLLOW_BOARD,
} from './types'

//get board
export const getPlaceList = (boardId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/boards/${boardId}`)
        dispatch({
            type: GET_BOARD,
            payload: res.data,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}
//get boards
export const getBoards = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/boards/')
        dispatch({
            type: GET_BOARDS,
            payload: res.data,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}
//add board
export const addBoard = (formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const res = await axios.post('/api/boards', formData, config)
        dispatch({
            type: ADD_BOARD,
            payload: res.data,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

//update board
export const updateBoard = (boardId, formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const res = await axios.put(`/api/boards/${boardId}`, formData, config)
        dispatch({
            type: UPDATE_BOARD,
            payload: res.data,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

//delete board
export const deleteBoard = (boardId) => async (dispatch) => {
    try {
        await axios.delete(`/api/boards/${boardId}`)
        dispatch({
            type: DELETE_BOARD,
            payload: boardId,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

//add place to board
export const addPlaceToBoard = (boardId, placeId) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/boards/${boardId}/places/${placeId}`)
        dispatch({
            type: ADD_PLACE_B,
            payload: res.data,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

//remove place from board
export const removePlaceFromBoard = (boardId, placeId) => async (dispatch) => {
    try {
        const res = await axios.delete(
            `/api/boards/${boardId}/places/${placeId}`
        )
        dispatch({
            type: DELETE_PLACE_B,
            payload: res.data,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

//follow board
export const followBoard = (boardId) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/boards/${boardId}/followers`)
        dispatch({
            type: FOLLOW_BOARD,
            payload: res.data,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

//unfollow board
export const unfollowBoard = (boardId) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/boards/${boardId}/followers`)
        dispatch({
            type: UNFOLLOW_BOARD,
            payload: res.data,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}
