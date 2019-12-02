import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE
} from '../Constants';


const initialState = {
    profile: null, // Get all of our profile and hold it here
    profiles: [],  // For listing profiles 
    bands: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {

    const { type, payload } = action;
    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                bands: [],
                loading: false
            }
        default:
            return state
    }
}