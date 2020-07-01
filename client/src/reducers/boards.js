import {
    GET_BOARD,
    GET_BOARDS,
    ADD_BOARD,
    UPDATE_BOARD,
    DELETE_BOARD,
    ADD_PLACE_B,
    DELETE_PLACE_B,
    FOLLOW_BOARD,
    UNFOLLOW_BOARD,
} from '../actions/types'

const initialState = {
    boards: [],
    board: null,
    loading: true,
    error: {},
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_BOARDS:
            return {
                ...state,
                boards: payload,
                loading: false,
            }
        case GET_BOARD: {
            return {
                ...state,
                board: payload,
                loading: false,
            }
        }
        case ADD_BOARD: {
            return {
                ...state,
                boards: [...state.boards, payload],
                loading: false,
            }
        }
        case UPDATE_BOARD:
            return {
                ...state,
                board: payload,
                loading: false,
            }
        case DELETE_BOARD:
            return {
                ...state,
                boards: state.boards.filter((board) => board._id !== payload),
                loading: false,
            }
        case ADD_PLACE_B:
        case DELETE_PLACE_B:
            return {
                ...state,
                board: { ...state.board, places: payload },
                loading: false,
            }
        case FOLLOW_BOARD:
        case UNFOLLOW_BOARD:
            return {
                ...state,
                board: { ...state.board, followers: payload },
                loading: false,
            }
        default:
            return state
    }
}
