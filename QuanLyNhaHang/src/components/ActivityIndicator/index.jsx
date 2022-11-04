import {
  StyleSheet,
  ActivityIndicator as DefaultActivityIndicator,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

const ActivityIndicator = (props) => {
  const { color } = props;
  return (
    <View style={styles.container}>
      <DefaultActivityIndicator size='large' color={color || Colors.Primary} />
    </View>
  );
};

export default ActivityIndicator;

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
  },
});
