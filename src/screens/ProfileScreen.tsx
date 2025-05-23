import { Text, View, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@api/profile';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import Button from '@components/Button';
import { AuthContext } from '@providers/AuthContext';

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
    <View style={styles.container}>
      {query.isLoading && <Text>Loading...</Text>}
      {query.isError && <Text>Error: {query.error.message}</Text>}
      {query.data && (
        <>
          <Text>{query.data.email}</Text>
          <Text>{query.data.username}</Text>
        </>
      )}
      <Button onPress={logout} text="Logout" type="secondary" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
