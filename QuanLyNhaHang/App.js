import { NavigationContainer } from '@react-navigation/native';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import RoorNavigation from './src/naviagtion/RootNavigation';
import useCachedResources from './hooks/useCachedResources';
import { navigationRef } from './src/naviagtion/service';
import { Provider } from 'react-redux';
import store from './src/redux/rootStore';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <PaperProvider>
            <NavigationContainer ref={navigationRef}>
              <RoorNavigation />
            </NavigationContainer>
          </PaperProvider>
        </Provider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },
});
