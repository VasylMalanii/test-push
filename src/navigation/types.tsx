import ROUTES from '@constants/routes';

export type RootStackParamList = {
  [ROUTES.home]: undefined;
  [ROUTES.login]: undefined;
  [ROUTES.profile]: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
