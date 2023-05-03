import React from 'react';
import {
  StyleService,
  TextProps,
  useStyleSheet,
  Text as TextDefault,
} from '@ui-kitten/components';

export default function Text(props: TextProps) {
  const {style, ...otherProps} = props;
  const styles = useStyleSheet(themedStyles);
  return (
    <TextDefault style={[styles.text, style]} {...otherProps}>
      {props.children}
    </TextDefault>
  );
}

const themedStyles = StyleService.create({
  text: {
    color: 'color-primary-100',
  },
});
