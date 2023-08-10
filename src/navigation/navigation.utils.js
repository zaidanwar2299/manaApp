import { CommonActions, StackActions, DrawerActions } from '@react-navigation/native';
import { getDrawerStatusFromState } from '@react-navigation/drawer';
import { createRef } from 'react';

export const navigationRef = createRef()

export const pop = (count = 1) => {
  navigationRef.current?.dispatch(StackActions.pop(count));
};

export const goBack = () => {
  navigationRef.current?.goBack();
};

export const openDrawer = () => {
  navigationRef.current?.dispatch(DrawerActions.openDrawer());
};

export const isDrawerOpen = () => {
  let path = navigationRef.current?.getState()?.routes[0]?.state?.routes[0]?.state
  if (path) {
    return getDrawerStatusFromState(path) === 'open'
  }
};

export const closeDrawer = () => {
  navigationRef.current?.dispatch(DrawerActions.closeDrawer());
};

export const navigate = (routeName, params = {}) => {
  if (typeof routeName === 'string' && routeName.length > 0) {
    navigationRef.current?.dispatch(
      CommonActions.navigate({ name: routeName, params: params }),
    );
  }
};

export const resetStack = (newRoute) => {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name: newRoute }],
  });
};