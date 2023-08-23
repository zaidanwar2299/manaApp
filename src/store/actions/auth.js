import { Alert } from "react-native"
import { store } from ".."
import { navigate } from "../../navigation/navigation.utils"
import Routes from "../../navigation/routes"
import ActionTypes from "../actionTypes"

export const setTokens = (payload) => {
    return {
        type: ActionTypes.SET_TOKENS,
        payload
    }
}

export const setAppleUser = (payload) => {
    return {
        type: ActionTypes.SET_APPLE_USER,
        payload
    }
}

export const logout = () => {
    return {
        type: ActionTypes.LOGOUT,
    }
}

export const isUserLoggedIn = ({
    showAlert =false
}) => {
    const user = store.getState().user.user
    const tokens = store.getState().auth.tokens
    if (user && user.is_verified && tokens) {
        if (showAlert) {
            Alert.alert("Required Login", "Please login to continue.", [
                { text: "Cancel" },
                {
                    text: "Login",
                    onPress: () => {
                        navigate(Routes.Login)
                    }
                }
            ])
        }
        return true
    }
    return false
} 