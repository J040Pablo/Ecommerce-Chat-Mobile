import React, { useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { Text, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MenuHeader from '@/components/MenuHeader';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [visible, setVisible] = useState(false);
<TouchableOpacity onPress={() => alert('Botão clicado!')} style={{ marginRight: 15 }}>
  <MaterialCommunityIcons name="dots-vertical" size={24} color="#FFF" />
</TouchableOpacity>

  return (
    <PaperProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="home"
          options={{
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white'
            },
            headerStyle: {
              backgroundColor: '#FF4500'
            },
            title: 'Home',
            headerRight: () => <MenuHeader/>,
            tabBarIcon: () => <MaterialCommunityIcons name="home" size={24} color='white'/>,
            tabBarStyle: {
              backgroundColor: '#FF4500',
              borderTopWidth: 0,
              height: 60,
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray'
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white'
            },
            headerStyle: {
              backgroundColor: '#FF4500'
            },
            headerRight: () => <MenuHeader/>,
            tabBarIcon: () => <MaterialCommunityIcons name="account-circle" size={24} color='white'/>,
            tabBarStyle: {
              backgroundColor: '#FF4500'
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray'
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}

