import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function goBack() {
  navigationRef.current && navigationRef.current?.goBack();
}

export function replace(name) {
  navigationRef.current && navigationRef.dispatch(StackActions.replace(name));
}

export function navigate(name, params) {
  if (params) {
    navigationRef.current?.navigate(name, params);
  } else {
    navigationRef.current?.navigate(name);
  }
}
