import { SafeAreaView } from 'react-native';
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
import ScreenWrapper from '@components/ScreenWrapper';

type ILoginForm = {
  username: string;
  password: string;
};

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ILoginForm>({
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

  const onSubmit = handleSubmit((data: ILoginForm) => mutate(data));

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScreenWrapper verticalCenterAlign>
        <FormTextField
          name="username"
          control={control}
          rules={{
            required: 'Username is required',
          }}
          label="Username"
          autoCapitalize="none"
          returnKeyType="next"
        />
        <FormTextField
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
          }}
          label="Password"
          secureTextEntry
          autoCapitalize="none"
          onSubmitEditing={onSubmit}
        />
        {loginError && <ErrorMessage text={loginError?.message} />}
        <Button onPress={onSubmit} text="Login" disabled={!isValid} isLoading={isPending} />
      </ScreenWrapper>
    </SafeAreaView>
  );
}
