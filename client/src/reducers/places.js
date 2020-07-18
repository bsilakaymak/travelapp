import {
    GET_PLACES,
    GET_PLACE,
    UPDATE_PLACE,
    DELETE_PLACE,
    COMMENT_PLACE,
    DELETE_COMMENT_PLACE,
    RATE_PLACE,
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

        case DELETE_PLACE: {
            return {
                ...state,
                places: state.places.filter((place) => place._id !== payload),
                loading: false,
            }
        }
        case COMMENT_PLACE:
        case DELETE_COMMENT_PLACE:
            return {
                ...state,
                place: { ...state.place, comments: payload },
                loading: false,
            }
        case RATE_PLACE:
            return {
                ...state,
                place: { ...state.place, ratings: payload.ratings },
                loading: false,
            }
        default:
            return state
    }
}
