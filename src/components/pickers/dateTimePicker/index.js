import _DateTimePicker from "@react-native-community/datetimepicker"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { Modal, Platform, Pressable, View } from "react-native"
import { destroySibling, showSibling } from "../../../utils/modal.utils"

const DateTimePicker = (props) => {
  const {
    renderCard = ()=>{},
    onSelect,
    _value,
    disabled
  } = props

  let [state, _setState] = useState({
    value: null
  })

  const setState = (item = {}) => {
    state = {
      ...state,
      ...item
    }
    _setState({ ...state })
  }

  useEffect(() => {
      setState({ value: _value })
      // console.log("State.Value><><><><><><><><><><><><>",state.value)
  }, [_value])

  return (
    renderCard({
      onPress: () => {
        if (disabled) return
        showSibling(
          <>
          <Modal
          transparent
          animationType="slide"
          >
            <Pressable
            onPress={()=>{
              destroySibling()
            }}
            style={{
              flexGrow:1,
              justifyContent:"flex-end",
            }}>
              <View
              style={(Platform.OS == "ios" && {
                backgroundColor:"white",
                borderTopWidth:1,
                borderColor:"grey"
              })}>
          <_DateTimePicker
            mode={"time"}
            {...props}
            testID="dateTimePicker"
            value={ new Date()}
            display="spinner"
            onChange={(event, value) => {
              destroySibling()
              if (!value) {
                return;
              }
              const $value = moment(value || state.value)
              setState({ value: $value })
              typeof onSelect == 'function' && onSelect($value)
            }}
            textColor = "black"
          />
          </View>
          </Pressable>
          </Modal>
          </>
          , true)
      },
      value: state.value,
      disabled:disabled
    })
  )
  
  
  
}

export default DateTimePicker;