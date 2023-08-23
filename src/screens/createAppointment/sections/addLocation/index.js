import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Marker} from 'react-native-maps';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {AppStyles} from '../../../../common/styles';
import theme from '../../../../common/theme';
import PrimaryButton from '../../../../components/buttons/primaryButton';
import Header from '../../../../components/views/header';
import {pop} from '../../../../navigation/navigation.utils';
import Services from '../../../../services';
import {setLocation} from '../../../../store/actions/user';
import {showErrorMsg} from '../../../../utils/flashMessage.utils';
import Config from '../../../../common/config';
import Fonts from '../../../../assets/fonts';
import {
  AntDesign, Ionicons
} from "../../../../assets/vectorIcons";

const getAddressParts = addressComponents => {
  let _parts = {
    locality: null,
    city: null,
    province: null,
    country: null,
    zipCode: null,
  };

  let _ary = Object.keys(_parts);

  let query = '';
  let adressType = '';

  for (let i = 0; i < _ary.length; i++) {
    adressType = _ary[i];

    if (adressType == 'city') {
      query = 'administrative_area_level_2';
    }
    if (adressType == 'province') {
      query = 'administrative_area_level_1';
    }
    if (adressType == 'country') {
      query = 'country';
    }
    if (adressType == 'zipCode') {
      query = 'postal_code';
    }

    let _item = addressComponents.find(fItem =>
      fItem.types.find(fItem2 => fItem2 == query),
    );

    _parts[adressType] = _item;
  }

  return _parts;
};

const INITIAL_STATE = {
  latitude: null,
  longitude: null,
  address: '',
  name: '',
  loading: false,
};

