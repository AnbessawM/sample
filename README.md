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
  devices.json
  README.md
  types/
  web/
.gitignore
.npmignore
.vscode/
  settings.json
app/
  _layout.tsx
  (tabs)/
    _layout.tsx
    index.tsx
    cart/
      _layout.tsx
      index.tsx
      CheckoutScreen.tsx
      OrderConfirmationScreen.tsx
      PaymentScreen.tsx
    history/
      _layout.tsx
      index.tsx
    profile/
      _layout.tsx
      index.tsx
      SettingsScreen.tsx
    wishlist/
      _layout.tsx
      index.tsx
  auth/
    LoginScreen.tsx
    RegisterScreen.tsx
    ForgotPasswordScreen.tsx
  shared/
    OnboardingScreen.tsx
    ProductDetailScreen.tsx
  +not-found.tsx
app.json
assets/
  fonts/
    SpaceMono-Regular.ttf
  images/
components/
  __tests__/
    __snapshots__/
      ThemedText-test.tsx.snap
    ThemedText-test.tsx
  common/
    Button.tsx
    Input.tsx
    ExternalLink.tsx
    HapticTab.tsx
    HelloWave.tsx
  layout/
    Header.tsx
    Footer.tsx
    ParallaxScrollView.tsx
    ThemedText.tsx
    ThemedView.tsx
  ProductCard.tsx
config/
  firebase.ts
constants/
  Colors.ts
  Fonts.ts
  Layout.ts
eas.json
expo-env.d.ts
hooks/
  useAuth.tsx
  useCart.tsx
  useColorScheme.ts
  useColorScheme.web.ts
  useLoadFonts.ts
  useOrderHistory.tsx
  useTheme.ts
  useThemeColor.ts
  useWishlist.tsx
package.json
README.md
requirements.md
scripts/
  reset-project.js
services/
  api/
    authService.ts
    cartService.ts
    orderService.ts
    productService.ts
tsconfig.json
types/
  api.d.ts
  models.d.ts
  navigation.d.ts
utils/
  constants.ts
  helpers.ts
```

### Folder Descriptions

- **app**: Contains the main application code, including layouts, screens, and shared components.
- **components**: Contains reusable UI components, organized into subfolders like `common` and `layout`.
- **config**: Contains configuration files, such as `firebase.ts`.
- **constants**: Contains constant values used throughout the app, such as `Colors.ts`, `Fonts.ts`, and `Layout.ts`.
- **hooks**: Contains custom hooks like `useAuth`, `useCart`, `useTheme`, `useWishlist`, and `useLoadFonts`.
- **scripts**: Contains utility scripts like `reset-project.js`.
- **services/api**: Contains service files for API interactions, such as `authService`, `productService`, and `cartService`.
- **types**: Contains TypeScript type definitions for navigation, API, and models.
- **utils**: Contains utility files like `constants.ts` and `helpers.ts`.
- **assets**: Contains static assets like fonts and images.

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
