import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentSelector } from '../../../redux/selector';
import { getComment } from '../../../redux/slice/CommenrSlice';
import { ActivityIndicator } from '../../../components';
import { CommentItem } from './components';

const CommentManagement = () => {
  const comment = useSelector(commentSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComment());
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {comment.status === 'loading' ? (
        <ActivityIndicator />
      ) : (
        comment.commentList.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      )}
    </ScrollView>
  );
};

export default CommentManagement;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
});
