import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import PanoramaView from '../../components/PanoramaView';
import {PanoramaScreenRouteProp} from '../../navigation/RootNavigate';
import Icon from 'react-native-vector-icons/AntDesign';
import {goBack} from '../../utils/navigate';
import {useTheme} from '@ui-kitten/components';

const PanoramaPage = ({route}: PanoramaScreenRouteProp) => {
  const theme = useTheme();
  console.log(route.params.url);
  return (
    <View style={styles.container}>
      <PanoramaView
        style={styles.viewer}
        dimensions={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}
        inputType="mono"
        imageUrl={route.params.url}
      />
      <TouchableOpacity onPress={() => {}} style={styles.button_back}>
        <Icon
          onPress={() => {
            goBack();
          }}
          color={theme['color-primary-default']}
          name="left"
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PanoramaPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button_back: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  viewer: {
    height: '100%',
  },
});
