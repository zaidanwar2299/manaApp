import ActionTypes from "../actionTypes";

const INITIAL_STATE = {
    user: null,
    location: {
        latitude: 37.78825,
        longitude: -122.4324,
    },
    merchant: null,
    profile: null,
    collection:[]
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.SET_USER:
            return { ...state, user: action.payload };
        case ActionTypes.SET_LOCATION:
            return { ...state, location: action.payload };
        case ActionTypes.SET_USER_PROFILE:
            return { ...state, profile: action.payload };
        case ActionTypes.SET_USER_COLLECTION:
            return { ...state, collection: action.payload };
        case ActionTypes.LOGOUT:
            return INITIAL_STATE

        default:
            return state;
    }
}