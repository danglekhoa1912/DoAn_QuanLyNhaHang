/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import * as eva from '@eva-design/eva';
import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {PermissionsAndroid, SafeAreaView, StyleSheet} from 'react-native';
import './src/i18n/i18n';
import {store} from './src/store';
import {ApplicationProvider, Layout} from '@ui-kitten/components';
import {default as theme} from './theme.json';
import RootNavigate from './src/navigation/RootNavigate';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/utils/navigate';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import {getStorage} from './src/utils/storage';
import {useTranslation} from 'react-i18next';
import SplashScreen from 'react-native-splash-screen';
import {LogBox} from 'react-native';
import analytics from '@react-native-firebase/analytics';

LogBox.ignoreLogs([
  'Require cycle:',
  'source.uri should not be an empty string',
  `ReactImageView: Image source "" doesn't exist`,
  'new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method',
  'new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.',
  'Failed prop type: Invalid props.style key `tintColor` supplied to `Text`.',
  'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
]);

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const {i18n} = useTranslation();

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    getStorage('lang').then(data => {
      if (data) i18n.changeLanguage(data);
    });
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    analytics().setAnalyticsCollectionEnabled(true);
    analytics()
      .getAppInstanceId()
      .then(data => console.log(data));
  }, []);

  return (
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      <Provider store={store}>
        <SafeAreaView style={styles.root}>
          <NavigationContainer ref={navigationRef}>
            <RootNavigate />
          </NavigationContainer>
          <Toast />
        </SafeAreaView>
      </Provider>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
