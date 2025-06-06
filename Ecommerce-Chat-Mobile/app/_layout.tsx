import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'react-native';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const colorScheme = useColorScheme(); // Define o tema (claro ou escuro)

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Certifique-se de que isso não altera a ordem dos hooks
  }

  return (
    <>
      {/* Configuração global da StatusBar */}
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colorScheme === 'dark' ? '#000' : '#fff'}
        translucent={false} // Garante que a StatusBar não seja translúcida
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen
              name="changeName"
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
                },
                headerLeft: () => (
                  <TouchableOpacity onPress={() => router.replace('/(tabs)/home')}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen
              name="chat"
              options={{
                title: 'Artificial Intelligence Chat',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
                },
                headerLeft: () => (
                  <TouchableOpacity onPress={() => router.replace('/changeName')}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                  </TouchableOpacity>
                ),
              }}
            />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={colorScheme === 'dark' ? '#000' : '#fff'}
          translucent={false}
/>

      </ThemeProvider>
    </SafeAreaView>
    </>
  );
}