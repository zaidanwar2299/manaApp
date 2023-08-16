import {Dimensions, StyleSheet} from 'react-native';
import Fonts from '../assets/fonts';
import theme from './theme';

const layout = Dimensions.get('screen');

export const SCREEN_WIDTH = layout.width;
export const SCREEN_HEIGHT = layout.height;

export const Typo = StyleSheet.create({
  profileHeader: {
    fontSize: 30,
    fontFamily: Fonts.bold,
    color: 'white',
  },
  h1: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: 'black',
  },
  c1: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: 'grey',
  },
  textButton: {
    fontFamily: Fonts.bold,
    color: theme.grey200,
    fontSize: 15,
  },
  cardTitle: {
    fontSize: 13.2,
    fontFamily: Fonts.semiBold,
    color: 'black',
  },
  cardCaption: {
    fontSize: 13,
    fontFamily: Fonts.regular,
  },
});

export const AppStyles = StyleSheet.create({
  h11: {
    marginTop: 20,
    fontSize: 33,
    textAlign: 'center',
    color: 'white',
  },

  // mid heading of auth screens
  h1: {
    marginTop: 25,
    textAlign: 'center',
    ...Typo.h1,
  },
  // events talk heading
  h2: {
    fontSize: 17,
    fontFamily: Fonts.bold,
    color: 'black',
    marginTop: -10,
    textAlign: 'center',
  },
  // business listing heading
  h3: {
    marginTop: 15,
    fontSize: 20,
    fontFamily: Fonts.regular,
    color: 'black',
  },
  // user profile heading
  h4: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: 'white',
    marginTop: 15,
  },
  // business detail image style
  image1: {
    width: 33,
    height: 33,
    borderRadius: 50,
    marginRight: 10,
  },
  // mid caption of auth screens
  c1: {
    marginTop: 8,
    textAlign: 'center',
    ...Typo.c1,
  },
  link: {
    fontFamily: Fonts.bold,
    color: theme.primary,
    textDecorationLine: 'underline',
  },
  border: {
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  sideSpace: 20,
  spacedWidth: '90%',
  topSpace: 20,
  card: {
    topSpace: 20,
    titleBottomSpace: 10,
    innerLeftSpace: 17,
  },
  imageHeader: {
    width: '100%',
    height: 217,
    borderRadius: 10,
    marginTop: 15,
  },
  pickerIconStyle: {
    height: 23,
    width: 23,
    marginRight: 15,
    alignSelf: 'center',
    resizeMode: 'contain',
  }
});

export const tabBarStyles = ({route, navigation}) => {
  const isFocused =
    route.name ==
    navigation.getState().routes[navigation.getState().index].name;

  return {
    tabBarScrollEnabled: true,
    tabBarActiveTintColor: theme.primary,
    tabBarInactiveTintColor: 'black',
    tabBarLabelStyle: {
      fontFamily: isFocused ? Fonts.bold : Fonts.light,
      fontSize: 11,
    },
    tabBarIndicatorStyle: {
      backgroundColor: theme.primary,
      height: 2,
      borderRadius: 10,
    },
    tabBarStyle: {
      marginTop: 15,
    },
    lazy: true,
  };
};

export const MapStyles = {
  Clear: [
    {
      elementType: 'geometry.fill',
      stylers: [
        {
          lightness: 5,
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels',
      stylers: [
        {
          lightness: 5,
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ecf3f4',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#c4fdcc',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ],
};
