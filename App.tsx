import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import {
  NotoSans_400Regular,
  NotoSans_500Medium,
  NotoSans_700Bold,
} from '@expo-google-fonts/noto-sans';
import * as SplashScreen from 'expo-splash-screen';
import { RootNavigator } from './src/navigation';
import { colors } from './src/theme';

// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

// Ignore common harmless warnings
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  'Each child in a list should have a unique "key" prop',
]);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    NotoSans_400Regular,
    NotoSans_500Medium,
    NotoSans_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load any additional resources here if needed
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: colors.backgroundDark }} onLayout={onLayoutRootView}>
        <StatusBar barStyle="light-content" backgroundColor={colors.backgroundDark} />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}
