import { Text, View } from "react-native";
import MainProvider from "../contexts/useMainContext";
import Login from "./components/Login/Login";
import IsLoggedIn from "./IisLoggedIn";

export default function Index() {
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MainProvider>
        <IsLoggedIn/>
      </MainProvider>
    </View>
  );
}



// This is the most secure and scalable solution:

// How it works:

// The server issues two tokens during login:
// Access Token (short-lived, e.g., 15-60 minutes): Used for authenticated API requests.
// Refresh Token (long-lived, e.g., 7-30 days): Used to obtain a new access token.
// Store:
// Access Token: Keep in memory or secure storage.
// Refresh Token: Use Secure Storage or Encrypted Storage for long-term storage.
// When the access token expires:
// Automatically send the refresh token to the backend to get a new access token.
// Log out the user only if the refresh token expires or is invalid.
// Implementation:

// Store the refresh token securely using libraries like:
// SecureStore (Expo)
// react-native-encrypted-storage
// Use an interceptor (if using axios) to handle token expiration.



// While you can't use the exact same code structure of a React web application directly in React Native due to differences in platform and libraries, you can follow a similar architectural approach to maintain consistency. Here's how you can adapt your School Blog Front project to React Native:

// 1. Project Structure
// You can replicate the logical separation of concerns (e.g., contexts, components, and utils), but you'll need to adjust how components and styles are implemented.

// For example:

// bash
// Copy code
// school-blog-native/
// ├── src/
// │   ├── components/      # React Native components
// │   ├── contexts/        # Context providers
// │   ├── screens/         # Screen components
// │   ├── navigation/      # Navigation setup (React Navigation)
// │   ├── utils/           # Utility functions and hooks
// │   └── App.tsx          # Main entry point
// ├── assets/              # Images, fonts, etc.
// ├── package.json
// └── README.md