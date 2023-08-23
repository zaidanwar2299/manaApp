import { CommonActions, StackActions, } from '@react-navigation/native';
import { createRef } from 'react';

export const navigationRef = createRef()

export const pop = (count = 1) => {
  navigationRef.current?.dispatch(StackActions.pop(count));
};

export const goBack = () => {
  navigationRef.current?.goBack();
};


export const navigate = (routeName, params = {}) => {
  if (typeof routeName === 'string' && routeName.length > 0) {
    navigationRef.current?.dispatch(
      CommonActions.navigate({ name: routeName, params: params }),
    );
  }
};
