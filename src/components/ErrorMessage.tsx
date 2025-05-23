import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Colors from '@styles/colors';

type ButtonProps = {
  text: string;
};

function ErrorMessage(props: ButtonProps) {
  const { text } = props;

  return (
    <View style={styles.buttonWrapper}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export default ErrorMessage;

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    backgroundColor: Colors.error,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 20,
    marginBottom: 20,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
  },
});