const AddLocation = props => {
  const {onSelect = () => {}, _value} = props.route.params;


  let [state, _setState] = useState({
    ...INITIAL_STATE,
    ..._value,
  });

  const setState = (item = {}) => {
    state = {
      ...state,
      ...item,
    };
    _setState({...state});
  };

  const {location} = useSelector(
    state => ({
      location: state.user.location,
    }),
    shallowEqual,
  );

  const dispatch = useDispatch();

  const isLocationSelected = state.latitude && state.longitude ? true : false;

  const mapRef = useRef();
  const searchRef = useRef();
  const markerRef = useRef();
  const addressRef = useRef();
  const inputCountRef = useRef(0);

  const validate = () => {
    if (!state.latitude || !state.longitude || !state.address) {
      return false;
    }
    if (addressRef.current && addressRef.current != state.address) {
      return false;
    }
    return true;
  };

  const handleSave = () => {
    onSelect(state);
    pop(1);
    // navigation.navigate(Routes.CreateAppointment)
  };

  const handleMapPress = async item => {
    const {coordinate} = item.nativeEvent;
    setState({loading: true});
    Geocoder.from({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    })
      .then(res => {
        setState({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          address: res.results[0]?.formatted_address || '--',
          name: '',
        });
        addressRef.current = res.results[0]?.formatted_address;
      })
      .catch(err => {
        showErrorMsg(err?.origin?.error_message);
      })
      .finally(() => {
        setState({loading: false});
      });
  };

  useEffect(() => {
    if (isLocationSelected) {
      mapRef.current.animateCamera(
        {center: state},
        {
          duration: 1000,
        },
      );
      setTimeout(() => {
        markerRef.current?.showCallout();
      }, 100);
    }
  }, [state.latitude, state.longitude, mapRef.current]);

  const animateToUserLocation = () => {
    mapRef.current.animateCamera(
      {
        center: location,
      },
      {
        duration: 1000,
      },
    );
  };

  useEffect(() => {
    if (!isLocationSelected) {
      animateToUserLocation();
    }
  }, [mapRef.current, location]);

  useEffect(() => {
    Services.Location.getLocation().then(res => {
      dispatch(setLocation(res));
    });
  }, []);
  

  return (
    <>
      <Header title={'Select Location'} showBack />
      <View
        style={{
          flexGrow: 1,
        }}>
        <MapView
          ref={mapRef}
          style={{
            flexGrow: 1,
          }}
          mapPadding={{
            top: 55,
          }}
          onPress={handleMapPress}
          initialRegion={{
            ...location,
            ...(isLocationSelected && state),
            latitudeDelta: 1 / 300,
            longitudeDelta: 2 / 300,
          }}
          showsUserLocation
          zoomControlEnabled={false}
          zoomEnabled
          showsMyLocationButton={false}>
          {isLocationSelected && (
            <Marker
              ref={markerRef}
              pinColor={'#ff0000'}
              coordinate={{
                longitude: state.longitude,
                latitude: state.latitude,
              }}
              // title={state.name || state.address}
              // onCalloutPress={() => {
              //     setState({ address: addressRef.current });
              // }}
              title={state.address}
            />
          )}
        </MapView>
        <GooglePlacesAutocomplete
          onFail={error => {
            console.log('GooglePlacesAutocomplete Error: ', error);
            showErrorMsg(error);
          }}
          ref={searchRef}
          fetchDetails
          query={{
            key: Config.GOOGLE_MAP_API_KEY,
            language: 'en',
          }}
          onPress={(data, details) => {
            addressRef.current = details.formatted_address;
            setState({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              address: details.formatted_address,
              name: details.name,
              ...getAddressParts(details.address_components),
            });
          }}
          placeholder="Search here"
          renderLeftButton={() => {
            return (
              <Ionicons
                name="search-outline"
                size={24}
                color={'grey'}
                style={{
                  paddingRight: 10,
                }}
              />
            );
          }}
          renderRightButton={() => {
            if (state.loading) {
              return (
                <ActivityIndicator
                  animating={true}
                  color={theme.primary}
                  size="small"
                />
              );
            }
            if (state.address) {
              return (
                <AntDesign
                  name="closecircle"
                  size={20}
                  color={theme.primary}
                  onPress={() => {
                    setState({...INITIAL_STATE});
                  }}
                  style={{
                    paddingHorizontal: 2,
                    paddingTop: 3,
                  }}
                />
              );
            }
          }}
          textInputProps={{
            placeholderTextColor: 'grey',
            style: {
              includeFontPadding: false,
              padding: 0,
              fontFamily: Fonts.regular,
              fontSize: 13,
              color: 'black',
              flex: 1,
            },
            value: state.address,
            onChangeText: text => {
              inputCountRef.current += 1;
              if (inputCountRef.current > 1) {
                setState({address: text});
              }
            },
            multiline: true,
          }}
          styles={{
            container: {
              marginTop: 10,
              flex: 0,
              position: 'absolute',
              width: AppStyles.spacedWidth,
              alignSelf: 'center',
            },
            textInputContainer: {
              borderWidth: 1,
              borderColor: '#C1C5CC',
              borderRadius: 10,
              overflow: 'hidden',
              backgroundColor: 'white',
              padding: 8,
            },
            description: {
              color: 'black',
            },
          }}
        />
        <TouchableOpacity
          onPress={animateToUserLocation}
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderWidth: 0.5,
            borderColor: 'grey',
            alignSelf: 'flex-end',
            borderRadius: 100,
            position: 'absolute',
            bottom: 90,
            right: AppStyles.sideSpace,
          }}>
          <Ionicons
            name="locate"
            size={27}
            color="black"
            style={{
              marginLeft: 1,
              marginTop: 0.5,
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: 5,
              height: 5,
              borderRadius: 5,
              backgroundColor: 'black',
            }}
          />
        </TouchableOpacity>
        <PrimaryButton
          containerStyle={{
            marginTop: 15,
            position: 'absolute',
            bottom: 30,
            width: AppStyles.spacedWidth,
            alignSelf: 'center',
          }}
          label={'SAVE'}
          disabled={!validate()}
          onPress={() => {
            handleSave();
            // navigation.navigate(Routes.CreateAppointment);
          }}
        />
      </View>
    </>
  );
};

export default AddLocation;
