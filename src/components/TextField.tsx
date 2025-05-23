import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Animated,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import Colors from '@styles/colors';

export type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

const TextField: React.FC<TextFieldProps> = (props) => {
  const { label, value, error, onChangeText, ...inputProps } = props;

  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = useMemo(
    () => ({
      position: 'absolute' as const,
      left: 12,
      top: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 6],
      }),
      fontSize: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 12],
      }),
      color: error ? Colors.error : isFocused ? Colors.primary : Colors.grey,
    }),
    [error, isFocused],
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputWrapper,
          isFocused ? styles.inputWrapperFocused : null,
          error ? styles.inputWrapperError : null,
        ]}
      >
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          {...inputProps}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
          style={styles.input}
        />
        {value && onChangeText ? (
          <TouchableOpacity onPress={() => onChangeText?.('')} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 12,
    paddingTop: 18,
    paddingBottom: 6,
    paddingRight: 36,
    position: 'relative',
    backgroundColor: Colors.white,
    borderColor: Colors.border,
  },
  inputWrapperFocused: {
    borderColor: Colors.primary,
  },
  inputWrapperError: {
    borderColor: Colors.error,
  },
  input: {
    height: 36,
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
  clearButton: {
    position: 'absolute',
    right: 8,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: Colors.grey,
    padding: 8,
  },
  errorText: {
    color: Colors.error,
    marginTop: 4,
    fontSize: 12,
  },
});
