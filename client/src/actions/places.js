import axios from 'axios'
import {
    GET_PLACE,
    GET_PLACES,
    ADD_PLACE,
    UPDATE_PLACE,
    DELETE_PLACE,
    COMMENT_PLACE,
    DELETE_COMMENT_PLACE,
    RATE_PLACE,
} from './types'

// get places
export const getPlaces = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/places/')
        dispatch({
            type: GET_PLACES,
            payload: res.data,
        })
    } catch (error) {}
}

// get place
export const getPlace = (placeId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/places/${placeId}`)
        dispatch({
            type: GET_PLACE,
            payload: res.data,
        })
    } catch (error) {}
}

// add place
export const addPlace = (formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const res = await axios.post('/api/places', formData, config)
        dispatch({
            type: ADD_PLACE,
            payload: res.data,
        })
    } catch (error) {}
}

// update place

export const updatePlace = (placeId, formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const res = await axios.post(`/api/places/${placeId}`, formData, config)
        dispatch({
            type: UPDATE_PLACE,
            payload: res.data,
        })
    } catch (error) {}
}

// delete place
export const deletePlace = (placeId) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/places/${placeId}`)
        dispatch({
            type: DELETE_PLACE,
            payload: placeId,
        })
    } catch (error) {}
}

// add comment
export const addComment = (placeId, formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const res = await axios.post(
            `/api/places/${placeId}/comments`,
            formData,
            config
        )
        dispatch({
            type: COMMENT_PLACE,
            payload: res.data,
        })
    } catch (error) {}
}

// delete comment
export const deleteComment = (placeId, commentId) => async (dispatch) => {
    try {
        const res = await axios.delete(
            `/api/places/${placeId}/comments/${commentId}`
        )
        dispatch({
            type: DELETE_COMMENT_PLACE,
            payload: res.data,
        })
    } catch (error) {}
}

// rate place
export const ratePlace = (placeId, formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const res = await axios.put(`/api/places/${placeId}`, formData, config)
        dispatch({
            type: RATE_PLACE,
            payload: res.data,
        })
    } catch (error) {}
}
