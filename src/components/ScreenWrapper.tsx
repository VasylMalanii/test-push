import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import GlobalStyles from '@styles/global';

type ScreenWrapperProps = React.PropsWithChildren & {
  verticalCenterAlign?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function ScreenWrapper({
  children,
  verticalCenterAlign,
  style,
}: ScreenWrapperProps) {
  return (
    <KeyboardAvoidingView
      style={GlobalStyles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={GlobalStyles.flex}
        contentContainerStyle={[
          styles.scrollContent,
          verticalCenterAlign ? styles.contentVerticalAligned : null,
          style,
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  contentVerticalAligned: {
    justifyContent: 'center',
  },
});
