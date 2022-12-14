import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Card, CusButton } from '../../../../components';
import Colors from '../../../../constants/Colors';
import { navigate } from '../../../../naviagtion/service';
import { stackName } from '../../../../configs/NavigationContants';

const LobbyItem = (props) => {
  const { lobby } = props;
  return (
    <Card style={{ width: '100%', marginVertical: 20 }}>
      <TouchableOpacity>
        <ImageBackground
          borderTopLeftRadius={8}
          borderTopRightRadius={8}
          style={styles.background_image}
          source={{ uri: lobby.image }}
        >
          <View style={styles.container_content}>
            <Text style={styles.text_content}>{lobby.name}</Text>
            <Text style={styles.text_content}>{lobby.price}VND</Text>
          </View>
        </ImageBackground>

        <View style={styles.container_button}>
          <Text style={{ fontSize: 20 }}>Sức chứa: {lobby.capacity} bàn</Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default LobbyItem;

const styles = StyleSheet.create({
  background_image: {
    height: 200,
    borderRadius: 8,
  },
  container_content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  container_button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  text_content: {
    fontSize: 24,
    color: Colors.Background,
    fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
});
