import axios from 'axios'
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
export const updateUser = (formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const res = await axios.put('/api/users/me', formData, config)
        dispatch({
            type: UPDATE_USER,
            payload: res.data,
        })
    } catch (error) {}
}

//follow user
export const followUser = (userId) => async (dispatch) => {
    try {
        const res = await axios.post(`/api/user/${userId}`)
        dispatch({
            type: FOLLOW_USER,
            payload: res.data,
        })
    } catch (error) {}
}

//unfollow user
export const unfollowUser = (userId) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/user/${userId}`)
        dispatch({
            type: UNFOLLOW_USER,
            payload: res.data,
        })
    } catch (error) {}
}
//delete follower
export const deleteFollower = (userId) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/user/${userId}`)
        dispatch({
            type: DELETE_FOLLOWER,
            payload: res.data,
        })
    } catch (error) {}
}
//add item to wishlist
export const addItemToWishlist = (placeId) => async (dispatch) => {
    try {
        const res = await axios.post(`/api/user/${placeId}`)
        dispatch({
            type: ADD_PLACE_WL,
            payload: res.data,
        })
    } catch (error) {}
}
//update item in wishlist
export const updateItemInWishlist = (placeId, formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const res = await axios.put(`/api/user/${placeId}`, formData, config)
        dispatch({
            type: UPDATE_PLACE_WL,
            payload: res.data,
        })
    } catch (error) {}
}
//remove item form wishlist
export const removeItemFromWishlist = (formData) => async (dispatch) => {
    try {
        const res = await axios.post(`/api/user/${placeId}`)
        dispatch({
            type: DELETE_PLACE_WL,
            payload: res.data,
        })
    } catch (error) {}
}
