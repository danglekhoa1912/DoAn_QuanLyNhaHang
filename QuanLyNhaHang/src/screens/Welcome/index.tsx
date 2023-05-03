import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {COLORS} from '../../utils/color';
import {Logo} from '../../assets';
import {navigate} from '../../utils/navigate';
import {getStorage} from '../../utils/storage';

const WelcomePage = () => {
  getStorage('accessToken').then(token => {
    if (token) {
      navigate('DrawerScreen');
    }
  });

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <Image style={styles.logo} source={Logo} />

        <Text style={styles.title}>Come on board</Text>
        <Text style={styles.subContent}>
          Create a free account and get unlimited recipe space.
        </Text>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={() => {
            navigate('LoginScreen');
          }}
          style={[styles.button, styles.buttonSignIn]}>
          <Text style={styles.buttonTitle}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate('RegisterScreen');
          }}
          style={[styles.button, styles.buttonRegister]}>
          <Text style={styles.buttonTitle}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
  },
  logo: {
    width: 300,
    height: 200,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.tertiary,
  },
  subContent: {
    fontSize: 18,
    color: COLORS.tertiary,
    textAlign: 'center',
    width: 200,
  },
  containerButton: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 12,
  },
  buttonRegister: {
    backgroundColor: COLORS.secondary,
    position: 'absolute',
    width: '50%',
  },
  buttonSignIn: {
    backgroundColor: COLORS.tertiary,
    width: '100%',
    alignItems: 'flex-end',
  },
  buttonTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
});
