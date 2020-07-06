import axios from 'axios'
import { setAlert } from './alert'
import {
    UPDATE_USER,
    UNFOLLOW_USER,
    FOLLOW_USER,
    DELETE_FOLLOWER,
    ADD_PLACE_WL,
    UPDATE_PLACE_WL,
    DELETE_PLACE_WL,
} from './types'

// update current user
export const updateUser = (formData, history) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const res = await axios.put('/api/user/me', formData, config)
        dispatch({
            type: UPDATE_USER,
            payload: res.data,
        })
        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

//follow user
export const followUser = (userId) => async (dispatch) => {
    try {
        const res = await axios.post(`/api/follow/${userId}`)
        dispatch({
            type: FOLLOW_USER,
            payload: res.data,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

//unfollow user
export const unfollowUser = (userId) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/follow/${userId}`)
        dispatch({
            type: UNFOLLOW_USER,
            payload: res.data,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}
//delete follower
export const deleteFollower = (userId) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/follow/${userId}`)
        dispatch({
            type: DELETE_FOLLOWER,
            payload: res.data,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}
//add item to wishlist
export const addItemToWishlist = (placeId) => async (dispatch) => {
    try {
        const res = await axios.post(`/api/wishlist/${placeId}`)
        dispatch({
            type: ADD_PLACE_WL,
            payload: res.data,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}
//update item in wishlist
export const updateItemInWishlist = (placeId, formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const res = await axios.put(
            `/api/wishlist/${placeId}`,
            formData,
            config
        )
        dispatch({
            type: UPDATE_PLACE_WL,
            payload: res.data,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}
//remove item form wishlist
export const removeItemFromWishlist = (placeId) => async (dispatch) => {
    try {
        const res = await axios.post(`/api/wishlist/${placeId}`)
        dispatch({
            type: DELETE_PLACE_WL,
            payload: res.data,
        })
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}
