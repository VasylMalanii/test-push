import React from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  PressableProps,
  View,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@styles/colors';

type ButtonProps = PressableProps & {
  type?: 'default' | 'secondary';
  text: string;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
};

function Button(props: ButtonProps) {
  const { type = 'default', text, style, disabled, isLoading, ...buttonProps } = props;

  return (
    <Pressable
      {...buttonProps}
      style={[styles.buttonWrapper, disabled ? styles.buttonWrapperDisabled : null, style]}
      disabled={disabled}
    >
      {({ pressed }) => (
        <>
          {type === 'default' && (
            <LinearGradient
              colors={[Colors.primary, Colors.primaryGradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.button, pressed ? styles.buttonPressed : null]}
            >
              {isLoading && <ActivityIndicator size="small" color={Colors.white} />}
              <Text style={styles.text}>{text}</Text>
            </LinearGradient>
          )}
          {type === 'secondary' && (
            <View
              style={[styles.button, styles.buttonSecondary, pressed ? styles.buttonPressed : null]}
            >
              {isLoading && <ActivityIndicator size="small" color={Colors.text} />}
              <Text style={[styles.text, styles.textSecondary]}>{text}</Text>
            </View>
          )}
        </>
      )}
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
  },
  buttonWrapperDisabled: {
    opacity: 0.6,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  buttonSecondary: {
    backgroundColor: Colors.white,
  },
  textSecondary: {
    color: Colors.text,
  },
});
