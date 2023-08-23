import ActionTypes from "../actionTypes"

export const setUser = (payload) => {
    return {
        type: ActionTypes.SET_USER,
        payload
    }
}

// user profile
export const setProfile = (payload) => {
    return {
        type: ActionTypes.SET_USER_PROFILE,
        payload
    }
}

export const setMerchant = (payload) => {
    return {
        type: ActionTypes.SET_MERCHANT,
        payload
    }
}

export const setLocation = (payload) => {
    return {
        type: ActionTypes.SET_LOCATION,
        payload
    }
}

export const setCollection = (payload) => {
    return {
        type: ActionTypes.SET_USER_COLLECTION,
        payload
    }
}

export const setGallery = (payload) => {
    return {
        type: ActionTypes.SET_GALLERY_IMAGE,
        payload
    }
}