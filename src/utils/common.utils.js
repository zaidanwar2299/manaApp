import { Linking, Platform } from "react-native";
import { SCREEN_WIDTH } from "../common/styles";

export const reverseObjKeys = (_obj) => {
    return Object.entries(_obj)
        .reverse()
        .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {})
}

export const trimObjValues = (obj) => {
    Object.keys(obj).forEach(k => {
        if (typeof (obj[k]) === 'string') {
            obj[k] = obj[k].trim()
        }
    });
}

export const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
};

export const getFormData = (payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {

        if (Array.isArray(payload[key])) {
            payload[key].forEach((item) => {
                formData.append(key, item);
            })
        } else {
            formData.append(key, payload[key]);
        }
    });
    return formData
};

export const getObjByValue = (value, data = [],key = "value") => {
    let _obj = null
    data.map((item) => {
        if (item[key] == value) {
            _obj = item
        }
    })
    return _obj
}

// use in reanimated
export const _wp = (value) => {
    "worklet"
    return (value / 100) * SCREEN_WIDTH
}

// address that gets from location
export const getSplitAddress = (text = "") => {
    let data = {
        country: "",
        city: ""
    }

    const ary = text.split(", ")

    if (ary.length > 1) {
        data.city = ary[0]
        data.country = ary[(ary.length - 1)]
    } else {
        data.country = ary[0]
    }
    return data
}

export const openExternalMap = (options = {
    lat:0,
    long:0,
    label:""
}) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${options.lat},${options.long}`;
    const label = options.label
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
}

// converting nested obj to array
// Object.keys(res.data).map((item)=>res.data[item])