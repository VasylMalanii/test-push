import { StyleSheet } from 'react-native';
import Colors from '@styles/colors';

const GlobalStyles = StyleSheet.create({
  fullPage: {
    flex: 1,
  },
  centeredPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: Colors.background,
  },
});

export default GlobalStyles;
