import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import Fonts from "../../../assets/fonts";
import PrimaryButton from "../../buttons/primaryButton";
import ModalContainer, { modalRef } from "../modalContainer";
import { MaterialCommunityIcons } from "../../../assets/vectorIcons"
import CheckBox from "../../views/groupCheckBox/items/checkBox";
import theme from "../../../common/theme";
import { Typo } from "../../../common/styles";
import { showSibling } from "../../../utils/modal.utils";
import CollectionModals from ".";
import Services from "../../../services";
import { CircularButton } from "../../cards/rectImageCard";
import CUModal from "../../../screens/userProfile/collections/items/cuModal";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setCollection } from "../../../store/actions/user";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DelModal from "../../../screens/userProfile/collections/items/delModal";
import EmptyCard from "../../cards/emptyCard";
import { showSuccessMsg } from "../../../utils/flashMessage.utils";

const CollectionCard = ({
    onEditPress,
    onDelPress,
    caption,
    onChange,
    isChecked, // initial state
}) => {
    return (
        <View
            style={{
                flexDirection: "row",
                height: 50,
                alignItems: "center",
            }}>
            <CircularButton
                icon={"delete"}
                bgColor="#F9E5E6"
                iconColor="#EB5757"
                onPress={onDelPress}
                containerStyle={{
                    marginRight: 7
                }}
            />
            <CircularButton
                icon={"edit"}
                bgColor="#E0E4FF"
                iconColor={theme.primary}
                onPress={onEditPress}
                containerStyle={{
                    marginRight: 5
                }}
            />
            <Text
                numberOfLines={1}
                style={{
                    fontFamily: Fonts.regular,
                    fontSize: 14,
                    color: "black",
                    marginLeft: 5,
                    width: "70%"
                }}>
                {caption}
            </Text>
            <CheckBox
                onPress={onChange}
                isChecked={isChecked}
            />
        </View>
    )
}

const Save = () => {
    const { userCollection, business } = useSelector((state) => ({
        userCollection: state.user.collection,
        business: state.business.business
    }), shallowEqual)

    const dispatch = useDispatch()

    let [state, _setState] = useState({
        loading: false, // get collections loading
        selected: [], // selected collection
        sLoading: false // save loading
    })

    const setState = (item = {}) => {
        state = {
            ...state,
            ...item
        }
        _setState({ ...state })
    }

    // verifying the collections, weather the current business is added in the collection or not
    const verifySelection = (_data) => {
        return _data.filter((item) => item.business.filter((xItem) => xItem.id == business.id).length)
    }

    useEffect(() => {
        setState({ selected: verifySelection(userCollection) })
    }, [userCollection.length])

    const getCollection = () => {
        setState({ loading: true })
        Services.User.getCollection().then((res) => {
            dispatch(setCollection(res.data.collections))
            setState({ selected: verifySelection(res.data.collections) })
        }).finally(() => {
            setState({ loading: false })
        })
    }

    const handleSave = () => {
        const payload = {
            business_id: business.id,
            collection_id: state.selected.map((item) => item.id)
        }
        setState({ sLoading: true })
        Services.Business.saveToCollection(payload).then(() => {
            showSuccessMsg("Business added to selected collections successfully.")
            modalRef.current.close()
        }).finally(() => {
            setState({ sLoading: false })
        })
    }

    useEffect(() => {
        getCollection()
    }, [])

    return (
        <ModalContainer >
            <Text
                style={{
                    fontSize: 17,
                    fontFamily: Fonts.bold,
                    color: "black",
                    alignSelf: "center"
                }}>
                {"Save to collection"}
            </Text>
      <Text
                style={{
                    fontSize: 12,
                    fontFamily: Fonts.medium,
                    color: "black",
                    alignSelf: "center",
                    marginVertical: 5
                }}>
                {"Total Items Added : "}
                <Text
                    style={{
                        fontFamily: Fonts.bold
                    }}>
                    {!state.loading && state.selected.length}
                </Text>
            </Text>
            <FlatList
                refreshing={state.loading}
                onRefresh={() => { }}
                style={{
                    maxHeight: hp(50),
                    minHeight: 50
                }}
                keyExtractor={(item) => "CollectionItem" + item.id}
                ItemSeparatorComponent={() => {
                    if (state.loading) {
                        return null
                    }
                    return (
                        <View
                            style={{
                                marginVertical: 3
                            }}
                        />
                    )
                }}
                ListEmptyComponent={() => (
                    <EmptyCard
                    />
                )}
                data={userCollection}
                renderItem={({ item, index }) => {

                    if (state.loading) return null

                    const isChecked = state.selected.find((xItem) => xItem.id == item.id) ? true : false

                    return (
                        <CollectionCard
                            caption={item.name}
                            onDelPress={() => {
                                showSibling(<DelModal
                                    item={{
                                        ...item,
                                        index
                                    }}
                                />, true)
                            }}
                            onEditPress={() => {
                                showSibling(<CUModal
                                    item={{
                                        ...item,
                                        index
                                    }}
                                />, true)
                            }}
                            onChange={(isCheck) => {
                                if (isCheck) {
                                    state.selected.push(item)
                                    setState({ ...state })
                                } else {
                                    setState({
                                        selected: state.selected.filter((xItem) => xItem.id != item.id)
                                    })
                                }
                            }}
                            isChecked={isChecked}
                        />
                    )
                }}
            />
            <Text
                onPress={() => {
                    showSibling(<CUModal />, true)
                }}
                style={[Typo.textButton, {
                    paddingTop: 10,
                    paddingBottom: 20
                }]}>
                {"+ Add new collection"}
            </Text>
            <PrimaryButton
                onPress={handleSave}
                label={"Save"}
                innerContainerStyle={{
                    width: 116,
                    alignSelf: "center",
                    height: 40
                }}
                loading={state.sLoading}
                // disabled={state.sLoading || !state.selected.length}
            />
        </ModalContainer>
    )
}

export default Save;