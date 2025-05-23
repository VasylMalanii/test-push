import { Text, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@api/profile';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import Button from '@components/Button';
import { AuthContext } from '@providers/AuthContext';
import ScreenWrapper from '@components/ScreenWrapper';

export default function ProfileScreen() {
  const query = useQuery({ queryKey: ['profile'], queryFn: getProfile });
  const navigation = useNavigation();
  const { clearTokens } = useContext(AuthContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: query.data ? `Hi, ${query.data?.firstName} ${query.data?.lastName}` : '',
      headerTitleAlign: 'center',
    });
  }, [navigation, query.data]);

  const logout = async () => {
    clearTokens();
    navigation.goBack();
  };

  return (
    <ScreenWrapper style={styles.container}>
      {query.isLoading && <Text>Loading...</Text>}
      {query.isError && <Text>Error: {query.error.message}</Text>}
      {query.data && (
        <>
          <Text>{query.data.email}</Text>
          <Text>{query.data.username}</Text>
        </>
      )}
      <Button onPress={logout} text="Logout" type="secondary" style={styles.btn} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  btn: {
    marginTop: 20,
  },
});
