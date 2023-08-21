import { Alert, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Permissions from 'react-native-permissions';
import { store } from '../store';
import { setLocation } from '../store/actions/user';
import axios from './axios';

const GeoWatchOptions = {
    timeout: 10000,
    maximumAge: 10000,
    distanceFilter: 10,
    // useSignificantChanges: true,
    interval: 10000,
    showLocationDialog: true,
    forceRequestLocation: true
}

const permissionType = Platform.select({
    ios: Permissions.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android: Permissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
})

const hasLocationPermission = () => new Promise(async (resolve, reject) => {
    try {
        const result = await Permissions.check(permissionType)
        onPermissionResult(result, resolve, reject)
    } catch (error) {
        reject(error)
    }
})
const onPermissionResult = (result, resolve, reject) => {
    switch (result) {
        case Permissions.RESULTS.DENIED:
            Alert.alert(
                'Location access!',
                "'PEPOL' needs your Location Access, so that the 'Delivery Person' can locate you",
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => {
                            reject(result)
                        }
                    },
                    {
                        text: 'Request again', onPress: () => {
                            Permissions.request(permissionType).then(result => {
                                onPermissionResult(result, resolve, reject)
                            }).catch(error => {
                                reject(error)
                            })
                        }
                    },
                ],
                { cancelable: false },
            );
            break;
        case Permissions.RESULTS.GRANTED:
            resolve(result)
            break;
        case Permissions.RESULTS.BLOCKED:
            reject(result)
            Alert.alert(
                'Location access!',
                "'PEPOL' needs your Location Access, so that the 'Delivery Person' can locate you",
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Open Settings', onPress: () => {
                            Permissions.openSettings().then(() => {
                            }).catch(error => {
                            })
                        }
                    },
                ],
                { cancelable: false },
            );
            break;
    }
}

const getCurrentPosition = () => new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
        ({ coords }) => {
            resolve(coords)
        },
        (error) => {
            console.log('ERROR2', error);
            reject(error)
            alert('Unable to get location. Please check if device location is enable and you have granted loaction access.')
        }
    );
})

export const getLocation = async () => {
    const result = await hasLocationPermission();
    if (result == "granted") {
      const coords = await getCurrentPosition();
      return coords;
    }
  };

export const getCountries = async () => {
    return await axios.get(`/countries`);
};

export const getCities = async (countryId) => {
    return await axios.get(`/cities`,{
        params:{
            id:countryId
        }
    });
};

export default {
    GeoWatchOptions,
    getCurrentPosition,
    hasLocationPermission
}