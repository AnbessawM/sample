export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: { screen: 'Home' } | { screen: 'Cart' } | { screen: 'Profile' };
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
  Onboarding: undefined;
  ProductDetail: { productId: number };
};
