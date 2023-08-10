import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert, Linking } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Ionicons } from "../../../../../assets/vectorIcons";
import PrimaryButton from "../../../../../components/buttons/primaryButton";
import { isUserLoggedIn, logout } from "../../../../../store/actions/auth";
import { navigate } from "../../../../navigation.utils";
import Routes from "../../../../routes";
import DrawerCard from "./items/drawerCard";
import ImageCard from "./items/imageCard";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from "../../../../../assets/fonts";
import { getImageSource } from "../../../../../utils/attachment.utils";
import Services from "../../../../../services";
import LogoutButton from "./items/logoutButton";
import { showSuccessMsg } from "../../../../../utils/flashMessage.utils";
import PrimaryPicker from "../../../../../components/pickers/primaryPicker";
import { setUser } from "../../../../../store/actions/user";
import { getObjByValue } from "../../../../../utils/common.utils";
import Config from "../../../../../common/config";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const CustomDrawer = (props) => {
    let [state, _setState] = useState({
        loading: false // logout loading
    })

    const setState = (item = {}) => {
        state = {
            ...state,
            ...item
        }
        _setState({ ...state })
    }

    const { user, countries: reduxCountries } = useSelector((state) => ({
        user: state.user.user,
        countries: state.app.countries
    }), shallowEqual)

    const dispatch = useDispatch()

    const handleLogout = async () => {
        if (!user) {
            navigate(Routes.Login)
            return;
        }
        try {
            setState({ loading: true })
            await Services.Auth.logout()
            dispatch(logout())
            showSuccessMsg("Logout successfully.")
        } finally {
            setState({ loading: false })
        }
    }

    return (
        <SafeAreaView
        style={{
            flex:1
        }}>
            <ScrollView
                contentContainerStyle={{
                    backgroundColor: "white",
                    padding: 20,
                    paddingBottom: 0,
                    flexGrow: 1
                }}>
                {user && (
                    <ImageCard
                        onPress={() => {
                            navigate(Routes.UserProfile.Index)
                        }}
                        imageSource={getImageSource(user.picture)}
                        name={user.first_name + " " + user.last_name}
                        email={user.email}
                    />)}
                <PrimaryButton
                    label={"Add business listing"}
                    labelStyle={{
                        fontSize: 12,
                        flexGrow: 1,
                    }}
                    renderRightItem={() => {
                        return (
                            <Ionicons name="briefcase" size={20} color="white" />
                        )
                    }}
                    containerStyle={{
                        marginBottom: 10
                    }}
                    onPress={() => {
                        navigate(Routes.ChooseBusinessType)
                    }}
                />
                {props.state.routes.map((route, index) => {
                    const { options } = props.descriptors[route.key]
                    const label =
                        options.drawerLabel !== undefined
                            ? options.drawerLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name

                    const isFocused = props.state.index === index

                    if (route.name == Routes.BottomTabStack) {
                        return;
                    }

                    let divider = null
                    let caption = null

                    if (
                        route.name == Routes.Talk.Index ||
                        route.name == Routes.Country
                    ) {
                        divider = (
                            <View
                                style={{
                                    width: "100%",
                                    height: 1,
                                    backgroundColor: '#E0E4FF',
                                    marginVertical: 10
                                }}
                            />
                        )
                    }

                    if (route.name == Routes.Language) {
                        caption = "English"
                    }

                    let jsx = (
                        <DrawerCard
                            title={label}
                            caption={caption}
                            onPress={() => {
                                if (route.name == Routes.AboutPepol) {
                                    Linking.openURL(`${Config.WEB_URL}about`)
                                }
                                else if (route.name == Routes.Trust_n_Safety) {
                                    Linking.openURL(`${Config.WEB_URL}trust-safety`)
                                }
                                else if (route.name == Routes.TermsOfService) {
                                    Linking.openURL(`${Config.WEB_URL}terms`)
                                }
                                else if (route.name == Routes.PrivacyPolicy) {
                                    Linking.openURL(`${Config.WEB_URL}privacy-policy`)
                                } else {
                                    navigate(route.name)
                                }
                            }}
                        />
                    )

                    if (route.name == Routes.Country) {
                        jsx = (
                            <PrimaryPicker
                                renderButton={(item) => {
                                    return (
                                        <DrawerCard
                                            title={label}
                                            caption={item.label}
                                            onPress={item.onPress}
                                        />
                                    )
                                }}
                                title="Select Country"
                                data={reduxCountries}
                                onChange={(item) => {
                                    Services.User.updateUser({ country: item.name })
                                    dispatch(setUser({
                                        ...user,
                                        country: item.name
                                    }))
                                    showSuccessMsg("User profile updated successfully.")
                                }}
                                _value={getObjByValue(user?.country, reduxCountries, "name")}
                            />
                        )
                    }
                    return (
                        <View
                            key={"DrawerItem" + route.name}>
                            {jsx}
                            {divider}
                        </View>
                    )
                })}
            </ScrollView>
            <LogoutButton
                loading={state.loading}
                disabled={state.loading}
                onPress={handleLogout}
                label={user ? "Logout" : "Login"}
            />
  </SafeAreaView>
    )
}

export default CustomDrawer