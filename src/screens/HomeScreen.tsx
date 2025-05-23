import Button from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import ROUTES from '@constants/routes';
import { useContext } from 'react';
import { AuthContext } from '@providers/AuthContext';
import ScreenWrapper from '@components/ScreenWrapper';
import GlobalStyles from '@styles/global';
import { SafeAreaView } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { isAuthorized } = useContext(AuthContext);

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScreenWrapper verticalCenterAlign>
        {!isAuthorized ? (
          <Button onPress={() => navigation.navigate(ROUTES.login)} text="Go to login" />
        ) : (
          <Button onPress={() => navigation.navigate(ROUTES.profile)} text="Go to profile" />
        )}
      </ScreenWrapper>
    </SafeAreaView>
  );
}
