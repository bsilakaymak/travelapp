import axios from 'axios'
import { setAlert } from './alert'

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
export const getPlaces = (search, tags) => async (dispatch) => {
    try {
        const res = await axios.get(
            `/api/places/?search=${
                search !== null ? search : ''
            }&tagFilter=${tags}`
        )
        dispatch({
            type: GET_PLACES,
            payload: res.data,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

// get place
export const getPlace = (placeId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/places/${placeId}`)
        dispatch({
            type: GET_PLACE,
            payload: res.data,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

// add place
export const addPlace = (placeData, history) => async (dispatch) => {
    const { title, image, address, description, tags } = placeData
    const formData = new FormData()
    formData.append('title', title)
    formData.append('image', image)
    formData.append('address', address)
    formData.append('description', description)
    formData.append('tags', tags)
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
        dispatch(setAlert('Place is added', 'success'))
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
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
        dispatch(setAlert('Place updated', 'success'))
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

// delete place
export const deletePlace = (placeId, history) => async (dispatch) => {
    try {
        await axios.delete(`/api/places/${placeId}`)
        dispatch({
            type: DELETE_PLACE,
            payload: placeId,
        })
        history.push('/places')
        dispatch(setAlert('Place deleted'))
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

// add comment
export const addComment = (placeId, formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const res = await axios.put(
            `/api/places/${placeId}/comments`,
            formData,
            config
        )
        dispatch({
            type: COMMENT_PLACE,
            payload: res.data,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

// delete comment
export const deleteComment = (placeId, commentId) => async (dispatch) => {
    try {
        const res = await axios.put(
            `/api/places/${placeId}/comments/${commentId}`
        )
        dispatch({
            type: DELETE_COMMENT_PLACE,
            payload: res.data,
        })
        dispatch(setAlert('Comment deleted', 'success'))
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
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
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}
