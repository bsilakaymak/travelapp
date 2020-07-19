import {
    GET_PLACES,
    GET_PLACE,
    UPDATE_PLACE,
    DELETE_PLACE,
    COMMENT_PLACE,
    DELETE_COMMENT_PLACE,
    RATE_PLACE,
    GET_PLACE_COMMENTS,
    UPDATE_PLACE_COMMENTS,
    ADD_PLACE,
} from '../actions/types'

const initialState = {
    places: null,
    place: null,
    comments: [],
    loading: true,
    error: {},
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_PLACES:
            return {
                ...state,
                places: payload,
                loading: false,
            }

        case GET_PLACE:
        case UPDATE_PLACE: {
            return {
                ...state,
                place: payload,
                loading: false,
            }
        }
        case ADD_PLACE:
            return {
                ...state,
                places: [...state.places, payload],
                loading: false,
            }
        case DELETE_PLACE: {
            return {
                ...state,
                places: state.places.filter((place) => place._id !== payload),
                loading: false,
            }
        }
        case GET_PLACE_COMMENTS:
            return {
                ...state,
                comments: payload,
                loading: false,
            }
        case COMMENT_PLACE:
            return {
                ...state,
                comments: [payload, ...state.comments],
                loading: false,
            }
        case UPDATE_PLACE_COMMENTS:
            return {
                ...state,
                comments: [
                    ...state.comments.map((comment) =>
                        comment._id === payload._id ? payload : comment
                    ),
                ],
                loading: false,
            }
        case DELETE_COMMENT_PLACE:
            return {
                ...state,
                comments: state.comments.filter(
                    (comment) => comment._id !== payload
                ),
                loading: false,
            }
        case RATE_PLACE:
            return {
                ...state,
                places: state.places.map((place) =>
                    place._id === payload._id ? payload : place
                ),
                loading: false,
            }
        default:
            return state
    }
}
