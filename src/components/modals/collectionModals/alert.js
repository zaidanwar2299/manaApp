import React from "react";
import { Text, View } from "react-native";
import Fonts from "../../../assets/fonts";
import { AntDesign } from "../../../assets/vectorIcons";
import theme from "../../../common/theme";
import PrimaryButton from "../../buttons/primaryButton";
import PrimaryInput from "../../inputs/primaryInput";
import ModalContainer from "../modalContainer";

const Alert = ({
    type
}) => {

    // default is add
    let CValues = {
        title: "Add new collection",
        input: (
            <PrimaryInput
                title="Collection name"
                placeholder="Enter collection name"
            />
        ),
        RBLabel: "Add", // bottom right button
        RBColor: theme.primary,
        isInputExist: true
    }

    if (type == 'delete') {
        CValues = {
            title: "Delete collection",
            caption: (
                <Text
                    style={{
                        fontSize: 12,
                        fontFamily: Fonts.regular,
                        color: "black",
                        marginTop: 15
                    }}>
                    {"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum semper molestie consequat posuere. Vitae libero sit pellentesque sed urna nulla pharetra tristique?"}
                </Text>
            ),
            RBLabel: "Delete", // bottom right button
            RBColor: "#EB5757",
        }
    }

    return (
        <ModalContainer 
        isInputExist={CValues.isInputExist}
        >
            <Text
                style={{
                    fontSize: 18,
                    fontFamily: Fonts.bold,
                    color: "black",
                    alignSelf: 'center'
                }}>
                {CValues.title}
            </Text>
            {CValues.input}
            {CValues.caption}
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 25,
                }}>
                <PrimaryButton
                    label={"Cancel"}
                    containerStyle={{
                        flexGrow: 1
                    }}
                    theme="inverted"
                />
                <PrimaryButton
                    label={CValues.RBLabel}
                    containerStyle={{
                        flexGrow: 1
                    }}
                    innerContainerStyle={{
                        backgroundColor: CValues.RBColor,
                        borderColor: CValues.RBColor
                    }}
                />
            </View>
        </ModalContainer>
    )
}

export default Alert;