import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/HomeScreen';
import LoginScreen from '@screens/LoginScreen';
import ProfileScreen from '@screens/ProfileScreen';
import ROUTES from '@constants/routes';
import { RootStackParamList } from './types';

const RootStack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <RootStack.Navigator
      initialRouteName={ROUTES.home}
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name={ROUTES.home} component={HomeScreen} />
      <RootStack.Screen name={ROUTES.login} component={LoginScreen} />
      <RootStack.Screen name={ROUTES.profile} component={ProfileScreen} />
    </RootStack.Navigator>
  );
}
