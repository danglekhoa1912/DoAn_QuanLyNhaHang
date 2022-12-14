import {
   createNavigationContainerRef,
   StackActions,
} from "@react-navigation/native";

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

/*Clear and set screenName on top of stack*/
export function navigateAndClearStack(screenName, params) {
   if (params) {
      navigationRef.current?.reset({
         index: 0,
         routes: [{ name: screenName, params }],
      });
   } else {
      navigationRef.current?.reset({
         index: 0,
         routes: [{ name: screenName }],
      });
   }
}

export function navigateNestedStack(stack, name, params) {
   if (params) {
      navigationRef.current?.navigate(stack, {
         screen: name,
         params,
      });
   } else {
      navigationRef.current?.navigate(stack, { screen: name });
   }
}

export function getCurrentRoute(nav) {
   return navigationRef.current?.getCurrentRoute()?.name;
}
