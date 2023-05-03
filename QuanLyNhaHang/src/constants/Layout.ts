import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const widthScreen = Dimensions.get('screen').width;
const heightScreen = Dimensions.get('screen').height;

export default {
  lang: 'en',
  window: {
    width,
    height,
  },
  screen: {
    width: widthScreen,
    height: heightScreen,
  },
};
