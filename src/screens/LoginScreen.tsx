import { SafeAreaView, ScrollView } from 'react-native';
import Button from '@components/Button';
import GlobalStyles from '@styles/global';
import { useForm } from 'react-hook-form';
import FormTextField from '@components/FormTextField';
import ErrorMessage from '@components/ErrorMessage';
import { useMutation } from '@tanstack/react-query';
import { login } from '@api/auth';
import { StackActions, useNavigation } from '@react-navigation/native';
import ROUTES from '@constants/routes';
import { useContext } from 'react';
import { AuthContext } from '@providers/AuthContext';

type ILoginForm = {
  username: string;
  password: string;
};

export default function LoginScreen() {
  const { control, handleSubmit } = useForm<ILoginForm>({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const navigation = useNavigation();
  const { setTokens } = useContext(AuthContext);

  const {
    mutate,
    error: loginError,
    isPending,
  } = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      await setTokens(data.data);
      navigation.dispatch(StackActions.replace(ROUTES.profile));
    },
  });

  const onSubmit = (data: ILoginForm) => mutate(data);

  return (
    <SafeAreaView style={GlobalStyles.fullPage}>
      <ScrollView style={GlobalStyles.fullPage} contentContainerStyle={GlobalStyles.centeredPage}>
        <FormTextField
          name="username"
          control={control}
          rules={{
            required: 'Username is required',
          }}
          label="Username"
        />
        <FormTextField
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
          }}
          label="Password"
          secureTextEntry
        />
        {loginError && <ErrorMessage text={loginError?.message} />}
        <Button onPress={handleSubmit(onSubmit)} text="Login" disabled={isPending} />
      </ScrollView>
    </SafeAreaView>
  );
}
