import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPDATE_USER,
    FOLLOW_USER,
    UNFOLLOW_USER,
    ADD_PLACE_WL,
    DELETE_PLACE_WL,
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    msg: null,
}
export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case USER_LOADED:
        case UPDATE_USER:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            }
        case FOLLOW_USER:
        case UNFOLLOW_USER:
            return {
                ...state,
                user: { ...state.user, following: payload },
            }
        case ADD_PLACE_WL:
        case DELETE_PLACE_WL:
            return{
                ...state,
                user:{...state.user, travelWishList: payload }
            }
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            }
        default:
            return state
    }
}
