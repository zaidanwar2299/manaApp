import Axios from "axios";
import { Alert } from "react-native";
import Config from "../common/config";
import { ErrorMessages } from "../common/constants";
import { navigate } from "../navigation/navigation.utils";
import Routes from "../navigation/routes";
import { store } from "../store";
import { clearAuth, logout } from "../store/actions/auth";
import { showErrorMsg } from "../utils/flashMessage.utils";

const printLogs = (response) => {
  // console.log(
  //   "\n\n******* API CALL *******",
  //   "\nAPI: " +
  //   response.request._method +
  //   " - " +
  //   response.request._url +
  //   " - " +
  //   response.status,
  //   // "\nbody: " + (response.headers['Content-Type'] == "multipart/form-data" ? JSON.stringify(response.config.data) : response.config.data),
  //   "\nbody: " + JSON.stringify(response.config.data),
  //   "\ntoken: " + (response.config.headers.Authorization ? "Bearer..." : null),
  //   "\nresponse: " + JSON.stringify(response.data),
  //   "\n******** END *******\n"
  // );
};

const instance = Axios.create({
  baseURL: Config.BASE_URL,
  timeout: 30000,
});

instance.interceptors.request.use(
  async (config) => {
    const { tokens } = store.getState().auth;
    if (tokens) {
      config.headers["Authorization"] = "Bearer " + tokens.access_token;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) =>
    new Promise(async (resolve, reject) => {
      if (!response) {
        showErrorMsg("No response from server. Please contact to support.")
        reject()
      }
      printLogs(response);
      resolve(response.data);
    }),
  (error) =>
    new Promise(async (resolve, reject) => {
      if (error.message == "Network Error") {
        showErrorMsg(error.message)
        reject()
      }
      else if (!error.response) {
        showErrorMsg("No response from server. Please contact to support.")
        reject()
      } else {
        printLogs(error.response);
        const resMessage = error.response.data?.message
        const resErrors = error.response.data?.errors
        const resData = error.response.data
        const resStatus = error.response.status

        if (resStatus == 500) {
          showErrorMsg("Internal server error. Please contact to support.");
        }
        else if (resErrors) {
          showErrorMsg(JSON.stringify(resErrors));
        }
        else if (typeof (resMessage) == 'string') {
          if (!resMessage.length) {
            showErrorMsg("Internal Server Error. Please contact to support. Thanks.");
          }
          else if (resMessage === "Unauthenticated.") {
            store.dispatch(logout())
            // showErrorMsg("Please login first.");
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
          else {
            showErrorMsg(resMessage);
          }
        }
        else if (resData) {
          showErrorMsg(JSON.stringify(resData));
        }
        reject();
      }
    })
);

export default instance;
