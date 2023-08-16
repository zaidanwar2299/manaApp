import BottomSheet, { BottomSheetFlatList, BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { isObject } from 'lodash'
import React, { useEffect, useMemo, useRef, useState } from "react"
import {
  KeyboardAvoidingView,
  Modal, Platform, Text, View
} from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import {
  useSharedValue
} from "react-native-reanimated"
import Fonts from "../../../assets/fonts"
import { AntDesign } from "../../../assets/vectorIcons"
import useDelayFn from '../../../hooks/useDelayFn'
import { destroySibling, showSibling } from '../../../utils/modal.utils'
import EmptyCard from '../../cards/emptyCard'
import PrimaryInput from "../../inputs/primaryInput"
import CustomBackdrop from "./items/customBackdrop"
import PickerButton from "./items/pickerButton"
import PickerCard from "./items/pickerCard"

const PickerComponent = (props) => {
  const {
    data = [],
    onChange,
    renderKey = "name",
    _value,
    title,
    cardProps,
    selectedCardProps,
    selectionType = "single" // multi || single
  } = props

  let [state, _setState] = useState({
    input: "",
    pickerItems: data,
    multiSelects: selectionType == 'multi' ? _value : []
  })

  const setState = (item = {}) => {
    state = {
      ...state,
      ...item
    }
    _setState({ ...state })
  }

  const animatedPosition = useSharedValue(0)

  const sheetRef = useRef()

  const snapPoints = useMemo(() => ['50%', "100%"], []);

  const handleSearch = () => {
    const query = state.input.toLowerCase().trim()
    const filteredItems = []

    if (query.trim().length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (typeof data[i][renderKey] == 'string' && data[i][renderKey].toLowerCase().includes(query)) {
          filteredItems.push(data[i])
        }
      }
    } else {
      filteredItems.push(...data)
    }
    setState({ pickerItems: filteredItems })
  }

  useEffect(() => {
    handleSearch()
  }, [state.input])

  return (
    <Modal
      animationType={"fade"}
      statusBarTranslucent
      transparent
    >
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}>
        <BottomSheet
          ref={sheetRef}
          enablePanDownToClose
          animatedPosition={animatedPosition}
          index={0} // initial postition
          snapPoints={snapPoints}
          backdropComponent={() => {
            return (
              <CustomBackdrop
                animatedPosition={animatedPosition}
                onPress={() => {
                  sheetRef.current.close()
                }}
              />
            )
          }}
          onClose={() => {
            destroySibling()
            if (selectionType == "multi") {
              onChange(state.multiSelects)
            }
          }}
          style={{
            paddingHorizontal: 20,
          }}
          topInset={50}
        >
          <Text
            style={{
              alignSelf: "flex-start",
              fontSize: 15,
              fontFamily: Fonts.semiBold,
              color: "black",
            }}
          >
            {title}
          </Text>
          <PrimaryInput
            leftIconProps={{
              icon: "search"
            }}
            containerStyle={{
              marginTop: 15
            }}
            placeholder={"Search here"}
            onChangeText={(text) => {
              setState({ input: text })
            }}
            value={state.input}
            inputStyle={{
              height: 45
            }}
            renderInput={(item) => {
              return (
                <BottomSheetTextInput
                  {...item}
                />
              )
            }}
            renderRightItem={() => {
              if (state.input.length) {
                return (
                  <AntDesign
                    name="closecircle"
                    size={20}
                    color="grey"
                    style={{
                      paddingRight: 10
                    }}
                    onPress={() => {
                      setState({ input: "" })
                    }}
                  />
                )
              }
            }}
          />
          <BottomSheetFlatList
            maxToRenderPerBatch={30}
            initialNumToRender={20}
            updateCellsBatchingPeriod={20}
            contentContainerStyle={{
              paddingBottom: 20,
              paddingTop: 20
            }}
            keyExtractor={(item) => "PrimaryPicker" + item.id}
            showsVerticalScrollIndicator={false}
            // ListHeaderComponent={() => {
            //   if (_value && _value[renderKey]) {
            //     return (
            //       <PickerCard
            //         title={_value[renderKey]}
            //         isSelected={true}
            //         {...(typeof selectedCardProps == 'function' && selectedCardProps())}
            //       />
            //     )
            //   }
            //   return null
            // }}
            ListEmptyComponent={() => (
              <EmptyCard
              />
            )}
            ItemSeparatorComponent={() => (<View
              style={{
                height: 0.7,
                backgroundColor: "grey",
                marginVertical: 5
              }}
            />)}
            renderItem={({ item }) => {
              // if (item.id == _value?.id) {
              //   return;
              // }
              let isSelected = false

              if (selectionType == 'multi' && state.multiSelects.filter((fItem) => fItem.id == item.id).length) {
                isSelected = true
              }
              else if (selectionType == 'single' && _value?.id == item.id) {
                isSelected = true
              }
              return (
                <PickerCard
                  onPress={() => {
                    if (selectionType == 'multi') {
                      if (isSelected) {
                        const _filter = state.multiSelects.filter((fItem) => fItem.id != item.id)
                        state.multiSelects = _filter
                      } else {
                        state.multiSelects.push(item)
                      }
                      setState({ ...state })
                    } else {
                      onChange(item)
                      sheetRef.current.close()
                    }
                  }}
                  title={item[renderKey]}
                  isSelected={isSelected}
                  {...(typeof cardProps == 'function' && cardProps(item))}
                />
              )
            }}
            {...props}
            data={state.pickerItems}
          />
        </BottomSheet>
      </GestureHandlerRootView>
    </Modal>
  )
}

const PrimaryPicker = (props) => {
  const {
    onChange = () => { },
    renderKey = "name",
    _value,
    renderButton = (item) => {
      return (
        <PickerButton
          {...item}
        />
      )
    },
    buttonProps,
    selectionType,
    data
  } = props

  // _value && _value[renderKey]

  return (
    <>
      {typeof (renderButton) == 'function' && renderButton({
        value: _value,
        label: selectionType == "multi" ? (_value?.map((item) => item[renderKey]).join(", ")) : (isObject(_value) && _value[renderKey]),
        labelProps: {
          ...(selectionType == "multi" && {
            numberOfLines: 1
          })
        },
        onPress: () => {
          showSibling(
            <PickerComponent
              {...props}
              onChange={onChange}
            />,
            true
          )
        },
        ...buttonProps
      })}
    </>
  )
}

export default PrimaryPicker;