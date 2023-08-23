import ActionTypes from "../actionTypes";

const INITIAL_STATE = {
    tokens: null,
    appleUser: null
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.SET_TOKENS:
            return { ...state, tokens: action.payload };
        case ActionTypes.SET_APPLE_USER:
            return { ...state, appleUser: { ...action.payload }};
        case ActionTypes.LOGOUT:
            return {
                tokens:null
             }
        default:
            return state;
    }
}