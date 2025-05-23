import { SafeAreaView } from 'react-native';
import Button from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import ROUTES from '@constants/routes';
import GlobalStyles from '@styles/global';
import { useContext } from 'react';
import { AuthContext } from '@providers/AuthContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { isAuthorized } = useContext(AuthContext);

  return (
    <SafeAreaView style={GlobalStyles.centeredPage}>
      {!isAuthorized ? (
        <Button onPress={() => navigation.navigate(ROUTES.login)} text="Go to login" />
      ) : (
        <Button onPress={() => navigation.navigate(ROUTES.profile)} text="Go to profile" />
      )}
    </SafeAreaView>
  );
}
