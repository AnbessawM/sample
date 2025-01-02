# Welcome to your Sample App 👋

This is a sample project created by [Your Organization Name].

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npm start
   ```

In the output, you'll find options to open the app in a development environment.

You can start developing by editing the files inside the **app** directory.

## Project Structure

```
.expo/
.gitignore
.npmignore
.vscode/
API
  config/
    config.js
  services/
    applayfabrictokenservice..js
    authtoken.js
    createorderservice.js
    requestcreateorder.js
  utils/
    tools.js
    sign-util-lib.js
app/
  navigation/
    AppNavigator.tsx
    AuthNavigator.tsx
    MainNavigator.tsx
  screens/
    Auth/
      LoginScreen.tsx
      RegisterScreen.tsx
      ForgotPasswordScreen.tsx
    Home/
      HomeScreen.tsx
      ProductDetailScreen.tsx
    Cart/
      CartScreen.tsx
      CheckoutScreen.tsx
    Profile/
      ProfileScreen.tsx
      SettingsScreen.tsx
    Onboarding/
      OnboardingScreen.tsx
    OrderConfirmation/
      OrderConfirmationScreen.tsx
    OrderHistory/
      OrderHistory.tsx
    Payment/
      PaymentScreen.tsx
    SplashScreen.tsx
    Wishlist/
      WishlistScreen.tsx
  services/
    api/
      authService.ts
      productService.ts
      cartService.ts
  utils/
    constants.ts
    helpers.ts
components/
  common/
    Button.tsx
    Input.tsx
  layout/
    Header.tsx
    Footer.tsx
assets/
  fonts/
  images/
constants/
  Colors.ts
  Fonts.ts
  Layout.ts
hooks/
  useAuth.ts
  useCart.ts
  useTheme.ts
  useWishlist.ts
  useLoadFonts.ts
scripts/
  reset-project.js
  generate-icons.js
  build-and-deploy.js
types/
  navigation.d.ts
  api.d.ts
  models.d.ts
app.json
eas.json
expo-env.d.ts
package.json
README.md
tsconfig.json
```

### Folder Descriptions

- **app/navigation**: Contains the navigation setup for the app, including different navigators like `AppNavigator`, `AuthNavigator`, and `MainNavigator`.
- **app/screens**: Contains the screen components for different sections of the app, organized into subfolders like `Auth`, `Home`, `Cart`, `Profile`, `Onboarding`, `OrderConfirmation`, `OrderHistory`, `Payment`, `SplashScreen`, and `Wishlist`.
- **app/services/api**: Contains service files for API interactions, such as `authService`, `productService`, and `cartService`.
- **app/utils**: Contains utility files like `constants.ts` and `helpers.ts`.
- **components/common**: Contains common reusable components like `Button` and `Input`.
- **components/layout**: Contains layout components like `Header` and `Footer`.
- **assets**: Contains static assets like fonts and images.
- **constants**: Contains constant values used throughout the app, such as `Colors.ts`, `Fonts.ts`, and `Layout.ts`.
- **hooks**: Contains custom hooks like `useAuth`, `useCart`, `useTheme`, `useWishlist`, and `useLoadFonts`.
- **scripts**: Contains utility scripts like `reset-project.js`, `generate-icons.js`, and `build-and-deploy.js`.
- **types**: Contains TypeScript type definitions for navigation, API, and models.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project, look at the following resources:

- [Your Organization Documentation](#): Learn fundamentals, or go into advanced topics with our guides.
- [Your Organization Tutorial](#): Follow a step-by-step tutorial where you'll create a project that runs on multiple platforms.

## Join the community

Join our community of developers creating universal apps.

- [Your Organization on GitHub](#): View our open source platform and contribute.
- [Your Organization Community](#): Chat with users and ask questions.
