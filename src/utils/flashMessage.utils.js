import { showMessage } from "react-native-flash-message"

export const showErrorMsg = message =>
  showMessage({
    message,
    type: "danger",
  })

  export const showSuccessMsg = message =>
  showMessage({
    message,
    type: "success",
  })

export const showWarningMsg = message =>
  showMessage({
    message,
    type: "warning",
  })