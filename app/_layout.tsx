import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import 'react-native-reanimated';

import { ThemeProvider } from '@/providers/ThemeProvider';
import { SelectedUserProvider } from '@/providers/SelectedUserProvider';
import { MocapDataProvider } from '@/providers/MocapDataProviders';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <MocapDataProvider>
      <ThemeProvider>
        <SelectedUserProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="new-activity-screen"
              options={{ presentation: 'transparentModal', headerShown: false }}
            />
            <Stack.Screen
              name="call-screen"
              options={{ presentation: 'modal', headerShown: false }}
            />
          </Stack>
        </SelectedUserProvider>
      </ThemeProvider>
    </MocapDataProvider>
  );
}
