import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Card } from '../../../../../components';
import moment from 'moment';
import Colors from '../../../../../constants/Colors';

const CommentItem = (props) => {
  const { comment } = props;
  return (
    <Card style={styles.container}>
      <Image style={styles.avatar} source={{ uri: comment.userId.avatar }} />
      <View style={styles.content}>
        <View style={styles.content_header}>
          <Text style={styles.text}>{comment.userId.name}</Text>
          <Text style={styles.sub_text}>
            {moment(comment.createDate).format('DD-MM-YYYY')}
          </Text>
        </View>
        <Text style={styles.text}>{comment.content}</Text>
      </View>
    </Card>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 12,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  content: {
    paddingLeft: 12,
    flex: 1,
  },
  content_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
  },
  sub_text: {
    color: Colors.Gray,
  },
});
