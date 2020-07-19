import {
    UPDATE_USER,
    FOLLOW_USER,
    UNFOLLOW_USER,
    ADD_PLACE_WL,
    DELETE_PLACE_WL,
    UPDATE_PLACE_WL,
    DELETE_FOLLOWER,
} from '../actions/types'

const initialState = {
    user: null,
    loading: true,
    error: {},
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case UPDATE_USER:
            return {
                ...state,
                user: payload,
                loading: false,
            }
        case FOLLOW_USER:
        case UNFOLLOW_USER: {
            return {
                ...state,
                user: { ...state.user, following: payload },
                loading: false,
            }
        }
        case DELETE_FOLLOWER: {
            return {
                ...state,
                user: { ...state.user, followers: payload },
                loading: false,
            }
        }
        case ADD_PLACE_WL:
        case UPDATE_PLACE_WL:
        case DELETE_PLACE_WL: {
            return {
                ...state,
                user: {
                    ...state.user,
                    travelWishList: payload,
                },
                loading: false,
            }
        }
        default:
            return state
    }
}
